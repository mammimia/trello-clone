'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const CreateBoard = z.object({
  title: z.string()
});

export async function createBoard(formData: FormData) {
  const { title } = CreateBoard.parse({
    title: formData.get('title')
  });

  await db.board.create({
    data: {
      title
    }
  });

  revalidatePath('/organization/org_2YLHkdz0Yz9KDF338HjL16lLiZq'); // TODO: hard-coded
}
