'use server';

import { createAuditLog } from '@/lib/create-audit-log';
import { createSafeAction } from '@/lib/create-safe-action';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { ACTION, ENTITIY_TYPE } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { UpdateBoard } from './schema';
import { InputType, OutputType } from './types';

const handler = async (data: InputType): Promise<OutputType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return { error: 'Not authenticated' };
  }

  const { id, title } = data;
  let board;

  try {
    board = await db.board.update({
      where: {
        id,
        orgId
      },
      data: {
        title
      }
    });

    await createAuditLog({
      entityTitle: board.title,
      entityId: board.id,
      entityType: ENTITIY_TYPE.BOARD,
      action: ACTION.UPDATE
    });
  } catch (error) {
    return { error: 'Failed to update board!' };
  }

  revalidatePath(`/boards/${id}`);
  return { data: board };
};

export const updateBoard = createSafeAction(UpdateBoard, handler);
