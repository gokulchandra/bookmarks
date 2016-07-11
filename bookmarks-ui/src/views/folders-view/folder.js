import _ from 'lodash'
import React from 'react'
import ReactDom from 'react-dom'
import Select from 'react-select'
import {Button, Modal} from 'react-bootstrap'

export default class Bookmark extends React.Component {
  constructor(props) {
    super(props)
    this.state = {show: false}
  }

  renderModal() {
    let {folder, deleteFolder} = this.props
    return (
      <div className="static-modal">
        <Modal
          show={this.state.show}>

          <Modal.Body>
            Delete bookmarks in folder?
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={() => { deleteFolder(folder['_id'], false) }}>No</Button>
            <Button bsStyle="primary" onClick={() => { this.setState({show: false}); deleteFolder(folder['_id'], true) }}>Yes</Button>
          </Modal.Footer>

        </Modal>
      </div>
      )
  }

  render() {
    let {folder, deleteFolder, selectFolder} = this.props
    return (
      <div className='col col-12 pt1'>
        <div className='col col-3' style={{cursor:'pointer'}} onClick={() => selectFolder(folder)}>{folder.name}</div>
        <div className='col col-3'>
          <Button onClick={() => this.setState({show:true})}>Delete</Button>
        </div>
        {this.renderModal()}
      </div>
    )
  }
}

Bookmark.propTypes = {
  bookmark: React.PropTypes.object.isRequired,
}
