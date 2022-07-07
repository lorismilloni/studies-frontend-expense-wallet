import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ExpenseTable extends React.Component {
  render() {
    const {
      wallet: { expenses },
    } = this.props;

    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          { expenses
            .map(({
              id,
              description,
              tag,
              method,
              value,
              currency,
              exchangeRates,
            }) => {
              const exchange = exchangeRates[currency].ask;
              return (
                <tr key={ id }>
                  <td>{ description }</td>
                  <td>{ tag }</td>
                  <td>{ method }</td>
                  <td>{ (+value).toFixed(2) }</td>
                  <td>{ exchangeRates[currency].name }</td>
                  <td>{ (+exchange).toFixed(2) }</td>
                  <td>{ (exchange * +value).toFixed(2) }</td>
                  <td>Real</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  wallet: state.wallet,
});

ExpenseTable.propTypes = {
  wallet: PropTypes.shape({
    expenses: PropTypes.arrayOf(PropTypes.obj),
  }),
}.isRequired;

export default connect(mapStateToProps, null)(ExpenseTable);
