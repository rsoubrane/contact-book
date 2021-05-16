// Utils
import _, { filter } from 'lodash';

// Redux
import { useSelector } from 'react-redux';

// Actions
import useActions from 'store/useActions';
import * as GlobalActions from 'store/actions/global';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import { Box, OutlinedInput, InputAdornment, Button, Grid } from '@material-ui/core';

// Icons
import { Icon } from '@iconify/react';
import { Public } from '@material-ui/icons';
import searchFill from '@iconify-icons/eva/search-fill';

// Components
import MFab from 'components/Material/MFab';

// Hooks & Utils
import { getFullName } from 'utils/formatName';
import ContactCard from './ContactCard';
import SearchError from './SearchError';

// ----------------------------------------------------------------------

function applyFilter(array, query) {
	let newArray = array;
	if (query) {
		newArray = filter(newArray, (_contact) => {
			const fullName = getFullName(_contact.firstName, _contact.lastName);
			return fullName.toLowerCase().indexOf(query.toLowerCase()) !== -1;
		});
	}
	return newArray;
}

function ContactList({
	shouldLogin,
	addContact,
	editContact,
	detailsContact,
	deleteContact,
	findContacts,
	onFindContacts,
	isMobile
}) {
	const classes = useStyles();

	const globalActions = useActions(GlobalActions);

	const displayGlobal = useSelector((state) => state.app.global);
	const user = useSelector((state) => state.app.user);
	const contacts = useSelector((state) => state.app.contacts);

	const contactFiltered = _.orderBy(
		applyFilter(contacts, findContacts),
		['lastName', 'firstName'],
		'asc'
	);
	const isEmpty = !contacts || contacts.length === 0;
	const isNotFound = contactFiltered.length === 0;

	return (
		<div className={classes.root}>
			<div className={classes.header}>
				<Box
					className={classes.headerTitle}
					component={!isMobile ? 'h4' : 'h5'}
					sx={{
						typography: !isMobile ? 'h4' : 'h5'
					}}>
					{displayGlobal ? 'All' : 'Your'} Contacts
					{isMobile ? `(${contacts.length})` : ''}
				</Box>

				<Button
					className={classes.addBtn}
					variant='contained'
					color='secondary'
					onClick={() => (user ? addContact() : shouldLogin())}>
					Add Contact
				</Button>
			</div>

			<div className={classes.searchRow}>
				{!isEmpty && (
					<OutlinedInput
						value={findContacts}
						onChange={onFindContacts}
						placeholder='Find contact(s) ...'
						startAdornment={
							<InputAdornment position='start'>
								<Box
									component={Icon}
									icon={searchFill}
									sx={{ color: 'text.disabled' }}
								/>
							</InputAdornment>
						}
						className={classes.search}
					/>
				)}

				<MFab
					variant='extended'
					color={displayGlobal ? 'success' : 'error'}
					sx={{
						marginLeft: !isEmpty && 4
					}}
					onClick={() =>
						globalActions.setDisplayGlobal(displayGlobal === true ? false : true)
					}>
					<Public style={{ marginRight: 8 }} />
					Display Global Contacts
				</MFab>
			</div>

			<Grid container spacing={3}>
				{contactFiltered.map((contact) => (
					<Grid key={contact.id} item xs={12} md={6} lg={4}>
						<ContactCard
							contact={contact}
							editContact={editContact}
							detailsContact={detailsContact}
							deleteContact={deleteContact}
							isMobile={isMobile}
						/>
					</Grid>
				))}
			</Grid>

			{(isEmpty || isNotFound) && (
				<Box sx={{ mt: !isMobile ? 20 : 5 }}>
					{isEmpty && !user ? (
						<SearchError
							title='Empty List'
							text="You don't have any contact yet. Connect to add a new contact or click to display global contacts."
						/>
					) : isEmpty ? (
						<SearchError
							title='Empty List'
							text="You don't have any contact yet. Try adding a new contact."
						/>
					) : (
						isNotFound && (
							<SearchError
								title='Not found'
								text={`No results found for "${findContacts}". Try checking for typos or using complete name.`}
							/>
						)
					)}
				</Box>
			)}
		</div>
	);
}

export default ContactList;

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
	header: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	headerTitle: {
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(4),
		[theme.breakpoints.down('md')]: {
			margin: theme.spacing(1),
			marginTop: theme.spacing(0),
			marginBottom: theme.spacing(5)
		}
	},
	addBtn: {
		[theme.breakpoints.down('md')]: {
			marginBottom: theme.spacing(5)
		}
	},
	searchRow: {
		display: 'flex',
		alignItems: 'center',
		marginBottom: theme.spacing(5)
	},
	search: {
		width: 240,
		transition: theme.transitions.create(['box-shadow', 'width'], {
			easing: theme.transitions.easing.easeInOut,
			duration: theme.transitions.duration.shorter
		}),
		'&.Mui-focused': { width: 320, boxShadow: theme.shadows[25] },
		'& fieldset': {
			borderWidth: `1px !important`,
			borderColor: `${theme.palette.grey[500_32]} !important`
		}
	}
}));
