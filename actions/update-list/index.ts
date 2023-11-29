'use server';

import { createAuditLog } from '@/lib/create-audit-log';
import { createSafeAction } from '@/lib/create-safe-action';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { ACTION, ENTITIY_TYPE } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { UpdateList } from './schema';
import { InputType, OutputType } from './types';

const handler = async (data: InputType): Promise<OutputType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return { error: 'Not authenticated' };
  }

  const { id, title, boardId } = data;
  let list;

  try {
    list = await db.list.update({
      where: {
        id,
        boardId,
        board: {
          orgId
        }
      },
      data: {
        title
      }
    });

    await createAuditLog({
      entityTitle: list.title,
      entityId: list.id,
      entityType: ENTITIY_TYPE.LIST,
      action: ACTION.UPDATE
    });
  } catch (error) {
    return { error: 'Failed to update list!' };
  }

  revalidatePath(`/boards/${boardId}`);
  return { data: list };
};

export const updateList = createSafeAction(UpdateList, handler);
