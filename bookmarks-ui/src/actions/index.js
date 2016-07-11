// Set up your root reducer here...
import { combineReducers } from 'redux';
import {routerReducer as routing} from 'react-router-redux'
import app from './app'
import bookmarks from './bookmarks'
import folders from './folders'

export * from './app'
export * from './bookmarks'
export * from './folders'
 export default combineReducers({
 	app,
 	bookmarks,
 	folders,
 	routing
 })