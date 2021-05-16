// MUI
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline, Paper, Grid } from '@material-ui/core';

// Components
import MenuAppBar from './AppBar';

// ----------------------------------------------------------------------

function AuthLayout({ children }) {
	const classes = useStyles();

	return (
		<Grid container component='main' className={classes.root}>
			<MenuAppBar title='Contact Book' />
			<CssBaseline />
			<Grid item xs={12} className={classes.image}>
				<Paper elevation={6} square className={classes.content}>
					{children}
				</Paper>
			</Grid>
		</Grid>
	);
}

export default AuthLayout;

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100vw',
		height: '100vh',
		zIndex: 1,
		overflow: 'hidden'
	},
	image: {
		backgroundImage: 'url(https://source.unsplash.com/random)',
		backgroundRepeat: 'no-repeat',
		backgroundColor:
			theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
		backgroundSize: 'cover',
		backgroundPosition: 'center'
	},
	content: {
		position: 'absolute',
		width: 700,
		height: 500,
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		backgroundColor: 'rgba(0,0,0,0.78)',
		borderRadius: 30
	}
}));
