import _ from 'lodash'
import React from 'react'
import ReactDom from 'react-dom'
import Select from 'react-select'
import {Button} from 'react-bootstrap'

export default class Bookmark extends React.Component {
  constructor(props) {
    super(props)
    this.state = { option: this.props.bookmark.folder, cache: {} }
  }

  componentWillReceiveProps(newProps) {
    this.setState({ option: newProps.bookmark.folder, cache:{} })
  }

  triggerChange(valueObject) {
    let { option } = valueObject
    let {_id} = this.props.bookmark
    valueObject.option = option
    this.setState({ option: valueObject.value, cache: {} })
    this.props.updateFolder && this.props.updateFolder(_id, valueObject.value)
  }

  getOptions() {
    let  options  = this.props.folders.list
    options =  _.map(options, (option, index) => {
      return {
        option,
        value: option._id,
        label: option.name
      }
    })
    options.push({value:null, label:'None'})
    return options
  }

  render() {
    let {bookmark, deleteBookmark} = this.props
    return (
      <div className='col col-12 pt1'>
        <div className='col col-2'>{bookmark.title}</div>
        <div className='col col-4'><a href={bookmark.url} target='new'>{bookmark.url}</a></div>
        <div className='col col-3'>
          <Select ref='select'
            placeholder={'None'}
            value={this.state.option}
            cache={this.state.cache}
            clearable={false}
            openOnFocus
            options={this.getOptions()}
            onChange={(newValue) => this.triggerChange(newValue)} />
        </div>
        <div className='col col-3 pl3'>
        <Button onClick={() =>deleteBookmark(bookmark['_id'])}>Delete</Button>
        </div>
      </div>
    )
  }
}

Bookmark.propTypes = {
  bookmark: React.PropTypes.object.isRequired,
}
