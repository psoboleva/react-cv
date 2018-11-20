import { Action } from 'redux'
import { IItem, IStoreBase } from '../types/StoreTypes'
import { ITextData } from '../types/TextDataTypes'
import { IGalleryData, GalleryItemType } from '../types/GalleryTypes'

export interface AppAction extends IStoreBase, Action {
}

export const SetMenuOption = function (menuOption: IItem): AppAction {

	return {
		type: 'SET_MENU_OPTION',
		menuOption: menuOption,
	};
}
export const setData = function (data: ITextData | IGalleryData[]): AppAction {
	console.log(data);
	return {
		type: 'SET_DATA',
		data: data
	};
}

export const setIntroData = function (data: ITextData): AppAction {
	return {
		type: 'SET_INTRO_DATA',
		introData: data
	};
}

export const dataLoading = function (status: boolean): AppAction {
	return {
		type: 'DATA_LOADING',
		dataLoading: status
	};
}
export const dataError = function (status: boolean): AppAction {
	return {
		type: 'DATA_ERROR',
		dataError: status
	};
}

export const filterGalleryData = function (data: IGalleryData[], type: GalleryItemType) {

	return (dispatch) => {
		dispatch(dataLoading(true));
		if (type === GalleryItemType.All) {
			dispatch(chunkGalleryData(data));
			dispatch(dataLoading(false));
		} else {
			let filtered = data.filter(
				function (rs) {
					return rs.type.indexOf(type) > -1;
				}
			);
			dispatch(chunkGalleryData(data, filtered, type));
			dispatch(dataLoading(false));
		}

	};

}

export const chunkGalleryData = function (data: IGalleryData[], filtered?: IGalleryData[], type?: GalleryItemType) {

	var moreData: IGalleryData[] = filtered ? filtered : data;

	let chunk_size = 10;
	let temparray = [];
	let j = -1;
	for (let i = 0, j = moreData.length; i < j; i += chunk_size) {
		temparray.push(moreData.slice(i, i + chunk_size));
	}

	return {
		type: 'CHUNK_DATA',
		chunkedData: temparray,
		data: data,
		itemType: type ? type : GalleryItemType.All
	}

}
export const getGalleryData = function (url: string) {

	return (dispatch) => {
		dispatch(dataLoading(true));
		fetch(
			url, {
				method: 'GET',
				headers: {
					Accept: 'application/json',
				},
			},
		)
			.then(
				response => {
					if (response.ok) {
						response.json().then(json => {
							dispatch(chunkGalleryData(json));
							dispatch(dataLoading(false));
						}
						)
							.catch(() => dispatch(dataError(true)));
					}
				});
	}

}


export const getData = function (url: string) {

	return (dispatch) => {
		dispatch(dataLoading(true));
		fetch(
			url, {
				method: 'GET',
				headers: {
					Accept: 'application/json',
				},
			},
		)
			.then(
				response => {
					if (response.ok) {
						response.json().then(json => {
							dispatch(setData(json));
							dispatch(dataLoading(false));
						}
						)
							.catch(() => dispatch(dataError(true)));
					}
				});
	}

}

export const getIntroData = function (url: string) {

	return (dispatch) => {

		fetch(
			url, {
				method: 'GET',
				headers: {
					Accept: 'application/json',
				},
			},
		)
			.then(
				response => {
					if (response.ok) {
						response.json().then(json => {
							dispatch(setIntroData(json));
						}
						)
							.catch(() => dispatch(dataError(true)));
					}
				});
	}

}