import { Suspense } from 'react';

// Helmet
import { HelmetProvider } from 'react-helmet-async';

// Firebase
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

// Router
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

// Redux
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';

// Localization
import frLocale from 'date-fns/locale/fr';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import configureStore from './utils/configureStore';
import routes, { RenderRoutes } from './routes';

// Notifications
import NotistackProvider from './components/Notification/NotistackProvider';

// Components
import { LoadingLayout } from './layouts';
import ThemeConfig from './theme';

const fbConfig = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_DATABASE_URL,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_ID,
	measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

// react-redux-firebase config
const rrfConfig = {
	userProfile: 'users',
	profileParamsToPopulate: ['role:roles', 'contacts:contacts'],
	useFirestoreForProfile: true,
	profileFactory: (user) => {
		const profile = {
			id: user.uid || user.providerData[0].uid,
			avatarUrl: user.photoURL || user.providerData[0].photoURL,
			displayName: user.displayName || user.providerData[0].displayName,
			email: user.email || user.providerData[0].email,
			role: 'user'
		};
		if (user.providerData && user.providerData.length) {
			profile.providerData = user.providerData;
		}
		return profile;
	}
};

// Initialize firebase instance
if (!firebase.apps.length) {
	firebase.initializeApp(fbConfig);
	firebase.firestore();
	firebase.storage();
}
export const firestore = firebase.firestore();
export const storage = firebase.storage();

const { persistor, store } = configureStore();

const rrfProps = {
	firebase,
	config: rrfConfig,
	dispatch: store.dispatch,
	createFirestoreInstance
};

function App() {
	const history = createBrowserHistory();

	return (
		<HelmetProvider>
			<Suspense fallback={<LoadingLayout />}>
				<Provider store={store}>
					<ReactReduxFirebaseProvider {...rrfProps}>
						<PersistGate loading={<LoadingLayout />} persistor={persistor}>
							<ThemeConfig>
								<Router history={history}>
									<NotistackProvider>
										<LocalizationProvider
											dateAdapter={AdapterDateFns}
											locale={frLocale}>
											<RenderRoutes routes={routes} />
										</LocalizationProvider>
									</NotistackProvider>
								</Router>
							</ThemeConfig>
						</PersistGate>
					</ReactReduxFirebaseProvider>
				</Provider>
			</Suspense>
		</HelmetProvider>
	);
}

export default App;
