import {
  GET_PHOTOS_REQUEST,
  GET_PHOTOS_SUCCESS,
  GET_PHOTOS_ERROR,
  PREV_PAGE,
  LIMIT_MESSAGE,
} from './actionGetPhotos';

const initialState = {
  loading: false,
  data: [],
  error: {},
  page: 1,
  limitMess: ''
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
    case LIMIT_MESSAGE:
      return {
        ...state,
        limitMess: action.limitMess,
      };
    default:
      return state;
  }
};

