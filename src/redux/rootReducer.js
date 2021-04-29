import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './slices/user';
import authJwtReducer from './slices/authJwt';
import settingsReducer from './slices/settings';
import notificationsReducer from './slices/notifications';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage: storage,
  keyPrefix: 'redux-',
  whitelist: ['settings']
};


const authPersistConfig = {
  key: 'authJwt',
  storage: storage,
  keyPrefix: 'redux-',
  whitelist: ['isAuthenticated']
};

const rootReducer = combineReducers({
  user: userReducer,
  settings: settingsReducer,
  notifications: notificationsReducer,
  authJwt: persistReducer(authPersistConfig, authJwtReducer)
});

export { rootPersistConfig, rootReducer };
