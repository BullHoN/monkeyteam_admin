import {
	initializeApp,
	applicationDefault,
	cert,
	getApps,
} from 'firebase-admin/app';
import {
	getFirestore,
	Timestamp,
	FieldValue,
	Filter,
} from 'firebase-admin/firestore';

const serviceAccount = require('./monkeyteam-io-firebase-adminsdk-r99b2-9b0238e56d.json');

if (getApps().length == 0) {
	initializeApp({
		credential: cert(serviceAccount),
	});
}

const db = getFirestore();

export { db };
