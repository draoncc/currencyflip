import { Component } from 'inferno'

export default class LinearProgress extends Component {
  render () {
    const { indeterminate, reversed, closed } = this.props

    return (
      <div
        role='progressbar'
        className={`mdc-linear-progress
        ${indeterminate && 'mdc-linear-progress--indeterminate'}
        ${reversed && 'mdc-linear-progress--reversed'}
        ${closed && 'mdc-linear-progress--closed'}`}
      >
        <div className='mdc-linear-progress__buffering-dots' />
        <div className='mdc-linear-progress__buffer' />
        <div className='mdc-linear-progress__bar mdc-linear-progress__primary-bar'>
          <span className='mdc-linear-progress__bar-inner' />
        </div>
        <div className='mdc-linear-progress__bar mdc-linear-progress__secondary-bar'>
          <span className='mdc-linear-progress__bar-inner' />
        </div>
      </div>
    )
  }
}
