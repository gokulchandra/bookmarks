import _ from 'lodash'
import React from 'react'
import {createSelector} from 'reselect'
import {connect} from 'react-redux'
import {bindDispatch} from 'common/util/redux'
import ListView from 'views/list-items-view'

import 'app/css/app.css'

export default class FolderPage extends React.Component {
	componentWillMount() {
		this.props.actions.loadBookmarks()
		this.props.actions.loadFolders()
	}

	filterItems() {
		let {bookmarks, folders, actions} = this.props
		return _.filter(bookmarks.list, (bookmark) => {
			return bookmark.folder === folders.selectedFolder['_id']
		})
	}

	render() {
		let {bookmarks, folders, actions} = this.props
		let items = this.filterItems()
		return (
			<div className='clearfix p3'>
				<div className='h2'>{folders.selectedFolder.name}</div>
				<div className='h3'>Bookmarks</div>
				<ListView 
					items={items} 
					folders={folders} 
					updateFolder={actions.assignBookmarkToFolder}  
					deleteItem={actions.deleteBookmark}/>
			</div>
		)
	}
}

FolderPage.propTypes = {
  actions: React.PropTypes.object.isRequired,
  folders: React.PropTypes.object.isRequired,
  bookmarks: React.PropTypes.object.isRequired
}

const selector = createSelector(
  state => state.bookmarks,
  state => state.folders,
  state => state.app,
  (bookmarks, folders, app) => ({ bookmarks, folders, app })
)

export default connect(selector, bindDispatch)(FolderPage)
