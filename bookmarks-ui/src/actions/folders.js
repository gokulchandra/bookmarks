import server from '../common/client/server'
import update from 'react-addons-update'
import {loadBookmarks} from './bookmarks'
import {push as pushPath} from 'react-router-redux'
const initialState = {
  list:[],
  newFolder: null,
  selectedFolder:null,
}
const RECEIVE_LIST = 'folders/RECEIVE_LIST'
const UPDATE = 'folders/UPDATE'
const SELECT = 'folders/SELECT'

export function receiveFolders(folders) {
  return { type: RECEIVE_LIST, payload: folders }
}

export function updateFolder(folder) {
  return { type: UPDATE, payload: folder }
}

export function _selectFolder(folder) {
  return { type: SELECT, payload: folder }
}

export function selectFolder(folder) {
  return dispatch => {
    dispatch(_selectFolder(folder))
    dispatch(pushPath('/folder'))
  }
}

export function loadFolders() {
  return dispatch => {
    return server.get('/folders')
      .then(res => dispatch(receiveFolders(res.data)))
      .catch(error => console.log('Network error'))
  }
}

export function createFolder() {
  return (dispatch, getState) => {
    let folder = getState().folders.newFolder
    server.post('/folders', folder)
    .then(dispatch(loadFolders()))
    .then(dispatch(updateFolder(null)))
    .catch(error => console.log('Folder not created'))
  }
}

export function deleteFolder(id, cascade=false) {
  return (dispatch, getState) => {
    cascade = cascade ? 1 : 0
    server.delete(`/folders/${id}?cascade=${cascade}`)
    .then(dispatch(loadFolders()))
    .then(dispatch(loadBookmarks()))
    .catch(error => console.log('Folder not deleted'))
  }
}

export default function reducer(state = initialState, action) {
  let { type, payload } = action
  switch (type) {
    case RECEIVE_LIST:
      return update(state, { list: { $set: payload } })

    case UPDATE:
      return update(state, { newFolder: { $set: payload } })

    case SELECT:
      return update(state, {selectedFolder: { $set: payload }})

    default:
      return state
  }
}
