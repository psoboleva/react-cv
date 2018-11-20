import { applyMiddleware, combineReducers, createStore, ReducersMapObject } from 'redux';
import thunk from 'redux-thunk';

import { AppReducer, initialState } from './reducers/appReducer';

var reducers: ReducersMapObject = {
	AppReducer
}

declare var window: any;

export default createStore(AppReducer, initialState, applyMiddleware(thunk));