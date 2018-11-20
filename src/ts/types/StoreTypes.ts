import { IGalleryData, GalleryItemType } from './GalleryTypes'
import { ITextData } from './TextDataTypes'

export interface ICV {
	SKILLS: any;
	PROFESSIONAL_EXPERIENCE: any;
	UNIVERSITY_DEGREES: any;
	BIGGEST_PROJECTS: any;
}

export interface IStoreBase {
	menuOption?: IItem;
	data?: ITextData | IGalleryData[] | ICV;
	filteredData?: IGalleryData[];
	chunkedData?: (IGalleryData[])[];
	dataLoading?: boolean;
	dataError?: boolean;
	introData?: ITextData;
	showAbout?: boolean;
	itemType?: GalleryItemType;
}

export interface AppStoreState extends IStoreBase {
	introURL: string;
	menuItems: IItem[];
}

export interface IItem {
	name: string;
	path: string;
	title: string;
	showAbout?: boolean;
	component: any;
	dataUrl?: string;
}

export interface IPageProperties {
	menuOption: IItem,
	dataLoading: boolean,
	dataError: boolean,
}

export const commonProperties = (state) => ({
	menuOption: state.menuOption,
	dataLoading: state.dataLoading,
	dataError: state.dataError,
	data: state.data,
})

export interface IMessageDisplay {
	message: string;
}