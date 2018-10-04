import { Component } from 'inferno'
import PropTypes from 'prop-types'
import { connect } from 'inferno-redux'

import Table from './Table'
import IgnoreList from './IgnoreList'
import LinearProgress from './LinearProgress'
import Inputs from './Inputs'

import './registerServiceWorker'
import './App.css'

import { fetchCurrency } from './actions'

class App extends Component {
  componentDidMount () {
    this.refresh(this.context.store)
  }

  refresh (store) {
    store.dispatch(fetchCurrency())
  }

  render () {
    const {
      currency,
      matrix,
      lastUpdated,
      isFetching
    } = this.props

    if (lastUpdated === void 0) return (<LinearProgress indeterminate />)

    const refresh = (e) => {
      e.preventDefault()
      this.refresh(this.context.store)
    }

    return (
      <div>
        { isFetching &&
          <LinearProgress indeterminate />}
        <div className='mdc-layout-grid'>
          <div className='mdc-layout-grid__inner'>
            <div
              className='mdc-layout-grid__cell
              mdc-layout-grid__cell--span-8-tablet
              mdc-layout-grid__cell--span-4
              app-top-bar'
            >
              <button
                className='mdc-button mdc-button--raised'
                onClick={refresh}
              >Refresh</button>

              {lastUpdated &&
                <span>
                  {new Date(lastUpdated).toLocaleTimeString()}
                </span>}
            </div>

            <div
              className='mdc-layout-grid__cell
              mdc-layout-grid__cell--span-8'
            >
              <Inputs />
            </div>

            <div className='mdc-layout-grid__cell mdc-layout-grid__cell--span-12'>
              <IgnoreList />
            </div>

            <div
              className='mdc-layout-grid__cell
              mdc-layout-grid__cell--span-12
              app-relative-anchor'
            >
              <Table matrix={matrix} currency={currency} multiplier={100} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

App.propTypes = {
  currency: PropTypes.array
}

function mapStateToProps (state) {
  const {
    lastUpdated,
    isFetching,
    data,
    margin,
    multiplier,
    ignoreList
  } = state
  const {
    lines,
    currencyDetails
  } = data

  const currency = (lines || [])
    .filter(c => ignoreList.includes(c.currencyTypeName))
    .map(c => Object.assign(c, currencyDetails.find(d => d.name === c.currencyTypeName)))

  const matrix = currency.length > 0
    ? Array.from({ length: currency.length * currency.length }).map((_, i) => {
      const x = i - Math.floor(i / currency.length) * currency.length
      const y = Math.floor(i / currency.length)
      const m = 1 + margin / 100
      return currency[x].chaosEquivalent * m * multiplier / currency[y].chaosEquivalent
    })
    : []

  return {
    lastUpdated,
    isFetching,
    currency,
    matrix
  }
}

export default connect(mapStateToProps)(App)
