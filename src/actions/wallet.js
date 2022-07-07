import {
  GET_CURRENCIES,
  UPDATE_EXPENSES,
} from './actionTypes';
import getCurrenciesFromAPI from '../services/API';

export const getCurrencies = (currencies) => ({
  type: GET_CURRENCIES,
  payload: currencies,
});

export const updateExpenses = (expenses) => ({
  type: UPDATE_EXPENSES,
  payload: expenses,
});

export const fetchCurrencies = (data) => async (dispatch) => {
  const exchangeRates = await getCurrenciesFromAPI();
  const currency = { ...data, exchangeRates };
  dispatch(updateExpenses(currency));
};
