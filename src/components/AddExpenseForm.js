import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies } from '../actions/wallet';
import getCurrenciesFromAPI from '../services/API';

// a implementação das funções desse requisito foi feita com a ajuda da Yasmim Matos

class AddExpenseForm extends React.Component {
  constructor() {
    super();

    this.state = {
      currencies: [],
      expenses: {
        id: 0,
        value: '',
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
      },
    };
  }

  async componentDidMount() {
    const exchangeRates = await getCurrenciesFromAPI();
    const currencies = Object.keys(exchangeRates)
      .filter((currency) => currency !== 'USDT');
    // filtra passando pelas chaves do objeto retornado da getCFA as moedas diferentes de USDT
    this.setState({ currencies });
  }

  handleChange = ({ target: { id, value } }) => {
    this.setState(
      (previousState) => ({
        ...previousState,
        expenses: { ...previousState.expenses, [id]: value },
      }),
    );
  }

  addNewExpense = () => {
    const { expenses } = this.state;
    const { dispatch } = this.props;

    dispatch(fetchCurrencies(expenses));

    this.setState((previousState) => (
      { ...previousState,
        expenses: {
          ...previousState.expenses,
          id: previousState.expenses.id + 1,
          value: 0,
          description: '',
        },
      }
    ));
  }

  render() {
    const paymentMethods = [
      'Dinheiro',
      'Cartão de crédito',
      'Cartão de débito',
    ];

    const expenseCategory = [
      'Alimentação',
      'Lazer',
      'Trabalho',
      'Transporte',
      'Saúde',
    ];

    const {
      currencies,
      expenses: {
        value,
        description,
        currency,
        method,
        tag,
      },
    } = this.state;

    return (
      <section>
        <form>
          <label htmlFor="value">
            Valor
            <input
              type="number"
              id="value"
              value={ value }
              onChange={ this.handleChange }
              data-testid="value-input"
            />
          </label>
          <label htmlFor="description">
            Descrição
            <input
              type="text"
              id="description"
              value={ description }
              onChange={ this.handleChange }
              data-testid="description-input"
            />
          </label>
          <label htmlFor="currency">
            <select
              id="currency"
              value={ currency }
              onChange={ this.handleChange }
              data-testid="currency-input"
            >
              { currencies.map((currencyOption) => (
                <option
                  data-testid={ currencyOption }
                  value={ currencyOption }
                  key={ currencyOption }
                >
                  { currencyOption }
                </option>
              ))}
            </select>
            Moeda
          </label>
          <label htmlFor="method">
            <select
              id="method"
              value={ method }
              onChange={ this.handleChange }
              data-testid="method-input"
            >
              { paymentMethods.map((payment) => (
                <option
                  data-testid={ payment }
                  value={ payment }
                  key={ payment }
                >
                  { payment }
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="tag">
            <select
              id="tag"
              value={ tag }
              onChange={ this.handleChange }
              data-testid="tag-input"
            >
              { expenseCategory.map((category) => (
                <option
                  data-testid={ category }
                  value={ category }
                  key={ category }
                >
                  { category }
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            id="save-expense"
            onClick={ this.addNewExpense }
          >
            Adicionar despesas
          </button>
        </form>
      </section>
    );
  }
}

AddExpenseForm.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

export default connect()(AddExpenseForm);
