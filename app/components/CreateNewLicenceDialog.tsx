'use client';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { useEffect, useState } from 'react';
import { Licence } from '../licence/columns';
import { Input } from '@/components/ui/input';
import moment from 'moment';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useLicenceStore } from '../stores/licence-store';

type NewLicenceDialogProps = {
	showCreateNewDialog: boolean;
	setShowCreateNewDialog: (isOpen: boolean) => void;
};

const defaultLicence = {
	id: 's',
	access_key: '',
	enabled: false,
	group_name: '',
	quota: 0,
	start_date: new Date(),
	user_type: 'days',
	validity_days: 0,
};

export default function CreateNewLicenceDialog({
	showCreateNewDialog,
	setShowCreateNewDialog,
}: NewLicenceDialogProps) {
	const [licenceForm, setLicenceForm] = useState<Licence>(defaultLicence);

	const { licenceData, setLicenceData } = useLicenceStore();

	const [loading, setLoading] = useState(false);

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

	const handleNewLicence = async () => {
		// send to api

		setLoading(true);
		const url = `${process.env.NEXT_PUBLIC_URL}/api/licence`;
		const res = await fetch(url, {
			method: 'POST',
			body: JSON.stringify(getPostData()),
		});

		if (!res.ok) {
			alert('something went wrong');
			return;
		}

		const data = await res.json();

		const newLicence = { ...licenceForm, id: data.id };

		setLicenceData([newLicence, ...licenceData]);
		setShowCreateNewDialog(false);
		setLicenceForm(defaultLicence);
		setLoading(false);
	};

	return (
		<Dialog
			open={showCreateNewDialog}
			onOpenChange={(isOpen) => setShowCreateNewDialog(isOpen)}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create New Licence</DialogTitle>
					<DialogDescription>
						<div className="mt-5">
							<Label htmlFor="user_type">Choose a Licence Type</Label>
							<Select
								value={licenceForm.user_type}
								onValueChange={(userType) =>
									setLicenceForm({ ...licenceForm, user_type: userType })
								}
							>
								<SelectTrigger className="w-[180px] mt-1 mb-4" id="user_type">
									<SelectValue placeholder="Licence Type" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="days">Days</SelectItem>
									<SelectItem value="group">Group</SelectItem>
									<SelectItem value="invocations">Invocations</SelectItem>
								</SelectContent>
							</Select>

							<Label htmlFor="access_key">Access Key</Label>
							<Input
								className="mb-4 mt-1"
								id="access_key"
								type="text"
								value={licenceForm.access_key}
								onChange={(e) =>
									setLicenceForm({ ...licenceForm, access_key: e.target.value })
								}
							/>

							{licenceForm.user_type == 'days' && (
								<>
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
								</>
							)}

							{licenceForm.user_type == 'group' && (
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

							{licenceForm.user_type == 'invocations' && (
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
								</>
							)}
						</div>
					</DialogDescription>

					<DialogFooter>
						<Button onClick={handleNewLicence} disabled={loading}>
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
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}
