'use server';

import { createAuditLog } from '@/lib/create-audit-log';
import { createSafeAction } from '@/lib/create-safe-action';
import { db } from '@/lib/db';
import { hasAvailableBoards, incrementAvailableBoards } from '@/lib/org-limit';
import { auth } from '@clerk/nextjs';
import { ACTION, ENTITIY_TYPE } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { CreateBoard } from './schema';
import { InputType, OutputType } from './types';

const handler = async (data: InputType): Promise<OutputType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: 'Not authenticated'
    };
  }

  const canCreateBoard = await hasAvailableBoards();

  if (!canCreateBoard) {
    return {
      error:
        'You have reached your limit of free boards. Please upgrade to create more.'
    };
  }

  const { title, image } = data;

  const [imageId, imageThumbUrl, imageFullUrl, imageLinkHTML, imageUserName] =
    image.split('|');

  if (
    !imageId ||
    !imageThumbUrl ||
    !imageFullUrl ||
    !imageLinkHTML ||
    !imageUserName
  ) {
    return {
      error: 'Invalid image'
    };
  }

  let board;

  try {
    board = await db.board.create({
      data: {
        title,
        orgId,
        imageId,
        imageThumbUrl,
        imageFullUrl,
        imageLinkHTML,
        imageUserName
      }
    });

    await incrementAvailableBoards();

    await createAuditLog({
      entityTitle: board.title,
      entityId: board.id,
      entityType: ENTITIY_TYPE.BOARD,
      action: ACTION.CREATE
    });
  } catch (error) {
    return {
      error: 'Failed to create'
    };
  }

  revalidatePath(`/boards/${board.id}`);
  return { data: board };
};

export const createBoard = createSafeAction(CreateBoard, handler);
