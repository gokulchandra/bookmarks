import _ from 'lodash'
import React from 'react'
import ReactDom from 'react-dom'
import Bookmark from './bookmarks-view/bookmark'
import Folder from './folders-view/folder'

const FOLDER = 'folder'

export default class ListView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {  }
  }

  renderItems() {
    let { items, folders, type, updateFolder, deleteItem, selectFolder } = this.props
    if(type===FOLDER){
      return items.map((item) => {
        return <Folder folder={item} selectFolder={selectFolder} deleteFolder={deleteItem}/>
      })
    } else  {
        return items.map((item) => {
          return ( <Bookmark 
              bookmark={item}
              folders={folders} 
              updateFolder={updateFolder}
              deleteBookmark={deleteItem}/>)
        })
      }
  }

  render() {
    let noItems = (<div>No items to display</div>)
    return (
      <div className='col col-12 mt3'>
       {this.props.items && this.props.items.length > 0 ? this.renderItems() : noItems} 
      </div>
    )
  }
}

ListView.propTypes = {
  theatre: React.PropTypes.array.isRequired,
  items: React.PropTypes.array.isRequired,
  type:React.PropTypes.string.isRequired
}
