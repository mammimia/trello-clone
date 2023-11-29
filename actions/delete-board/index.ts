'use server';

import { createAuditLog } from '@/lib/create-audit-log';
import { createSafeAction } from '@/lib/create-safe-action';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { ACTION, ENTITIY_TYPE } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { DeleteBoard } from './schema';
import { InputType, OutputType } from './types';
import { decreaseAvailableBoards } from '@/lib/org-limit';

const handler = async (data: InputType): Promise<OutputType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return { error: 'Not authenticated' };
  }

  const { id } = data;
  let board;

  try {
    board = await db.board.delete({
      where: {
        id,
        orgId
      }
    });

    await decreaseAvailableBoards();

    await createAuditLog({
      entityTitle: board.title,
      entityId: board.id,
      entityType: ENTITIY_TYPE.BOARD,
      action: ACTION.DELETE
    });
  } catch (error) {
    return { error: 'Failed to delete board!' };
  }

  revalidatePath(`/organization/${orgId}`);
  redirect(`/organization/${orgId}`);
};

export const deleteBoard = createSafeAction(DeleteBoard, handler);
