import {getPhotosRequestSuccess} from '../getPhotos/actionGetPhotos';

import {URL_API, ACCESS_KEY} from '../../api/const';
export const GET_PHOTO_REQUEST = 'GET_PHOTO_REQUEST';
export const GET_PHOTO_SUCCESS = 'GET_PHOTO_SUCCESS';
export const SET_LIKE_PHOTO_SUCCESS = 'SET_LIKE_PHOTO_SUCCESS';
export const GET_PHOTO_ERROR = 'GET_PHOTO_ERROR';
export const DEL_PHOTO = 'DEL_PHOTO';


export const getPhotoRequest = () => ({
  type: GET_PHOTO_REQUEST,
});

export const getPhotoRequestSuccess = (photo) => ({
  type: GET_PHOTO_SUCCESS,
  photo,
});

export const setLike = ({liked, countLikes}) => ({
  type: SET_LIKE_PHOTO_SUCCESS,
  photo: {liked, countLikes},
});

export const delPhoto = (photo) => ({
  type: DEL_PHOTO,
  photo,
});

export const getPhotoRequestError = (error) => ({
  type: GET_PHOTO_ERROR,
  error,
});

export const getPhotoRequestAsing = (id) => (dispatch, getState) => {
  let options = {};
  const token = getState().tokenReducer.token;
  dispatch(getPhotoRequest());

  if (token) {
    options = {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    };
  }

  fetch(`${URL_API}/photos/${id}?client_id=${ACCESS_KEY}`, options)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const {
        created_at: created,
        likes: countLikes,
        liked_by_user: liked,
        urls: {regular},
        user: {name,
          links: {html: link},
        }} = data;

      const photo = {created, countLikes, liked, regular, name, link};
      dispatch(getPhotoRequestSuccess(photo));
    })
    .catch(err => {
      dispatch(getPhotoRequestError(err));
    });
};


export const likedRequestAsing = (id, isliked) => (dispatch, getState) => {
  let method = '';
  const token = getState().tokenReducer.token;
  const photos = getState().getPhotosReducer.data;

  if (!token) return;

  if (!isliked) {
    method = 'POST';
  } else {
    method = 'DELETE';
  }

  fetch(`https://api.unsplash.com//photos/${id}/like`, {
    method: `${method}`,
    headers: {
      Authorization: `Bearer ${token}`,
    }}
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const {
        photo: {
          id,
          likes: countLikes,
          liked_by_user: liked,
        },
      } = data;

      const updatePhotos = photos.map((item) => {
        if (item.id === id) {
          item.countLikes = countLikes;
          item.liked = liked;
        }
        return item;
      });
      const like = {countLikes, liked, id};
      dispatch(setLike(like));
      dispatch(getPhotosRequestSuccess(updatePhotos));
    })
    .catch(err => {
      console.log(err);
    });
};
