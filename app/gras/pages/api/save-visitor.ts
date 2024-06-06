import { applicationHeaders, urlBuilder } from '@cd/core-lib';
import axios from 'axios';
import { type NextApiRequest, type NextApiResponse } from 'next';

const FRESHSALES_ADMIN_USERID = 26004178205;

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
  try {
    const { email } = req.body as { email: string };

    const response = await axios.post<any>(
      urlBuilder.freshSales.createContact(),
      {
        contact: {
          email,
          lead_source_id: null,
          owner_id: FRESHSALES_ADMIN_USERID,
          medium: 'new-visitor',
          keyword: 'visitor',
        },
      },
      {
        headers: {
          ...applicationHeaders,
          authorization: `Token token=${process.env.FRESHSALES_API_KEY}`,
        },
      }
    );

    if (response.status > 299) throw new Error('Failed to send the message.');

    return res
      .status(response.status)
      .json({ success: 'true', payload: response.data.Response });
  } catch (error: any) {
    console.error('POST api/save-visitor: ', error.message);
    return res.json({
      success: 'false',
      error: error.response?.data?.errors?.message[0] || error.message,
    });
  }
};
