// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import {
  GET_CURRENCIES,
  UPDATE_EXPENSES,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CURRENCIES:
    return {
      ...state,
      currencies: [...state.currencies, action.payload],
    };
  case UPDATE_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  default:
    return state;
  }
};

export default wallet;
