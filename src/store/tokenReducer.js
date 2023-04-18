import {setToken} from '../api/token';
import {urlAuthToken} from '../api/token';

const initialState = {
  token: '',
};

const UPDATE_TOKEN = 'UPDATE_TOKEN';
const DELETE_TOKEN = 'DELETE_TOKEN';

export const updateToken = token => ({
  type: UPDATE_TOKEN,
  token,
});

export const deleteToken = () => ({
  type: DELETE_TOKEN,
  token: '',
});

export const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_TOKEN:
      return {
        ...state,
        token: action.token,
      };

    case DELETE_TOKEN:
      return {
        ...state,
        token: '',
      };
    default:
      return state;
  }
};

export const tokenRequestAsing = () => (dispatch, getState) => {
  fetch(`${urlAuthToken}`,
    {method: 'POST'}
  )
    .then((response) => {
      return response.json();
    })
    .then(data => {
      dispatch(updateToken(data.access_token));
      setToken(data.access_token);
      location.replace('/');
    })
    .catch(err => {
      console.log(err);
    });
};

