import { permissions } from '@cd/core-lib';
import type { NextApiRequest, NextApiResponse } from 'next';
import { throwIfNoDispensaryAccess } from '@/lib/dispensary';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // eslint-disable-next-line sonarjs/no-small-switch
    switch (req.method) {
      case 'GET':
        await handleGET(req, res);
        break;
      default:
        res.setHeader('Allow', 'GET');
        res.status(405).json({
          error: { message: `Method ${req.method} Not Allowed` },
        });
    }
  } catch (error: any) {
    const message = error.message || 'Something went wrong';
    const status = error.status || 500;

    res.status(status).json({ error: { message } });
  }
}

// Get permissions for a team for the current user
const handleGET = async (req: NextApiRequest, res: NextApiResponse) => {
  const teamRole = await throwIfNoDispensaryAccess(req, res);

  res.json({ data: permissions[teamRole.role] });
};
