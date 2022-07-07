// Esse reducer será responsável por tratar as informações da pessoa usuária
import {
  SAVE_EMAIL,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_EMAIL:
    return {
      ...state,
      email: action.payload,
    };
  default:
    return state;
  }
};

export default user;
