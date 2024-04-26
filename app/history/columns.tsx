'use client';

import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import moment from 'moment';

export type History = {
	access_key: string;
	group_name?: string;
	prompt: string;
	response?: string;
	timestamp: Date;
};

export const historyColumn: ColumnDef<History>[] = [
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
		accessorKey: 'prompt',
		header: 'Prompt',
	},
	{
		accessorKey: 'timestamp',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					TimeStamp
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }) => {
			const start_date = row.getValue('timestamp');

			return (
				<>{start_date ? moment(start_date).format('DD-MM-YYYY') : 'no-date'}</>
			);
		},
	},
];
