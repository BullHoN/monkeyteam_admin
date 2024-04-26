import { db } from '../firestore/firestoreConfig';

export type Licence = {
	id: string;
	access_key: string;
	user_type?: string;

	validity_days?: number;
	start_date?: Date;
	user_id?: string;

	enabled?: boolean;
	group_name?: string;

	quota?: number;
};

export async function GET() {
	try {
		const allLicence = await db.collection('code-snippet-licence').get();

		let res: Licence[] = [];
		allLicence.forEach((doc) => {
			res.push({
				id: doc.id,
				...doc.data(),
				access_key: doc.data().access_key,
				start_date: new Date(doc.data().start_date?._seconds * 1000),
			});
		});

		return Response.json({ data: res });
	} catch (error) {
		console.log(error);
		return Response.json({ error: error });
	}
}

export async function PUT(req: Request) {
	try {
		const payload = await req.json();
		const allLicence = await db.collection('code-snippet-licence');

		await allLicence.doc(payload.id).update(payload);

		return Response.json({ status: true });
	} catch (err) {
		return Response.json({ error: err });
	}
}

export async function POST(req: Request) {
	try {
		const payload = await req.json();
		const allLicence = await db.collection('code-snippet-licence');

		const doc = await allLicence.add(payload);

		return Response.json({ status: true, id: doc.id });
	} catch (err) {
		return Response.json({ error: err });
	}
}

export async function DELETE(req: Request) {
	try {
		const payload = await req.json();
		const allLicence = await db.collection('code-snippet-licence');

		await allLicence.doc(payload.id).delete();

		return Response.json({ status: true });
	} catch (err) {
		return Response.json({ error: err });
	}
}
