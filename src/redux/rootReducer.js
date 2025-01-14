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
import requestFundReducer from './slices/requestFund';
import specialOfferReducer from './slices/specialOffer';
import replacementsReducer from './slices/replacements';
import stockUploadReducer from './slices/stockUpload';
import specialOfferUploadReducer from './slices/specialOfferUpload';
import branchesReducer from './slices/branches';
import marketReducer from './slices/market';
import chatReducer from './slices/chat';
import dashboardReducer from './slices/dashboard';
import messagingReducer from './slices/messaging';
import previousOrdersReducer from './slices/previousOrders';

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
  specialOfferUpload: specialOfferUploadReducer,
  branches: branchesReducer,
  market: marketReducer,
  chat: chatReducer,
  dashboard: dashboardReducer,
  messaging: messagingReducer,
  requestFund: requestFundReducer,
  previousOrders:previousOrdersReducer
});

export { rootPersistConfig, rootReducer };
