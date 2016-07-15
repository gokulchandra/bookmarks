import _ from 'lodash'
import React from 'react'
import ReactDom from 'react-dom'
import Select from 'react-select'
import {Input,Button} from 'react-bootstrap'

export default class CreateBookmark extends React.Component {
  constructor(props) {
    super(props)
  }

  handleChange() {
    let title = this.refs.title.getInputDOMNode().value
    let url = this.refs.url.getInputDOMNode().value
    this.props.updateBookmark({title, url})
  }

  componentDidUpdate() {
    let {bookmark} = this.props
    this.refs.title.getInputDOMNode().value = bookmark ? bookmark.title : null
    this.refs.url.getInputDOMNode().value = bookmark ? bookmark.url : null
  }

  render() {
    let {submit, bookmark} = this.props
    return (
      <div className='col col-6'>
        <div className='h1'>Create Bookmark</div>
        <Input 
          ref='title' 
          type='text' 
          placeholder='Enter Title' 
          onChange={(e)=>this.handleChange(e)} />
        <Input 
          ref='url' 
          type='text' 
          placeholder='Enter Url'   
          onChange={(e)=>this.handleChange(e)} />
        <Button type='submit' onClick={submit}>
          Submit
        </Button>
      </div>
    )
  }
}

CreateBookmark.propTypes = {
  bookmark: React.PropTypes.object.isRequired,
  updateBookmark: React.PropTypes.func.isRequired,
  submit: React.PropTypes.func.isRequired
}