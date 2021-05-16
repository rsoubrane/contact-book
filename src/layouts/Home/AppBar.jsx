import { useState } from 'react';

// Utils
import { useSnackbar } from 'notistack';

// Firebase
import { useFirebase } from 'react-redux-firebase';

// Router
import routes from 'routes';
import { useHistory } from 'react-router';
import { ExitToAppRounded } from '@material-ui/icons';

// Redux
import { useSelector } from 'react-redux';

// MUI
import { createStyles, makeStyles } from '@material-ui/styles/';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { AppBar, Toolbar, Typography, Menu, MenuItem, IconButton } from '@material-ui/core';

// Actions
import useActions from 'store/useActions';
import * as ThemeActions from 'store/actions/theme';
import * as UserActions from 'store/actions/user';

// Icons
import { MoonIcon, SunIcon } from 'uikit';

// ----------------------------------------------------------------------

export default function MenuAppBar({ title }) {
	const { enqueueSnackbar } = useSnackbar();
	const classes = useStyles();
	const history = useHistory();
	const firebase = useFirebase();

	const themeActions = useActions(ThemeActions);
	const userActions = useActions(UserActions);

	const user = useSelector((state) => state.app.user);
	const isDarkMode = useSelector((state) => state.app.theme);

	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleToggleTheme = () => {
		themeActions.setTheme(!isDarkMode);
	};

	const logoutUser = () => {
		firebase
			.auth()
			.signOut()
			.then(() => {
				firebase.logout();
				userActions.setUser();
				window.location.reload();
			})
			.catch((error) => {
				enqueueSnackbar(`Error logging out - ${error}`, { variant: 'error' });
			});
	};

	return (
		<AppBar position='static' className={classes.appBar}>
			<Toolbar>
				<Typography variant='h6' className={classes.title}>
					{title}
				</Typography>

				<div>
					<IconButton color='inherit' onClick={handleToggleTheme}>
						{isDarkMode ? <SunIcon /> : <MoonIcon />}
					</IconButton>

					<IconButton
						aria-label='account of current user'
						aria-controls='menu-appbar'
						aria-haspopup='true'
						onClick={handleMenu}
						color='inherit'>
						<AccountCircle />
					</IconButton>
					<Menu
						id='menu-appbar'
						anchorEl={anchorEl}
						anchorOrigin={{
							vertical: 'top',
							horizontal: 'right'
						}}
						keepMounted
						transformOrigin={{
							vertical: 'top',
							horizontal: 'right'
						}}
						open={open}
						onClose={handleClose}>
						{user ? (
							<MenuItem onClick={() => logoutUser()}>
								<ExitToAppRounded className={classes.icon} />
								Logout
							</MenuItem>
						) : (
							<MenuItem onClick={() => history.push(routes.login.path)}>
								<ExitToAppRounded className={classes.icon} />
								Login
							</MenuItem>
						)}
					</Menu>
				</div>
			</Toolbar>
		</AppBar>
	);
}

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) =>
	createStyles({
		appBar: {
			zIndex: theme.zIndex.drawer + 1,
			position: 'absolute'
		},
		navIconHide: {
			[theme.breakpoints.up('md')]: {
				display: 'none'
			}
		},
		menuButton: {
			marginRight: theme.spacing(2)
		},
		title: {
			flexGrow: 1
		},
		icon: {
			marginRight: theme.spacing(1)
		}
	})
);
