import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { createMigrate, persistReducer, persistStore } from 'redux-persist';
import createSensitiveStorage from 'redux-persist-sensitive-storage';
import uuid from 'react-native-uuid';
import { defaultState, rootReducer } from './reducer';
import { messageService } from '../service';

const migrations = {
  0: state => ({
    ...state,
    availableTokens: state.availableTokens.map(token => ({
      ...token,
      id: uuid.v4(),
    })),
  }),
};

const storage = createSensitiveStorage({
  encrypt: true,
  keychainService: 'eltwallet',
  sharedPreferencesName: 'eltwallet',
});

const persistConfig = {
  key: 'eltwallet',
  version: 1,
  storage,
  migrate: createMigrate(migrations, { debug: false }),
};

const middlewares = [messageService];

const store = createStore(
  persistReducer(persistConfig, rootReducer),
  defaultState,
  process.env.NODE_ENV === 'production'
    ? applyMiddleware(...middlewares)
    : applyMiddleware(createLogger(), ...middlewares),
);

const persistor = persistStore(store);

export { persistor, store };
