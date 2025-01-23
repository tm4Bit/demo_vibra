import type { NextApiRequest, NextApiResponse } from 'next'
import Lead from '../../models/lead';
import sequelize from '../../models/index';

export const runtime = "edge";

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    await Lead.sync();
  } catch (error) {
    console.error('Database connection error:', error);
  }
})();

type ResponseData = {
  error?: string,
  message?: string,
  leadId?: number
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === 'POST') {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Lead name is required.' });
    }

    try {
      const lead = await Lead.create({ name });

      setTimeout(async () => {
        lead.status = 'completed';
        await lead.save();
      }, 5000);

      return res.status(202).json({
        message: 'Lead created.',
        leadId: lead.id,
      });
    } catch (error) {
      console.error('Error creating lead:', error);
      return res.status(500).json({ error: 'Failed to create lead.' });
    } finally {
			await sequelize.close();
		}
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
