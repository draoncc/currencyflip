import { Component } from 'inferno'
import { connect } from 'inferno-redux'
import { MDCTextField } from '@material/textfield'
import { MDCTextFieldIcon } from '@material/textfield/icon'

import './Inputs.css'

import { updateMultiplier, updateMargin, updateFilter } from './actions'

class Inputs extends Component {
  render () {
    const {
      margin,
      multiplier,
      filter
    } = this.props

    const inputMargin = (e) => {
      e.preventDefault()
      this.context.store.dispatch(updateMargin(Number(e.target.value)))
    }

    const inputMultiplier = (e) => {
      e.preventDefault()
      this.context.store.dispatch(updateMultiplier(Number(e.target.value)))
    }

    const inputFilter = (e) => {
      e.preventDefault()
      this.context.store.dispatch(updateFilter(e.target.value))
    }

    const initTextField = (e) => {
      MDCTextField.attachTo(e)
    }

    const initTextFieldIcon = (e) => {
      MDCTextFieldIcon.attachTo(e)
    }

    return (
      <div className='app-input-list'>
        <div
          className='app-input
          mdc-text-field
          mdc-text-field--with-trailing-icon'
          ref={initTextField}
        >
          <input
            type='number'
            id='margin'
            className='mdc-text-field__input'
            defaultValue={margin}
            onInput={inputMargin}
          />
          <label className='mdc-floating-label' for='margin'>Margin</label>
          <span
            className='mdc-text-field__icon'
            tabindex='-1'
            role='button'
            ref={initTextFieldIcon}
          >%</span>
          <div className='mdc-line-ripple' />
        </div>

        <div
          className='app-input
          mdc-text-field
          mdc-text-field--with-trailing-icon'
          ref={initTextField}
        >
          <input
            type='text'
            id='multiplier'
            className='mdc-text-field__input'
            defaultValue={multiplier}
            onInput={inputMultiplier}
          />
          <label className='mdc-floating-label' for='multiplier'>Multiplier</label>
          <div className='mdc-line-ripple' />
        </div>

        <div
          className='app-input
          mdc-text-field
          mdc-text-field--with-trailing-icon'
          ref={initTextField}
        >
          <input
            type='text'
            id='filter'
            className='mdc-text-field__input'
            defaultValue={filter}
            onInput={inputFilter}
          />
          <label className='mdc-floating-label' for='filter'>Filter</label>
          <span
            className='mdc-text-field__icon material-icons'
            tabindex='-1'
            role='button'
            ref={initTextFieldIcon}
          >filter_list</span>
          <div className='mdc-line-ripple' />
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  const {
    margin,
    multiplier,
    filter
  } = state

  return {
    margin,
    multiplier,
    filter
  }
}

export default connect(mapStateToProps)(Inputs)
