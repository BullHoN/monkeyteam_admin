import {
	Licence,
	daysTypeColumn,
	groupTypeColumn,
	invocationTypeColumn,
} from './columns';
import { DataTable } from '../components/DataTable';
import LicenceDataTable from './LicenceDataTable';

async function getData(): Promise<Licence[]> {
	// Fetch data from your API here.
	const url = `${process.env.NEXTAUTH_URL}/api/licence`;
	const res = await fetch(url, { cache: 'no-cache' });

	if (!res.ok) {
		return [];
	}

	return (await res.json()).data;

	// return [
	// 	{
	// 		id: '1',
	// 		access_key: 'abc123xyz',
	// 		user_type: 'days',
	// 		validity_days: 30,
	// 		start_date: new Date(),
	// 		user_id: 'user123',
	// 		enabled: true,
	// 		group_name: 'admins',
	// 		quota: 100,
	// 	},
	// 	{
	// 		id: '2',
	// 		access_key: 'xyz789abc',
	// 		user_type: 'days',
	// 		validity_days: 15,
	// 		start_date: new Date('2024-04-20'),
	// 		user_id: 'user456',
	// 		enabled: false,
	// 	},
	// 	{
	// 		id: '3',
	// 		access_key: '123abc456',
	// 		user_type: 'group',
	// 		validity_days: 60,
	// 		start_date: new Date('2024-04-25'),
	// 		user_id: 'user789',
	// 		enabled: true,
	// 		group_name: 'developers',
	// 	},
	// 	{
	// 		id: '4',
	// 		access_key: 'def456ghi',
	// 		user_type: 'invocations',
	// 		start_date: new Date('2024-04-22'),
	// 		user_id: 'user321',
	// 		quota: 200,
	// 	},
	// ];
}

export default async function Component() {
	const data = await getData();

	return (
		<div className="p-4 sm:ml-64">
			<LicenceDataTable data={data} isLicence={true} />
		</div>
	);
}
