import { Reducer } from 'redux'
import * as object_assign from 'object-assign'

import { AppStoreState } from '../types/StoreTypes'
import { pages } from '../SiteBuilder'
import { AppAction } from '../actions/AppStoreActions'

export const initialState: AppStoreState = {
	menuItems: pages.slice(0, -1),
	menuOption: pages[0],
	introURL: 'http://polina.space/ng4/data/intro2.php',
}

export function AppReducer(state: AppStoreState, action: AppAction): AppStoreState {
	if (typeof state === 'undefined') {
		return initialState;
	}

	switch (action.type) {

		case 'SET_MENU_OPTION':
			return object_assign({}, state, { menuOption: action.menuOption });
		case 'SET_DATA':
			return object_assign({}, state, { data: action.data });
		case 'SET_INTRO_DATA':
			return object_assign({}, state, { introData: action.introData });
		case 'DATA_LOADING':
			return object_assign({}, state, { dataLoading: action.dataLoading });
		case 'DATA_ERROR':
			return object_assign({}, state, { dataError: action.dataError });
		case 'GALLERY_FILTER':
			return object_assign({}, state, { filteredData: action.filteredData });
		case 'CHUNK_DATA':
			return object_assign({}, state, { chunkedData: action.chunkedData, data: action.data, itemType: action.itemType });

	}

	return state;
};