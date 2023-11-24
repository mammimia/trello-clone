'use server';

import { auth } from '@clerk/nextjs';
import { InputType, OutputType } from './types';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { createSafeAction } from '@/lib/create-safe-action';
import { UpdateList } from './schema';

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
  } catch (error) {
    return { error: 'Failed to update list!' };
  }

  revalidatePath(`/boards/${boardId}`);
  return { data: list };
};

export const updateList = createSafeAction(UpdateList, handler);
