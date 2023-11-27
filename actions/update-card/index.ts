'use server';

import { createSafeAction } from '@/lib/create-safe-action';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { revalidatePath } from 'next/cache';
import { UpdateCard } from './schema';
import { InputType, OutputType } from './types';

const handler = async (data: InputType): Promise<OutputType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return { error: 'Not authenticated' };
  }

  const { id, boardId, ...values } = data;
  let card;

  try {
    card = await db.card.update({
      where: {
        id,
        list: {
          board: {
            orgId
          }
        }
      },
      data: {
        ...values
      }
    });
  } catch (error) {
    return { error: 'Failed to update card!' };
  }

  revalidatePath(`/boards/${boardId}`);
  return { data: card };
};

export const updateCard = createSafeAction(UpdateCard, handler);
