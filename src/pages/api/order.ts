import { NextApiRequest, NextApiResponse } from "next";

import sequelize from "@/models";
import Order from "@/models/order";

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    await Order.sync();
  } catch (error) {
    console.error('Database connection error:', error);
  }
})();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		const { bornInBrasil, taxDomicile, responsibleForActs, politicallyExposedPerson, authorizeSCRConsultation, shareData } = req.body;
		if (!bornInBrasil || !taxDomicile || !responsibleForActs || !politicallyExposedPerson || !authorizeSCRConsultation || !shareData) {
			return res.status(400).json({ error: 'All fields are required.' });
		}
		try {
			const _application = await Order.create({ bornInBrasil, taxDomicile, responsibleForActs, politicallyExposedPerson, authorizeSCRConsultation, shareData });
			const application = await _application.save();
			return res.status(201).json({ application, id: application.id });
		} catch (error) {
			console.error('Error creating declarations:', error);
			return res.status(500).json({ error: 'Failed to create declarations.' });
		}
	} else if (req.method === 'PUT') {
		const body = req.body;
		if (!body.id) {
			return res.status(400).json({ error: 'ID is required.' });
		}
		try {
			const application = await Order.findByPk(body.id);
			if (!application) {
				return res.status(404).json({ error: 'Declarations not found.' });
			}
			const updatedApplication = await application.update(body);
			return res.status(200).json({ message: 'Declarations updated.', updatedApplication });
		} catch (error) {
			console.error('Error updating declarations:', error);
			return res.status(500).json({ error: 'Failed to update declarations.' });
		}
	} else {
		res.setHeader('Allow', ['POST', 'PUT']);
		return res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}
