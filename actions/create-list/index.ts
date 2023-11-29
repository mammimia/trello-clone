'use server';

import { createSafeAction } from '@/lib/create-safe-action';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { revalidatePath } from 'next/cache';
import { CreateList } from './schema';
import { InputType, OutputType } from './types';
import { createAuditLog } from '@/lib/create-audit-log';
import { ACTION, ENTITIY_TYPE } from '@prisma/client';

const handler = async (data: InputType): Promise<OutputType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: 'Not authenticated'
    };
  }

  const { title, boardId } = data;
  let list;

  try {
    const board = await db.board.findUnique({
      where: {
        id: boardId,
        orgId
      }
    });

    if (!board) {
      return {
        error: 'Board not found'
      };
    }

    const lastList = await db.list.findFirst({
      where: {
        boardId
      },
      orderBy: {
        order: 'desc'
      },
      select: {
        order: true
      }
    });

    const newOrder = lastList ? lastList.order + 1 : 1;

    list = await db.list.create({
      data: {
        title,
        boardId,
        order: newOrder
      }
    });

    await createAuditLog({
      entityTitle: list.title,
      entityId: list.id,
      entityType: ENTITIY_TYPE.LIST,
      action: ACTION.CREATE
    });
  } catch (error) {
    return {
      error: 'Failed to create list!'
    };
  }

  revalidatePath(`/boards/${boardId}`);
  return { data: list };
};

export const createList = createSafeAction(CreateList, handler);
