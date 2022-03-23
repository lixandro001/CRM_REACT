import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
// slices
import settingsReducer from './slices/settings';
import authReducer from './slices/auth';
import promoterReducer from './slices/promoter';
import supervisorReducer from './slices/supervisor';
// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['settings']
};

const rootReducer = combineReducers({
  settings: settingsReducer,
  auth: authReducer,
  promoter: promoterReducer,
  supervisor: supervisorReducer
});

export { rootPersistConfig, rootReducer };
