import { db } from '@/lib/db';
import { auth, currentUser } from '@clerk/nextjs';
import { ACTION, ENTITIY_TYPE } from '@prisma/client';

interface CreateAuditLogProps {
  entityId: string;
  entityType: ENTITIY_TYPE;
  entityTitle: string;
  action: ACTION;
}

export const createAuditLog = async ({
  entityId,
  entityType,
  entityTitle,
  action
}: CreateAuditLogProps) => {
  try {
    const { orgId } = auth();
    const user = await currentUser();

    if (!user || !orgId) throw new Error('User or organization not found');

    await db.auditLog.create({
      data: {
        orgId,
        userId: user.id,
        entityId,
        entityType,
        entityTitle,
        action,
        userImage: user?.imageUrl,
        userName: [user?.firstName, user?.lastName].filter(Boolean).join(' ')
      }
    });
  } catch (error) {
    console.error('[AUDIT_LOG_ERROR]: ', error);
  }
};
