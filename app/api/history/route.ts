import { db } from '../firestore/firestoreConfig';

export type History = {
	id?: string;
	access_key?: string;
	group_name?: string;
	prompt?: string;
	response?: string;
	timestamp?: Date;
};

export async function GET() {
	try {
		const allLicence = await db.collection('history').get();

		let res: History[] = [];
		allLicence.forEach((doc) => {
			res.push({
				id: doc.id,
				...doc.data(),
				timestamp: doc.createTime.toDate(),
			});
		});

		return Response.json({ data: res });
	} catch (error) {
		console.log(error);
		return Response.json({ error: error });
	}
}
