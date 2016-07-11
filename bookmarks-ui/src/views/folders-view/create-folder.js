import _ from 'lodash'
import React from 'react'
import ReactDom from 'react-dom'
import Select from 'react-select'
import {Input,Button} from 'react-bootstrap'

export default class CreateFolder extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidUpdate() {
    let {folder} = this.props
    this.refs.name.getInputDOMNode().value = folder ? folder.name : null
  }


  handleChange() {
    let name = this.refs.name.getInputDOMNode().value
    this.props.updateFolder({name})
  }

  render() {
    let {submit} = this.props
    return (
      <div className='col col-6'>
        <div className='h1'>Create Folder</div>
        <Input ref='name' type='text' placeholder='Enter name' onChange={(e)=>this.handleChange(e)} />
        <Button type='submit' onClick={submit}>
          Submit
        </Button>
      </div>
    )
  }
}

CreateFolder.propTypes = {
  submit: React.PropTypes.func.isRequired,
  updateFolder: React.PropTypes.func.isRequired,
}