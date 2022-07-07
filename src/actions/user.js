import {
  SAVE_EMAIL,
} from './actionTypes';

const saveEmail = (email) => ({
  type: SAVE_EMAIL,
  payload: email,
});

export default saveEmail;
