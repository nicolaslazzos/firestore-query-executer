import axios from 'axios';
import { setAlert } from './AlertsActions';
import {
  ON_DATA_READING,
  ON_DATA_READ,
  ON_DATA_READ_FAIL
} from './types';

export const onDataRead = ({ pathInputs, whereInputs, extraInputs }) => async dispatch => {
  dispatch({ type: ON_DATA_READING });

  try {
    const res = await axios.post('/api/firestore', { pathInputs, whereInputs, extraInputs });
    dispatch({ type: ON_DATA_READ, payload: res.data });
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) errors.forEach(error => dispatch(setAlert(error.msg, 'error')));

    dispatch({ type: ON_DATA_READ_FAIL, payload: { msg: error.response.statusText, status: error.response.status } });
  }
}