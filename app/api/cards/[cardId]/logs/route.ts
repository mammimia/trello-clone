import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { ENTITIY_TYPE } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { cardId: string } }
) {
  try {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
      return new NextResponse('Not authenticated', { status: 401 });
    }

    const { cardId } = params;

    const logs = await db.auditLog.findMany({
      where: {
        orgId,
        entityId: cardId,
        entityType: ENTITIY_TYPE.CARD
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 3
    });

    return new NextResponse(JSON.stringify(logs));
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 });
  }
}
