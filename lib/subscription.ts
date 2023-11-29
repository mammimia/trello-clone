import { auth } from '@clerk/nextjs';
import { db } from '@/lib/db';

const DAY_IN_MS = 84_600_000;

export const checkSubscription = async () => {
  const { orgId } = auth();

  if (!orgId) return false;

  const orgSubscription = await db.orgSubscription.findUnique({
    where: {
      orgId
    },
    select: {
      stripeCurrentPeriodEnd: true,
      stripeSubscriptionId: true,
      stripeCustomerId: true,
      stripePriceId: true
    }
  });

  if (!orgSubscription) return false;

  const isValid =
    orgSubscription.stripePriceId &&
    orgSubscription.stripeSubscriptionId &&
    orgSubscription.stripeCustomerId &&
    orgSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now();

  return !!isValid;
};
