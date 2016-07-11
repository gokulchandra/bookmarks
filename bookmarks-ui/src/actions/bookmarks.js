import server from '../common/client/server'
import update from 'react-addons-update'

const initialState = {
  list:[],
  newBookmark: null
}
const RECEIVE_LIST = 'bookmarks/RECEIVE_LIST'
const UPDATE = 'bookmarks/UPDATE'

export function receiveBookmarks(bookmarks) {
  return { type: RECEIVE_LIST, payload: bookmarks }
}

export function updateBookmark(bookmark) {
  return { type: UPDATE, payload: bookmark }
}


export function loadBookmarks() {
  return dispatch => {
    return server.get('/bookmarks')
      .then(res => dispatch(receiveBookmarks(res.data)))
      .catch(error => console.log('Network error'))
  }
}

export function createBookmark() {
  return (dispatch, getState) => {
    let bookmark = getState().bookmarks.newBookmark
    return server.post('/bookmarks', bookmark)
      .then(dispatch(loadBookmarks()))
      .then(dispatch(updateBookmark(null)))
      .catch(error => console.log('Bookmark not created'))
  }
}

export function deleteBookmark(id) {
  return (dispatch, getState) => {
    server.delete(`/bookmarks/${id}`)
    .then(dispatch(loadBookmarks()))
    .catch(error =>  console.log(e))
  }
}

export function assignBookmarkToFolder(bookmark, folder) {
  return (dispatch, getState) => {
    server.put(`/bookmarks/${bookmark}/folders/${folder}`)
    .then(dispatch(loadBookmarks()))
    .catch(error => console.log('Bookmark not updated'))
  }
}

export default function reducer(state = initialState, action) {
  let { type, payload } = action
  switch (type) {
    case RECEIVE_LIST:
      return update(state, { list: { $set: payload } })

    case UPDATE:
      return update(state, { newBookmark: { $set: payload } })

    default:
      return state
  }
}
