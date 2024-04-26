import { DataTable } from '../components/DataTable';
import { History, historyColumn } from './columns';

async function getData(): Promise<History[]> {
	// Fetch data from your API here.
	const url = `${process.env.NEXT_PUBLIC_URL}/api/history`;
	const res = await fetch(url, { cache: 'no-cache' });

	if (!res.ok) {
		return [];
	}

	return (await res.json()).data;
}

export default async function Component() {
	const data = await getData();

	return (
		<div className="p-4 sm:ml-64">
			<DataTable columns={historyColumn} data={data} isLicence={false} />
		</div>
	);
}
