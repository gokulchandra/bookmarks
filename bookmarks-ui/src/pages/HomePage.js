import React from 'react'
import {createSelector} from 'reselect'
import {connect} from 'react-redux'
import {bindDispatch} from 'common/util/redux'

import ListView from 'views/list-items-view'
import CreateBookmark from 'views/bookmarks-view/create-bookmark'
import CreateFolder from 'views/folders-view/create-folder'
import {Tab,Tabs} from 'react-bootstrap'

import 'app/css/app.css'

const FOLDER = 'folder'

export default class HomePage extends React.Component {
	componentWillMount() {
		this.props.actions.loadBookmarks()
		this.props.actions.loadFolders()
	}
	render() {
		let {bookmarks, folders, actions} = this.props
		return (
			<div className='clearfix p3'>
			  <Tabs defaultActiveKey={1}>
			    <Tab eventKey={1} title="Bookmarks">
					  <CreateBookmark 
					  	bookmark={bookmarks.newBookmark} 
					  	updateBookmark={actions.updateBookmark} 
					  	submit={actions.createBookmark} />
					  <div className='h1 col col-12'>Bookmarks</div>
			    	<div className='h2 col col-12'>
				    	<div className=' col col-2'>Title</div>
				    	<div className=' col col-4'>Url</div>
				    	<div className=' col col-3'>Folder</div>
			    	</div>						  
						<ListView 
							items={bookmarks.list} 
							folders={folders} 
							updateFolder={actions.assignBookmarkToFolder}  
							deleteItem={actions.deleteBookmark}/>
			    </Tab>
			    <Tab eventKey={2} title="Folders">
			    	<CreateFolder 
			    		folder={folders.newFolder} 
			    		updateFolder={actions.updateFolder} 
			    		submit={actions.createFolder} />
			    	<div className='h1 col col-12'>Folders</div>	
						<div className='h2 col col-12'>
			    		<div className=' col col-5'>Name<span className='h3 pl1 lighter'>(Click on folder to see contents)</span></div>
			    	</div>
			    	<ListView 
				    	items={folders.list} 
				    	type={FOLDER} 
				    	deleteItem={actions.deleteFolder}
				    	selectFolder={actions.selectFolder}/>
			    </Tab>
			  </Tabs>
			</div>
		)
	}
}

HomePage.propTypes = {
  actions: React.PropTypes.object.isRequired
}

const selector = createSelector(
  state => state.bookmarks,
  state => state.folders,
  state => state.app,
  (bookmarks, folders, app) => ({ bookmarks, folders, app })
)

export default connect(selector, bindDispatch)(HomePage)
