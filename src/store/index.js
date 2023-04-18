import {createStore, combineReducers, applyMiddleware} from 'redux';
import {composeWithDevTools} from '@redux-devtools/extension';

import {tokenReducer} from './tokenReducer';
import thunk from 'redux-thunk';
import {getPhotosReducer} from './getPhotos/reducerGetPhotos';
import {getPhotoReducer} from './getPhoto/reducerGetPhoto';
import {authReducer} from './Auth/authReducer';

const rootReducer = combineReducers({
  tokenReducer,
  getPhotosReducer,
  authReducer,
  getPhotoReducer,
});
export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);
