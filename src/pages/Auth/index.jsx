// MUI
import { Avatar, Button, Link, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

// Router
import { useHistory } from 'react-router';

// Redux
import { useSelector } from 'react-redux';
import { useFirebase, isLoaded, isEmpty, useFirestoreConnect } from 'react-redux-firebase';

// Firebase
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

// Components
import Page from 'components/Layout/Page';
import Wrapper from 'components/Layout/Wrapper';

// ----------------------------------------------------------------------

function LoginPage() {
	const classes = useStyles();
	const history = useHistory();
	const firebase = useFirebase();
	const auth = useSelector((state) => state.firebase.auth);

	useFirestoreConnect([{ collection: 'users' }]);
	const profile = useSelector((state) => state.firebase.profile);

	function updateUserProfile() {
		const role = profile.role === 'admin' ? 'user' : 'admin';
		return firebase.updateProfile({ role });
	}

	function signUserOut() {
		firebase.auth().signOut();
		window.location.reload();
	}

	return (
		<Page title='Auth' className={classes.paper}>
			<div>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
					Connect
				</Typography>
			</div>

			<Wrapper className={classes.form}>
				<StyledFirebaseAuth
					uiConfig={{
						signInFlow: 'popup',
						signInSuccessUrl: '/',
						signInOptions: [
							{
								provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
								requireDisplayName: true
							},
							{
								provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
								requireDisplayName: true
							}
						],
						callbacks: {
							signInSuccessWithAuthResult: (authResult) => {
								firebase.handleRedirectResult(authResult).then(() => {
									history.push('/');
								});
								return false;
							}
						}
					}}
					firebaseAuth={firebase.auth()}
				/>
			</Wrapper>

			<Button
				component={Link}
				href='/'
				color='secondary'
				variant='text'
				className={classes.redirect}>
				Don`&#39;`t want an account? Open App
			</Button>

			<div>
				{!isLoaded(auth) ? (
					<span>Loading...</span>
				) : isEmpty(auth) ? (
					<span>Not Authed</span>
				) : (
					<>
						<p>
							Welcome {firebase.auth().currentUser.displayName}! You are an{' '}
							{profile.role} !
						</p>

						<Button onClick={updateUserProfile}>Change user role</Button>

						<Button variant='outlined' onClick={() => signUserOut()}>
							Sign-out
						</Button>
					</>
				)}
			</div>
		</Page>
	);
}

export default LoginPage;

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
	paper: {
		display: 'flex',
		flexDirection: 'column',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center'
	},
	avatar: {
		margin: theme.spacing(2),
		backgroundColor: theme.palette.secondary.main
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1)
	},
	redirect: {
		fontSize: 12,
		margin: theme.spacing(0, 0, 2),
		color: theme.palette.secondary
	}
}));
