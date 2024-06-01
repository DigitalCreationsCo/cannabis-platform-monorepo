import { unlockAccount } from '@/lib/accountLock';
import { hashPassword } from '@/lib/auth';
import { clientPromise } from '@/lib/db';
import env from '@/lib/env';
import { recordMetric } from '@/lib/metrics';
import { resetPasswordSchema, validateWithSchema } from '@/lib/zod';
import {
  updateUser,
  deleteManySessions,
  deletePasswordReset,
  getPasswordReset,
} from '@cd/data-access';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ApiError } from 'next/dist/server/api-utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  try {
    switch (method) {
      case 'POST':
        await handlePOST(req, res);
        break;
      default:
        res.setHeader('Allow', 'POST');
        res.status(405).json({
          error: { message: `Method ${method} Not Allowed` },
        });
    }
  } catch (error: any) {
    const message = error.message || 'Something went wrong';
    const status = error.status || 500;

    res.status(status).json({ error: { message } });
  }
}

const handlePOST = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await clientPromise;
  const { token, password } = validateWithSchema(resetPasswordSchema, req.body);

  if (!token) {
    throw new ApiError(422, 'Password reset token is required');
  }

  const passwordReset = await getPasswordReset({ client, where: { token } });

  if (!passwordReset) {
    throw new ApiError(
      422,
      'Invalid password reset token. Please request a new one.'
    );
  }

  if (passwordReset.expiresAt < new Date()) {
    throw new ApiError(
      422,
      'Password reset token has expired. Please request a new one.'
    );
  }

  const hashedPassword = await hashPassword(password);

  const updatedUser = await updateUser({
    client,
    where: { email: passwordReset.email },
    data: {
      password: hashedPassword,
    },
  });

  if (!updatedUser) {
    throw new ApiError(500, 'Error updating password. Please try again.');
  }

  await unlockAccount(updatedUser);

  // Remove all active sessions for the user
  if (env.nextAuth.sessionStrategy === 'database') {
    await deleteManySessions({
      where: { userId: updatedUser.id },
    });
  }

  await deletePasswordReset({ client, where: { token } });

  recordMetric('user.password.reset');

  res.status(200).json({ message: 'Password reset successfully' });
};
