import Freshsales from '@cd/core-lib/src/crm/freshsales';
import { type NextApiRequest, type NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case 'POST':
        await handlePOST(req, res);
        break;
      default:
        res.setHeader('Allow', 'POST');
        res.status(405).json({
          error: { message: `Method ${req.method} Not Allowed` },
        });
    }
  } catch (error: any) {
    const message = error.message || 'Something went wrong';
    const status = error.status || 500;

    res.status(status).json({
      success: 'false',
      error: message,
    });
  }
}

const handlePOST = async (req: any, res: any) => {
  const { email } = req.body as { email: string };
  const payload = await Freshsales.createContact({ emails: [{ email }] });
  res.json({ success: 'true', payload });
};
