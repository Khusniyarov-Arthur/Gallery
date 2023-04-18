import {
  GET_PHOTO_REQUEST,
  GET_PHOTO_SUCCESS,
  SET_LIKE_PHOTO_SUCCESS,
  GET_PHOTO_ERROR,
  DEL_PHOTO,
} from './actionGetPhoto';

const initialState = {
  loading: false,
  photo: {},
  error: {},
};

export const getPhotoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PHOTO_REQUEST:
      return {
        ...state,
        loading: true,
        error: {},
      };
    case GET_PHOTO_SUCCESS:
      return {
        ...state,
        loading: false,
        photo: action.photo,
        error: {},
      };
    case SET_LIKE_PHOTO_SUCCESS:
      return {
        ...state,
        loading: false,
        photo: {...state.photo, ...action.photo},
        error: {},
      };
    case GET_PHOTO_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case DEL_PHOTO:
      return {
        ...state,
        photo: {},
      };
    default:
      return state;
  }
};

