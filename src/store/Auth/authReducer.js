const initialState = {
  auth: '',
};

const GET_AUTH = 'GET_AUTH';

export const getAuth = auth => ({
  type: GET_AUTH,
  auth,
});

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_AUTH:
      return {
        ...state,
        auth: action.auth,
      };

    default:
      return state;
  }
};

export const authRequestAsing = () => (dispatch, getState) => {
  const token = getState().tokenReducer.token;

  if (!token) return;

  fetch(`https://api.unsplash.com/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }}
  )
    .then((response) => {
      return response.json();
    })
    .then(data => {
      dispatch(getAuth(data.name));
      localStorage.setItem('user', data.name);
    })
    .catch(err => {
      console.log(err);
    });
};
