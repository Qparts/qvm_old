import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './slices/user';
import authJwtReducer from './slices/authJwt';
import settingsReducer from './slices/settings';
import notificationsReducer from './slices/notifications';
import catalogReducer from './slices/catalog';
import partSearchReducer from './slices/partSearch';
import quotationsReportReducer from './slices/quotationsReport';
import specialOfferReducer from './slices/specialOffer';
import replacementsReducer from './slices/replacements';
import stockUploadReducer from './slices/stockUpload';
import specialOfferUploadReducer from './slices/specialOfferUpload';

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
  authJwt: persistReducer(authPersistConfig, authJwtReducer),
  catalogs: catalogReducer,
  PartSearch: partSearchReducer,
  quotationsReport: quotationsReportReducer,
  specialOffer: specialOfferReducer,
  replacements: replacementsReducer,
  stockUpload: stockUploadReducer,
  specialOfferUpload: specialOfferUploadReducer

});

export { rootPersistConfig, rootReducer };
