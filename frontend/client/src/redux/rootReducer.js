import { combineReducers } from 'redux';
import authReducer from './reducers';
import persistConfig from './reduxPersistConfig';
import { persistReducer } from 'redux-persist';

const rootReducer = combineReducers({
    auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;