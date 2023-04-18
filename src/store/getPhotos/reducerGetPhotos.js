import {
  GET_PHOTOS_REQUEST,
  GET_PHOTOS_SUCCESS,
  GET_PHOTOS_ERROR,
  PREV_PAGE,
  NEXT_PAGE,
  CLEAR_PHOTOS
} from './actionGetPhotos';

const initialState = {
  loading: false,
  data: [],
  error: {},
  page: null,
  newPage: 1,
};

export const getPhotosReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PHOTOS_REQUEST:
      return {
        ...state,
        loading: true,
        error: {},
      };
    case GET_PHOTOS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data,
        error: {},
      };
    case CLEAR_PHOTOS:
      return {
        ...state,
        data: [],
      };
    case GET_PHOTOS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case PREV_PAGE:
      return {
        ...state,
        page: action.page,
      };
    case NEXT_PAGE:
      return {
        ...state,
        newPage: action.newPage,
      };
    default:
      return state;
  }
};

