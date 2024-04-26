'use client';

import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
	getPaginationRowModel,
	SortingState,
	getSortedRowModel,
	ColumnFiltersState,
	getFilteredRowModel,
} from '@tanstack/react-table';

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import { ChangeEvent, useState } from 'react';
import { Input } from '@/components/ui/input';
import { useLicenceStore } from '../stores/licence-store';
import { Licence } from '../licence/columns';
import CreateNewLicenceDialog from './CreateNewLicenceDialog';

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	isLicence?: Boolean;
}

export function DataTable<TData, TValue>({
	columns,
	data,
	isLicence,
}: DataTableProps<TData, TValue>) {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const {
		setLicenceType,
		showCreateNewDialog,
		setShowCreateNewDialog,
		licenceData,
	} = useLicenceStore();
	const [filter, setFilter] = useState<string>('');

	// const groupData = licenceData.filter(
	// 	(d) => d.user_type == (data[0] as Licence).user_type,
	// );
	const table = useReactTable({
		data: data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		pageCount: 20,
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		state: {
			sorting,
			columnFilters,
		},
	});

	const handleLicenceTypeChange = (newvalue: string) => {
		setLicenceType(newvalue);
	};

	const handleFiltering = (e: ChangeEvent<HTMLInputElement>) => {
		const curr = e.target.value;

		if (curr != '') {
			const isAccessKey = licenceData.find((value) => {
				if (value.access_key.includes(curr)) return true;
				return false;
			});

			const isGroupName = licenceData.find((value) => {
				if (value.group_name?.includes(curr)) return true;
				return false;
			});

			if (isAccessKey) {
				table.getColumn('access_key')?.setFilterValue(curr);
				table.getColumn('group_name')?.setFilterValue('');
			} else if (isGroupName) {
				table.getColumn('group_name')?.setFilterValue(curr);
				table.getColumn('access_key')?.setFilterValue('');
			} else {
				table.getColumn('group_name')?.setFilterValue(curr);
				table.getColumn('access_key')?.setFilterValue(curr);
			}
		} else {
			table.getColumn('group_name')?.setFilterValue('');
			table.getColumn('access_key')?.setFilterValue('');
		}

		setFilter(curr);
	};

	return (
		<div>
			<div className="flex items-center py-4">
				<Input
					placeholder="Search by access_key or group_name"
					value={filter}
					onChange={handleFiltering}
					className="max-w-sm"
				/>

				{isLicence ? (
					<>
						<div className="ml-12">
							<Select onValueChange={handleLicenceTypeChange}>
								<SelectTrigger className="w-[180px]">
									<SelectValue
										placeholder="Licence Type"
										defaultValue={'days'}
									/>
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="days">Days</SelectItem>
									<SelectItem value="group">Group</SelectItem>
									<SelectItem value="invocations">Invocations</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div className="ml-12">
							<Button
								onClick={() => setShowCreateNewDialog(!showCreateNewDialog)}
							>
								Create New
							</Button>
						</div>
					</>
				) : (
					<></>
				)}
			</div>

			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
												  )}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && 'selected'}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			<div className="flex items-center justify-end space-x-2 py-4">
				<Button
					variant="outline"
					size="sm"
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
				>
					Previous
				</Button>
				<Button
					variant="outline"
					size="sm"
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
				>
					Next
				</Button>
			</div>

			<CreateNewLicenceDialog
				showCreateNewDialog={showCreateNewDialog}
				setShowCreateNewDialog={setShowCreateNewDialog}
			/>
		</div>
	);
}
