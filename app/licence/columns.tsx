'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckedState } from '@radix-ui/react-checkbox';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import moment from 'moment';

import { Button } from '@/components/ui/button';

import EditLicenceDialog from '../components/EditLicenceDialog';

// const schema = {
//     user_id: 'user machine Id', // autogenerate, machine id of the individual
//     access_key: 'access key for the user',
//     user_type: 'group',
//     enabled: true, // true/false for group members
//     validity_days: 20, // numbers for individual
//     start_date: new Date(), // autogenerate, the start date of the access_key
//     group_name: 'group name', // name of the group
//     quota: 20, // number of quota per month
//   };

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
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

export const daysTypeColumn: ColumnDef<Licence>[] = [
	{
		accessorKey: 'access_key',
		header: 'Access Key',
	},
	{
		accessorKey: 'user_id',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					User Machine Id
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{
		accessorKey: 'validity_days',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Number of Days
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{
		accessorKey: 'start_date',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Start Date
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const start_date = row.getValue('start_date');

			return (
				<>{start_date ? moment(start_date).format('DD-MM-YYYY') : 'no-date'}</>
			);
		},
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			const licence: Licence = row.original;

			return <EditLicenceDialog licence={licence} />;
		},
	},
];

export const groupTypeColumn: ColumnDef<Licence>[] = [
	{
		accessorKey: 'access_key',
		header: 'Access Key',
	},
	{
		accessorKey: 'group_name',
		header: 'Group Name',
		cell: ({ row }) => {
			const groupName = row.getValue('group_name');
			return <>{groupName ? groupName : 'no-name'}</>;
		},
	},
	{
		accessorKey: 'enabled',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Enabled
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const checked: CheckedState = row.getValue('enabled');
			return <Checkbox checked={checked} />;
		},
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			const licence: Licence = row.original;

			return <EditLicenceDialog licence={licence} />;
		},
	},
];

export const invocationTypeColumn: ColumnDef<Licence>[] = [
	{
		accessorKey: 'access_key',
		header: 'Access Key',
	},
	{
		accessorKey: 'quota',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Per Month Quota
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{
		accessorKey: 'start_date',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Start Date
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const start_date = row.getValue('start_date');

			return (
				<>{start_date ? moment(start_date).format('DD-MM-YYYY') : 'no-date'}</>
			);
		},
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			const licence: Licence = row.original;

			return <EditLicenceDialog licence={licence} />;
		},
	},
];
