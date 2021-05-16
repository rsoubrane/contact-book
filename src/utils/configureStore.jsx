// Router
import { createBrowserHistory } from 'history';
import * as localforage from 'localforage';

// Redux
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../store';

const persistConfig = {
	key: 'root',
	version: 1,
	storage: localforage,
	blacklist: []
};

const history = createBrowserHistory();

const dev = process.env.NODE_ENV === 'development';

let middleware = dev ? applyMiddleware(thunk) : applyMiddleware(thunk);

if (dev) {
	middleware = composeWithDevTools(middleware);
}

const persistedReducer = persistReducer(persistConfig, rootReducer(history));

export default () => {
	const store = createStore(persistedReducer, {}, middleware);
	const persistor = persistStore(store);
	return { store, persistor };
};

export { history };
