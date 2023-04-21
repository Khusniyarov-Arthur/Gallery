import {URL_API, ACCESS_KEY} from '../../api/const';

export const GET_PHOTOS_REQUEST = 'GET_PHOTOS_REQUEST';
export const GET_PHOTOS_SUCCESS = 'GET_PHOTOS_SUCCESS';
export const GET_PHOTOS_ERROR = 'GET_PHOTOS_ERROR';
export const PREV_PAGE = 'PREV_PAGE';
export const LIMIT_MESSAGE = 'LIMIT_MESSAGE';


export const getPhotosRequest = () => ({
  type: GET_PHOTOS_REQUEST,
});

export const getPhotosRequestSuccess = (data) => ({
  type: GET_PHOTOS_SUCCESS,
  data,
});

export const getPhotosRequestError = (error) => ({
  type: GET_PHOTOS_ERROR,
  error,
});

export const prevPage = (page) => ({
  type: PREV_PAGE,
  page,
});

export const limitMessage = (limitMess) => ({
  type: LIMIT_MESSAGE,
  limitMess,
});

export const getPhotosRequestAsing = () => (dispatch, getState) => {
  dispatch(getPhotosRequest());

  let options = {};

  let page = getState().getPhotosReducer.page;
  const dataOld = getState().getPhotosReducer.data;
  const token = getState().tokenReducer.token;

  if (token) {
    options = {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    };
  }

  fetch(`${URL_API}/photos?client_id=${ACCESS_KEY}&per_page=10&page=${page}`, options)
    .then((response) => {
      if (response.status === 403) {
        dispatch(limitMessage('Первышен лимит запросов'));
      } else {
        dispatch(limitMessage(''));
      }
      return response.json();
    })
    .then((data) => {
      const photoData = data.map((item) => (
        {
          id: item.id,
          created: item.created_at,
          liked: item.liked_by_user,
          countLikes: item.likes,
          name: item.user.first_name,
          link: item.user.links.html,
          regular: item.urls.regular,
          small: item.urls.small,
        }
      ));
      page > 1 ?
      dispatch(getPhotosRequestSuccess([...dataOld, ...photoData])) :
      dispatch(getPhotosRequestSuccess(photoData));
      dispatch(prevPage(page += 1));
    })
    .catch(err => {
      dispatch(getPhotosRequestError(err));
    });
};


