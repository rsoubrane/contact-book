import { useEffect } from 'react';

// Utils
import _ from 'lodash';

// Redux
import { useSelector } from 'react-redux';
import { useFirebase, useFirestoreConnect } from 'react-redux-firebase';

// Store
import useActions from 'store/useActions';
import * as UserActions from 'store/actions/user';
import * as ContactActions from 'store/actions/contacts';

// MUI
import { makeStyles } from '@material-ui/core/styles';

// Components
import AppBar from './AppBar';

// ----------------------------------------------------------------------

function HomeLayout({ children }) {
	const classes = useStyles();
	const firebase = useFirebase();

	const userActions = useActions(UserActions);
	const contactActions = useActions(ContactActions);

	useFirestoreConnect(['users', 'contacts']);
	const profile = firebase.auth().currentUser;
	const users = useSelector((state) => state.firestore.ordered.users);
	const contacts = useSelector((state) => state.firestore.ordered.contacts);
	const displayGlobal = useSelector((state) => state.app.global);

	useEffect(() => {
		let user = '';
		firebase.auth().onAuthStateChanged((profile) => {
			if (profile) {
				if (users) user = getUser(profile);
				if (user) userActions.setUser(user);
			} else {
				// No user is signed in.
				userActions.setUser();
			}
			if (contacts) {
				let userContacts = user ? getContacts(user) : [];
				let globalContacts = getGlobalContacts();

				contactActions.setContactList(
					displayGlobal ? _.union(userContacts, globalContacts) : user && userContacts
				);
			}
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [firebase, profile, users, contacts, displayGlobal]);

	const getUser = (user) => {
		return users.find((el) => el.id === user.uid);
	};

	const getContacts = (user) => {
		return contacts.filter((contact) => user.contacts && user.contacts.includes(contact.id));
	};

	const getGlobalContacts = () => {
		return contacts.filter((contact) => contact.isVisibleByEveryone);
	};

	return (
		<div className={classes.root}>
			<AppBar title='Contact Book' />
			<div className={classes.main}>
				<div className={classes.content}>{children}</div>
			</div>
		</div>
	);
}

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		minHeight: '100%',
		overflow: 'hidden'
	},
	main: {
		flexGrow: 1,
		overflow: 'auto',
		minHeight: '100%',
		paddingTop: APP_BAR_MOBILE + 40,
		paddingBottom: theme.spacing(10),
		[theme.breakpoints.up('lg')]: {
			paddingTop: APP_BAR_DESKTOP + 40,
			paddingLeft: theme.spacing(2),
			paddingRight: theme.spacing(2)
		}
	},
	appFrame: {
		position: 'relative',
		display: 'flex',
		width: '100%',
		height: '100%'
	}
}));

export default HomeLayout;
