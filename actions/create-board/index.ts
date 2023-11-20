'use server';

import { auth } from '@clerk/nextjs';
import { InputType, OutputType } from './types';
import { revalidatePath } from 'next/cache';
import { createSafeAction } from '@/lib/create-safe-action';
import { CreateBoard } from './schema';

const handler = async (data: InputType): Promise<OutputType> => {
  const { userId } = auth();

  if (!userId) {
    return {
      error: 'Not authenticated'
    };
  }

  const { title } = data;
  let board;

  try {
    board = await prisma.board.create({
      data: {
        title
      }
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
