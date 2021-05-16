// MUI
import {
	Dialog as MUDialog,
	DialogActions,
	DialogTitle,
	Paper,
	Grid,
	Checkbox,
	IconButton,
	Typography,
	useMediaQuery,
	useTheme,
	FormControlLabel
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Components
import { CloseIcon } from 'uikit';
import CopyClipboard from 'components/CopyClipboard';
import DisplayAvatar from 'components/Avatar/Display';

// ----------------------------------------------------------------------

export default function Dialog({ open, contact = null, close }) {
	const classes = useStyles();
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

	const handleClose = () => {
		close();
	};

	return (
		<MUDialog fullScreen={fullScreen} open={open} onClose={handleClose}>
			<DialogTitle disableTypography className={classes.titleContainer}>
				<Typography variant='h6'>
					Contact card of {contact && contact.firstName} {contact && contact.lastName}
				</Typography>
				<IconButton
					aria-label='close'
					className={classes.closeButton}
					onClick={handleClose}>
					<CloseIcon />
				</IconButton>
			</DialogTitle>

			{contact && (
				<form>
					<Paper sx={{ py: 5, px: 3 }}>
						<DisplayAvatar avatar={contact.avatar && contact.avatar} />

						<Grid container alignItems='flex-start' spacing={3} sx={{ marginTop: 3 }}>
							<Grid item xs={6}>
								<CopyClipboard
									value={contact.firstName ? contact.firstName : ''}
									label='First Name'
								/>
							</Grid>
							<Grid item xs={6}>
								<CopyClipboard
									value={contact.lastName ? contact.lastName : ''}
									label='Last Name'
								/>
							</Grid>
							<Grid item xs={12}>
								<CopyClipboard
									value={contact.email ? contact.email : ''}
									label='Email'
								/>
							</Grid>
							<Grid item xs={6}>
								<CopyClipboard
									value={contact.phoneNumber ? contact.phoneNumber : ''}
									label='Phone Number'
								/>
							</Grid>

							<Grid item xs={6}>
								<CopyClipboard
									value={contact.birthDate ? contact.birthDate : ''}
									label='Birth Date'
								/>
							</Grid>
							<Grid item xs={6}>
								<CopyClipboard
									value={contact.schoolName ? contact.schoolName : ''}
									label='School Name'
								/>
							</Grid>
							<Grid item xs={6}>
								<CopyClipboard
									value={contact.companyName ? contact.companyName : ''}
									label='Company Name'
								/>
							</Grid>

							<Grid item xs={12}>
								<FormControlLabel
									label='Visible by everyone'
									readOnly
									control={
										<Checkbox
											checked={
												contact.isVisibleByEveryone
													? contact.isVisibleByEveryone
													: false
											}
											name='isVisibleByEveryone'
										/>
									}
								/>
							</Grid>

							<Grid item xs={12}>
								<CopyClipboard
									value={contact.notes ? contact.notes : ''}
									label='Notes'
								/>
							</Grid>
						</Grid>
					</Paper>

					<DialogActions>
						<Typography variant='caption'>
							Click on a field to copy its value
						</Typography>
					</DialogActions>
				</form>
			)}
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
