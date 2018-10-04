import { Component, linkEvent } from 'inferno'
import { connect } from 'inferno-redux'

import { addIgnoreList, removeIgnoreList } from './actions'

import './IgnoreList.css'

class IgnoreList extends Component {
  render () {
    const { ignoreList, lines } = this.props
    if (!ignoreList || !lines) return

    const switchIgnore = (name, e) => {
      e.preventDefault();
      (ignoreList.includes(name) &&
        this.context.store.dispatch(removeIgnoreList(name))) ||
        this.context.store.dispatch(addIgnoreList(name))
    }

    return (
      <div className='mdc-chip-set mdc-chip-set--filter'>
        {lines.map(c =>
          <div
            className={`mdc-chip
            ${ignoreList.includes(c.currencyTypeName) && 'mdc-chip--selected'}`}
            onClick={linkEvent(c.currencyTypeName, switchIgnore)}
          >
            <div className='mdc-chip__checkmark' >
              <svg className='mdc-chip__checkmark-svg' viewBox='-2 -3 30 30'>
                <path
                  className='mdc-chip__checkmark-path' fill='none' stroke='black'
                  d='M1.73,12.91 8.1,19.28 22.79,4.59' />
              </svg>
            </div>
            <div className='mdc-chip__text'>{ c.currencyTypeName }</div>
          </div>
        )}
      </div>
    )
  }
}

function mapStateToProps (state) {
  const {
    data,
    ignoreList
  } = state
  const {
    lines
  } = data

  return {
    ignoreList,
    lines
  }
}

export default connect(mapStateToProps)(IgnoreList)
