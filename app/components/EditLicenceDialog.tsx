'use client';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { Licence } from '../licence/columns';
import { useState } from 'react';
import { useLicenceStore } from '../stores/licence-store';
import { Input } from '@/components/ui/input';
import EditDialog from './EditDialog';

type EditLicenceDialogProps = {
	licence: Licence;
};

export default function EditLicenceDialog({ licence }: EditLicenceDialogProps) {
	const [showEditDialog, setShowEditDialog] = useState<boolean>(false);
	const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
	const { licenceData, setLicenceData } = useLicenceStore();

	const handleAction = (action: string) => {
		if (action == 'edit') {
			setShowEditDialog(true);
		} else if (action == 'delete') {
			setShowDeleteDialog(true);
		}
	};

	const deleteLicencehandler = async () => {
		// call the api

		const url = `${process.env.NEXT_PUBLIC_URL}/api/licence`;
		const res = await fetch(url, {
			method: 'DELETE',
			body: JSON.stringify({
				id: licence.id,
			}),
		});

		if (!res.ok) {
			alert('something went wrong');
			return;
		}

		setLicenceData(licenceData.filter((val) => val.id != licence.id));
		setShowDeleteDialog(false);
	};

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" className="h-8 w-8 p-0">
						<span className="sr-only">Open menu</span>
						<MoreHorizontal className="h-4 w-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuItem onClick={() => handleAction('edit')}>
						Edit
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => handleAction('delete')}>
						Delete
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<EditDialog
				showEditDialog={showEditDialog}
				setShowEditDialog={setShowEditDialog}
				licence={licence}
			/>

			<Dialog
				open={showDeleteDialog}
				onOpenChange={(isOpen) => setShowDeleteDialog(isOpen)}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>
							Delete Access Key &quot;{licence.access_key}&quot;
						</DialogTitle>
						<DialogDescription>
							This action cannot be undone. This will permanently data.
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<Button
							type="submit"
							variant="destructive"
							onClick={deleteLicencehandler}
						>
							Delete
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}
