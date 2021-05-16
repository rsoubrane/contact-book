// MUI
import { createStyles, makeStyles } from '@material-ui/styles';
import { AppBar, Button, Toolbar, Typography, IconButton } from '@material-ui/core';

// Router
import { useHistory } from 'react-router';

// Icon
import { ArrowBackIcon } from 'uikit';

// ----------------------------------------------------------------------

export default function MenuAppBar({ title }) {
	const classes = useStyles();
	const history = useHistory();

	return (
		<AppBar position='static' className={classes.appBar}>
			<Toolbar>
				<IconButton
					component={Button}
					onClick={() => history.goBack()}
					color='inherit'
					edge='start'>
					<ArrowBackIcon titleAccess='Navigate Back' />
				</IconButton>

				<Typography variant='h6' className={classes.title}>
					{title}
				</Typography>
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
		}
	})
);
