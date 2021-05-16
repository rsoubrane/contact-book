import { useState } from 'react';

// Utils
import moment from 'moment';
import { useSnackbar } from 'notistack';
import { generateRandomUser } from 'utils/generateRandom';

// Redux
import { useSelector } from 'react-redux';
import { useFirestore } from 'react-redux-firebase';
import { firestore } from 'App';

// Form
import { Form, Field } from 'react-final-form';
import { TextField, Checkbox } from 'final-form-material-ui';

// MUI
import {
	Dialog as MUDialog,
	DialogActions,
	DialogTitle,
	Paper,
	Grid,
	Button,
	TextField as MUTextField,
	IconButton,
	Typography,
	useMediaQuery,
	Switch,
	useTheme,
	FormControlLabel
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { DatePicker } from '@material-ui/lab';

// Actions
import * as ContactsActions from 'store/actions/contacts';
import * as UserActions from 'store/actions/user';

// Components
import { CloseIcon } from 'uikit';
import UploadAvatar from 'components/Avatar/Upload';

// ----------------------------------------------------------------------

const DatePickerWrapper = (props) => {
	const {
		input: { name, onChange, value, ...restInput },
		meta,
		...rest
	} = props;

	const showError =
		((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) && meta.touched;

	return (
		<DatePicker
			{...rest}
			name={name}
			onChange={onChange}
			value={value}
			renderInput={(params) => (
				<MUTextField
					required
					fullWidth
					inputProps={restInput}
					{...params}
					error={showError}
					helperText={showError ? 'dd/mm/y - Required' : 'dd/mm/y'}
				/>
			)}
		/>
	);
};

const AvatarWrapper = ({ input }) => {
	return <UploadAvatar currentAvatar={input.value} returnAvatar={input.onChange} />;
};

export default function Dialog({ open, contact = null, close }) {
	const { enqueueSnackbar } = useSnackbar();
	const classes = useStyles();
	const theme = useTheme();
	const firestore2 = useFirestore();
	const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

	const user = useSelector((state) => state.app.user);

	const [preFilled, setPreFilled] = useState(true);

	const handleChangePreFilled = (event) => {
		setPreFilled(event.target.checked);
	};

	const validate = (values) => {
		const errors = {};
		if (!values.firstName) {
			errors.firstName = 'Required';
		}
		if (!values.lastName) {
			errors.lastName = 'Required';
		}
		if (!values.email) {
			errors.email = 'Required';
		}
		if (!values.birthDate) {
			errors.birthDate = 'Required';
		}
		return errors;
	};

	const onSubmit = async (values) => {
		const contactRef = contact
			? firestore.collection('contacts').doc(contact.id)
			: firestore.collection('contacts').doc();

		const newValues = {
			...values,
			id: contactRef.id,
			birthDate: moment(values.birthDate).format('DD-MM-YYYY')
		};

		contactRef
			.set(newValues)
			.then(() => {
				enqueueSnackbar('Document successfully written !', { variant: 'success' });
			})
			.catch((error) => {
				enqueueSnackbar(`Error writing document - ${error}`, { variant: 'error' });
			});

		const userRef = firestore.collection('users').doc(user.id);
		userRef.update({ contacts: firestore2.FieldValue.arrayUnion(contactRef.id) });

		ContactsActions.addContact({ values });
		UserActions.editUser(contactRef.id);
		close();
	};

	const handleClose = () => {
		close();
	};

	return (
		<MUDialog fullScreen={fullScreen} open={open} onClose={handleClose}>
			<DialogTitle disableTypography className={classes.titleContainer}>
				<Typography variant='h6'>{contact ? 'Edit' : 'Add'} Contact</Typography>
				<IconButton
					aria-label='close'
					className={classes.closeButton}
					onClick={handleClose}>
					<CloseIcon />
				</IconButton>
			</DialogTitle>

			<Form
				onSubmit={onSubmit}
				initialValues={
					contact
						? {
								avatar: contact.avatar ? contact.avatar : null,
								firstName: contact.firstName ? contact.firstName : '',
								lastName: contact.lastName ? contact.lastName : '',
								email: contact.email ? contact.email : '',
								phoneNumber: contact.phoneNumber ? contact.phoneNumber : '',
								birthDate: contact.birthDate ? contact.birthDate : '',
								companyName: contact.companyName ? contact.companyName : '',
								schoolName: contact.schoolName ? contact.schoolName : '',
								notes: contact.notes ? contact.notes : '',
								isVisibleByEveryone: contact.isVisibleByEveryone
									? contact.isVisibleByEveryone
									: ''
						  }
						: preFilled && generateRandomUser()
				}
				validate={validate}
				render={({ form, handleSubmit, submitting, pristine }) => (
					<form onSubmit={handleSubmit} noValidate>
						<Paper sx={{ py: 5, px: 3 }}>
							<Field
								fullWidth
								name='avatar'
								component={AvatarWrapper}
								label='Avatar'
							/>

							<Grid
								container
								alignItems='flex-start'
								spacing={3}
								sx={{ marginTop: 3 }}>
								<Grid item xs={6}>
									<Field
										fullWidth
										required
										name='firstName'
										component={TextField}
										type='text'
										label='First Name'
									/>
								</Grid>
								<Grid item xs={6}>
									<Field
										fullWidth
										required
										name='lastName'
										component={TextField}
										type='text'
										label='Last Name'
									/>
								</Grid>
								<Grid item xs={12}>
									<Field
										name='email'
										fullWidth
										required
										component={TextField}
										type='email'
										label='Email'
									/>
								</Grid>
								<Grid item xs={6}>
									<Field
										name='phoneNumber'
										fullWidth
										component={TextField}
										type='phone'
										label='Phone Number'
									/>
								</Grid>

								<Grid item xs={6}>
									<Field
										name='birthDate'
										component={DatePickerWrapper}
										fullWidth
										required
										label='Birth Date'
									/>
								</Grid>
								<Grid item xs={6}>
									<Field
										name='schoolName'
										fullWidth
										component={TextField}
										type='text'
										label='School Name'
									/>
								</Grid>
								<Grid item xs={6}>
									<Field
										name='companyName'
										fullWidth
										component={TextField}
										type='text'
										label='Company Name'
									/>
								</Grid>

								<Grid item xs={12}>
									<FormControlLabel
										label='Visible by everyone'
										control={
											<Field
												name='isVisibleByEveryone'
												component={Checkbox}
												type='checkbox'
											/>
										}
									/>
								</Grid>

								<Grid item xs={12}>
									<Field
										fullWidth
										name='notes'
										component={TextField}
										multiline
										label='Notes'
									/>
								</Grid>
							</Grid>
						</Paper>

						<DialogActions>
							<FormControlLabel
								value='start'
								sx={{ width: '50%', justifyContent: 'inherit' }}
								control={
									<Switch
										color='primary'
										checked={preFilled}
										onChange={handleChangePreFilled}
									/>
								}
								label='Pre-filled'
								labelPlacement='start'
							/>

							<Grid
								container
								direction='row'
								justifyContent='space-around'
								className={classes.actionsContainer}>
								<Button
									type='button'
									color='inherit'
									disabled={submitting || pristine}
									onClick={form.reset}>
									Reset
								</Button>
								<Button
									sx={{ ml: 2 }}
									type='submit'
									variant='contained'
									disabled={submitting}>
									{!contact ? 'Add' : 'Edit'}
								</Button>
							</Grid>
						</DialogActions>
					</form>
				)}
			/>
		</MUDialog>
	);
}

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
	titleContainer: {
		margin: 0,
		padding: theme.spacing(2)
	},
	closeButton: { position: 'absolute', right: theme.spacing(1), top: theme.spacing(1) },
	actionsContainer: {
		height: 50,
		display: 'flex',
		justifyContent: 'flex-end',
		marginRight: theme.spacing(3),
		alignItems: 'center'
	}
}));
