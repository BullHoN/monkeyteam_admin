import { create } from 'zustand';
import { Licence } from '../licence/columns';

// export enum LicenceType {
// 	DAYS = 'days',
// 	GROUP = 'group',
// 	INVOCATIONS = 'invocations',
// }

type LicenceStore = {
	licenceData: Licence[];
	setLicenceData: (newLicences: Licence[]) => void;
	licenceType: string;
	setLicenceType: (licenceType: string) => void;
	showCreateNewDialog: boolean;
	setShowCreateNewDialog: (val: boolean) => void;
};

export const useLicenceStore = create<LicenceStore>((set) => ({
	licenceData: [],
	setLicenceData: (newLicences: Licence[]) =>
		set((state) => ({ licenceData: newLicences })),
	licenceType: 'days',
	setLicenceType: (changedLicenceType: string) =>
		set((state) => ({ licenceType: changedLicenceType })),
	showCreateNewDialog: false,
	setShowCreateNewDialog: (val: boolean) =>
		set((state) => ({ showCreateNewDialog: val })),
}));
