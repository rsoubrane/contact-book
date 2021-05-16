import { useState } from 'react';

// Utils
import { useSnackbar } from 'notistack';

// Router
import { useHistory } from 'react-router';

// Redux
import { useSelector } from 'react-redux';
import { useFirestore } from 'react-redux-firebase';
import { firestore } from 'App';

// Actions
import * as ContactsActions from 'store/actions/contacts';
import * as UserActions from 'store/actions/user';

// MUI
import { Container, Grid, useMediaQuery, useTheme } from '@material-ui/core';

// Components
import Page from 'components/Layout/Page';
import routes from 'routes';
import ContactList from './ContactList';
import ContactDialog from './dialogs/Contact';
import DetailsDialog from './dialogs/Details';
import AlertDialog from './dialogs/Alert';
import Welcome from './components/Welcome';
import Number from './components/Number';

// Routes

// ----------------------------------------------------------------------

function HomePage() {
	const { enqueueSnackbar } = useSnackbar();
	const theme = useTheme();
	const history = useHistory();
	const firestore2 = useFirestore();

	const contacts = useSelector((state) => state.app.contacts);
	const user = useSelector((state) => state.app.user);
	const { auth, profile } = useSelector((state) => state.firebase);

	const [findContacts, setFindContacts] = useState('');
	const [openContactDialog, setOpenContactDialog] = useState(false);
	const [openAlertDialog, setOpenAlertDialog] = useState(false);
	const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
	const [selectedContact, setSelectedContact] = useState(null);

	const isMobile = useMediaQuery(theme.breakpoints.down('md'));

	const authUser = {
		displayName: auth.displayName || profile.displayName || 'Guest',
		photoURL: auth.photoURL || profile.photoURL
	};

	const handleFindContacts = (e) => {
		setFindContacts(e.target.value);
	};

	const handleShouldLogin = () => {
		setOpenAlertDialog(true);
	};

	const handleAddContact = () => {
		setOpenContactDialog(true);
		setSelectedContact(null);
	};

	const handleEditContact = (contact) => {
		setOpenContactDialog(true);
		setSelectedContact(contact);
	};

	const handleDetailsContact = (contact) => {
		setOpenDetailsDialog(true);
		setSelectedContact(contact);
	};

	const handleDeleteContact = (contact) => {
		setSelectedContact(contact);

		const contactRef = firestore.collection('contacts').doc(contact.id);

		contactRef
			.delete()
			.then(() => {
				enqueueSnackbar('Contact successfully deleted !', { variant: 'success' });
			})
			.catch((error) => {
				enqueueSnackbar(`Error deleting contact - ${error}`, { variant: 'error' });
			});

		const userRef = firestore.collection('users').doc(user.id);
		userRef.update({ contacts: firestore2.FieldValue.arrayRemove(contactRef.id) });

		ContactsActions.removeContact(contact.id);
		UserActions.editUser(contactRef.id);
	};

	const handleClose = () => {
		setOpenContactDialog(false);
		setOpenDetailsDialog(false);
		setOpenAlertDialog(false);
	};

	return (
		<Page title='Home'>
			<ContactDialog open={openContactDialog} contact={selectedContact} close={handleClose} />
			<DetailsDialog open={openDetailsDialog} contact={selectedContact} close={handleClose} />
			<AlertDialog
				open={openAlertDialog}
				title="Can't add a contact"
				contentText='You must be logged in to add a new contact. Would you like to go to the connection page ?'
				agreeText='Yes'
				agreeAction={() => history.push(routes.login.path)}
				disagreeText='Cancel'
				disagreeAction={handleClose}
				onClose={handleClose}
			/>

			<Container maxWidth='xl'>
				<Grid container spacing={3}>
					{!isMobile && (
						<>
							<Grid item xs={12} md={8}>
								<Welcome displayName={authUser.displayName} />
							</Grid>
							<Grid item xs={12} md={4}>
								<Number />
							</Grid>
						</>
					)}

					<Grid item xs={12}>
						<ContactList
							contacts={contacts}
							shouldLogin={handleShouldLogin}
							addContact={handleAddContact}
							editContact={handleEditContact}
							detailsContact={handleDetailsContact}
							deleteContact={handleDeleteContact}
							findContacts={findContacts}
							onFindContacts={handleFindContacts}
							isMobile={isMobile}
						/>
					</Grid>
				</Grid>
			</Container>
		</Page>
	);
}

export default HomePage;
