import { z } from 'zod';
import { slugify } from '@cd/core-lib';
import {
  teamName,
  apiKeyId,
  slug,
  domain,
  email,
  password,
  token,
  role,
  sentViaEmail,
  domains,
  expiredToken,
  sessionId,
  recaptchaToken,
  priceId,
  quantity,
  memberId,
  inviteToken,
  url,
  endpointId,
  sentViaEmailString,
  invitationId,
  name,
  image,
  eventTypes,
} from './primitives';

export const createApiKeySchema = z.object({
  name: teamName,
});

export const deleteApiKeySchema = z.object({
  apiKeyId,
});

export const teamSlugSchema = z.object({
  slug,
});

export const updateTeamSchema = z.object({
  name: teamName,
  slug: slug.transform((slug) => slugify(slug)),
  domain,
});

export const createTeamSchema = z.object({
  name: teamName,
});

export const updateAccountSchema = z.union([
  z.object({
    email,
  }),
  z.object({
    name,
  }),
  z.object({
    image,
  }),
]);

export const updatePasswordSchema = z.object({
  currentPassword: password,
  newPassword: password,
});

export const userJoinSchema = z.union([
  z.object({
    dispensary: teamName,
    slug,
  }),
  z.object({
    name,
    email,
    password,
  }),
]);

export const resetPasswordSchema = z.object({
  password,
  token,
});

export const inviteViaEmailSchema = z.union([
  z.object({
    email,
    role,
    sentViaEmail,
  }),
  z.object({
    role,
    sentViaEmail,
    domains,
  }),
]);

export const resendLinkRequestSchema = z.object({
  email,
  expiredToken,
});

export const deleteSessionSchema = z.object({
  id: sessionId,
});

export const forgotPasswordSchema = z.object({
  email,
  recaptchaToken: recaptchaToken.optional(),
});

export const resendEmailToken = z.object({
  email,
});

export const checkoutSessionSchema = z.object({
  price: priceId,
  quantity: quantity.optional(),
});

export const updateMemberSchema = z.object({
  role,
  memberId,
});

export const acceptInvitationSchema = z.object({
  inviteToken,
});

export const getInvitationSchema = z.object({
  token: inviteToken,
});

export const webhookEndpointSchema = z.object({
  name,
  url,
  eventTypes,
});

export const updateWebhookEndpointSchema = webhookEndpointSchema.extend({
  endpointId,
});

export const getInvitationsSchema = z.object({
  sentViaEmail: sentViaEmailString,
});

export const deleteInvitationSchema = z.object({
  id: invitationId,
});

export const getWebhookSchema = z.object({
  endpointId,
});

export const deleteWebhookSchema = z.object({
  webhookId: endpointId,
});

export const deleteMemberSchema = z.object({
  memberId,
});
