'use client';

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
import { Input } from '@/components/ui/input';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Licence } from '../licence/columns';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import moment from 'moment';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useLicenceStore } from '../stores/licence-store';
import { Checkbox } from '@/components/ui/checkbox';

type EditDialogProps = {
	showEditDialog: boolean;
	setShowEditDialog: (isOpen: boolean) => void;
	licence: Licence;
};

export default function EditDialog({
	showEditDialog,
	setShowEditDialog,
	licence,
}: EditDialogProps) {
	const [licenceForm, setLicenceForm] = useState<Licence>(licence);
	const [loading, setLoading] = useState<boolean>(false);
	const { licenceData, setLicenceData } = useLicenceStore();

	const getPostData = () => {
		if (licenceForm.user_type == 'group') {
			return {
				access_key: licenceForm.access_key,
				user_type: 'group',
				group_name: licenceForm.group_name,
				enabled: licenceForm.enabled,
			};
		} else if (licenceForm.user_type == 'invocations') {
			return {
				access_key: licenceForm.access_key,
				user_type: 'invocations',
				quota: licenceForm.quota,
			};
		} else {
			return {
				access_key: licenceForm.access_key,
				user_type: 'days',
				validity_days: licenceForm.validity_days,
			};
		}
	};

	const handleEdit = async () => {
		// call the api

		setLoading(true);
		const url = `${process.env.NEXT_PUBLIC_URL}/api/licence`;
		const res = await fetch(url, {
			method: 'PUT',
			body: JSON.stringify(getPostData()),
		});

		if (!res.ok) {
			alert('something went wrong');
			return;
		}

		setLicenceData(
			licenceData.map((val) => (val.id == licence.id ? licenceForm : val)),
		);
		setShowEditDialog(false);
		setLoading(false);
	};

	console.log('user type', licence.user_type);

	return (
		<Dialog
			open={showEditDialog}
			onOpenChange={(isOpen) => setShowEditDialog(isOpen)}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edit</DialogTitle>
					<DialogDescription>
						<div className="mt-5">
							<Label htmlFor="access_key">Access Key</Label>
							<Input
								className="mb-4 mt-1"
								id="access_key"
								disabled={true}
								type="text"
								value={licenceForm.access_key}
							/>

							{licence.user_type == 'days' && (
								<>
									<Label htmlFor="user_id">Machine Id</Label>
									<Input
										id="user_id"
										className="mb-4 mt-1"
										type="text"
										value={licenceForm.user_id}
										onChange={(e) =>
											setLicenceForm({
												...licenceForm,
												user_id: e.target.value,
											})
										}
									/>

									<Label htmlFor="validity_days">Number Of Days</Label>
									<Input
										id="validity_days"
										className="mb-4 mt-1"
										type="number"
										value={licenceForm.validity_days}
										onChange={(e) =>
											setLicenceForm({
												...licenceForm,
												validity_days: Number.parseInt(e.target.value),
											})
										}
									/>

									<Label htmlFor="start_date">Start Date</Label>
									<Input
										id="start_date"
										className="mb-4 mt-1"
										type="date"
										value={moment(licenceForm.start_date).format('YYYY-MM-DD')}
										onChange={(e) =>
											setLicenceForm({
												...licenceForm,
												start_date: moment(e.target.value).toDate(),
											})
										}
									/>
								</>
							)}

							{licence.user_type == 'group' && (
								<>
									<Label htmlFor="group_name">Group Name</Label>
									<Input
										id="group_name"
										className="mb-4 mt-1"
										type="text"
										value={licenceForm.group_name}
										onChange={(e) =>
											setLicenceForm({
												...licenceForm,
												group_name: e.target.value,
											})
										}
									/>

									<Label htmlFor="group_name">Enabled</Label>
									<Checkbox
										id="group_name"
										className="mb-4 ml-2"
										checked={licenceForm.enabled}
										onCheckedChange={(isChecked) =>
											setLicenceForm({
												...licenceForm,
												enabled: isChecked == true,
											})
										}
									/>
								</>
							)}

							{licence.user_type == 'invocations' && (
								<>
									<Label htmlFor="quota">Quota Per Month</Label>
									<Input
										id="quota"
										className="mb-4 mt-1"
										type="number"
										value={licenceForm.quota}
										onChange={(e) =>
											setLicenceForm({
												...licenceForm,
												quota: Number.parseInt(e.target.value),
											})
										}
									/>

									<Label htmlFor="start_date">Start Date</Label>
									<Input
										id="start_date"
										className="mb-4 mt-1"
										type="date"
										value={moment(licenceForm.start_date).format('YYYY-MM-DD')}
										onChange={(e) =>
											setLicenceForm({
												...licenceForm,
												start_date: moment(e.target.value).toDate(),
											})
										}
									/>
								</>
							)}
						</div>
					</DialogDescription>
				</DialogHeader>

				<DialogFooter>
					<Button onClick={handleEdit} disabled={loading}>
						{loading ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Please Wait
							</>
						) : (
							<>Save</>
						)}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
