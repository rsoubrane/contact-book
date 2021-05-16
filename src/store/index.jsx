// Redux
import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

// Reducers
import contacts from './reducers/contacts';
import global from './reducers/global';
import theme from './reducers/theme';
import user from './reducers/user';

const app = combineReducers({
	contacts,
	global,
	theme,
	user
});

export default () =>
	combineReducers({
		app,
		firebase: firebaseReducer,
		firestore: firestoreReducer
	});
