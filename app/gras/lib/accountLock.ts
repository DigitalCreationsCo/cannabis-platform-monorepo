import { generateToken } from '@cd/core-lib';
import {
  type User,
  updateUser,
  createVerificationToken,
} from '@cd/data-access';
import { render } from '@react-email/components';
import AccountLocked from '@/components/emailTemplates/AccountLocked';

import app from './app';
import { clientPromise } from './db';
import { sendEmail } from './email/sendEmail';
import env from './env';

const UNLOCK_ACCOUNT_TOKEN_EXPIRATION = 7 * 24 * 60 * 60 * 1000; // 7 days

export const incrementLoginAttempts = async (user: User) => {
  const client = await clientPromise;

  const updatedUser = await updateUser({
    client,
    where: { id: user.id },
    data: {
      invalid_login_attempts: {
        increment: 1,
      },
    },
  });

  if (exceededLoginAttemptsThreshold(updatedUser)) {
    await updateUser({
      client,
      where: { id: user.id },
      data: {
        lockedAt: new Date(),
      },
    });

    await sendLockoutEmail(user);
  }

  return updatedUser;
};

export const clearLoginAttempts = async (user: User) => {
  const client = await clientPromise;
  await updateUser({
    client,
    where: { id: user.id },
    data: {
      invalid_login_attempts: 0,
    },
  });
};

export const unlockAccount = async (user: User) => {
  const client = await clientPromise;
  await updateUser({
    client,
    where: { id: user.id },
    data: {
      invalid_login_attempts: 0,
      lockedAt: null,
    },
  });
};

export const sendLockoutEmail = async (user: User, resending = false) => {
  const client = await clientPromise;
  const verificationToken = await createVerificationToken({
    client,
    token: generateToken(),
    identifier: user.email,
    expires: new Date(Date.now() + UNLOCK_ACCOUNT_TOKEN_EXPIRATION),
  });

  const subject = resending
    ? `Unlock your ${app.name} account`
    : `Your ${app.name} account has been locked`;

  const token = encodeURIComponent(verificationToken.token);
  const url = `${app.url}/auth/unlock-account?token=${token}`;

  const html = render(AccountLocked({ subject, url }));

  await sendEmail({
    to: user.email,
    subject,
    html,
  });
};

export const exceededLoginAttemptsThreshold = (user: User) => {
  return user.invalid_login_attempts >= env.maxLoginAttempts;
};

export const isAccountLocked = (user: User) => {
  return !!user.lockedAt && exceededLoginAttemptsThreshold(user);
};
