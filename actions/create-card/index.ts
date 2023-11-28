'use server';

import { createAuditLog } from '@/lib/create-audit-log';
import { createSafeAction } from '@/lib/create-safe-action';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { ACTION, ENTITIY_TYPE } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { CreateCard } from './schema';
import { InputType, OutputType } from './types';

const handler = async (data: InputType): Promise<OutputType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: 'Not authenticated'
    };
  }

  const { title, boardId, listId } = data;
  let card;

  try {
    const list = await db.list.findUnique({
      where: {
        id: listId,
        board: {
          orgId
        }
      }
    });

    if (!list) {
      return {
        error: 'List not found!'
      };
    }

    const lastCard = await db.card.findFirst({
      where: {
        listId
      },
      orderBy: {
        order: 'desc'
      },
      select: {
        order: true
      }
    });

    const newOrder = lastCard ? lastCard.order + 1 : 0;

    card = await db.card.create({
      data: {
        title,
        order: newOrder,
        listId
      }
    });

    await createAuditLog({
      entityId: card.id,
      entityTitle: card.title,
      entityType: ENTITIY_TYPE.CARD,
      action: ACTION.CREATE
    });
  } catch (error) {
    return {
      error: 'Failed to create card!'
    };
  }

  revalidatePath(`/boards/${boardId}`);
  return { data: card };
};

export const createCard = createSafeAction(CreateCard, handler);
