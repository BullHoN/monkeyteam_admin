'use client';

import { useLicenceStore } from '../stores/licence-store';
import { DataTable } from '../components/DataTable';
import {
	Licence,
	daysTypeColumn,
	groupTypeColumn,
	invocationTypeColumn,
} from './columns';
import { useEffect } from 'react';

interface DataTableProps {
	data: Licence[];
	isLicence?: Boolean;
}

export default function LicenceDataTable({ data, isLicence }: DataTableProps) {
	const { licenceType, setLicenceData, licenceData } = useLicenceStore();

	useEffect(() => {
		console.log('data', data);
		// set all licence data in the store
		setLicenceData(data);
	}, []);

	const groupData = licenceData.filter((d) => d.user_type == 'group');
	// console.log('all group data', groupData, licenceType);

	if (licenceType == 'group') {
		return (
			<DataTable
				columns={groupTypeColumn}
				data={groupData}
				isLicence={isLicence}
			/>
		);
	} else if (licenceType == 'invocations') {
		return (
			<DataTable
				columns={invocationTypeColumn}
				data={licenceData.filter((d) => d.user_type == 'invocations')}
				isLicence={isLicence}
			/>
		);
	} else {
		// days
		return (
			<DataTable
				columns={daysTypeColumn}
				data={licenceData.filter((d) => d.user_type == 'days')}
				isLicence={isLicence}
			/>
		);
	}
}
