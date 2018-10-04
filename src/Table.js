import { Component, linkEvent } from 'inferno'
import { connect } from 'inferno-redux'

import { addIgnoreList } from './actions'

class Table extends Component {
  render () {
    const { currency, matrix, multiplier } = this.props

    const ignore = (id, e) => {
      e.preventDefault()
      this.context.store.dispatch(addIgnoreList(id))
    }

    let filterRegExp
    try {
      filterRegExp = new RegExp(this.context.store.getState().filter, 'i')
    } catch (e) {}

    return (
      <div className='app-table__container mdc-data-table'>
        <table className='app-table mdc-data-table__content'>
          <thead className='app-table__header'>
            <th className='app-table__header-cell' />
            {currency.map(a =>
              <th
                className='app-table__header-cell
                mdc-data-table--numeric'
                onClick={linkEvent(a.id, ignore)}
              >
                <img src={a.icon} alt={a.name} />
              </th>
            )}
          </thead>

          <tbody>
            {currency.map((a, i) =>
              (filterRegExp ? a.name.search(filterRegExp) >= 0 : true)
                ? <tr>
                  <th
                    className='app-table__header-cell
                    app-table__header-cell--row'
                    onClick={linkEvent(a.id, ignore)}
                  >
                    <img src={a.icon} alt={a.name} />
                  </th>
                  { matrix
                    .slice(i * currency.length, (i * currency.length) + currency.length)
                    .map(b => <td className='mdc-data-table--numeric'>
                      { b >= 1000
                        ? Math.round(b / 1000) + 'k / ' + multiplier
                        : Math.round(b) + ' / ' + multiplier }
                    </td>) }
                </tr>
                : void 0
            )}
          </tbody>
        </table>
      </div>
    )
  }
}

function mapStateToProps (state) {
  const {
    multiplier
  } = state

  return {
    multiplier
  }
}

export default connect(mapStateToProps)(Table)
