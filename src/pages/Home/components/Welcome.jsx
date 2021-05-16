// Utils
import clsx from 'clsx';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import { Box, Card, CardContent } from '@material-ui/core';

// ----------------------------------------------------------------------

function Welcome({ displayName, className, ...other }) {
	const classes = useStyles();

	return (
		<Card className={clsx(classes.root, className)} {...other}>
			<CardContent className={classes.content}>
				<Box component='h4' sx={{ pb: 1, typography: 'h4', color: 'grey.800' }}>
					Welcome back,
					<br /> {!displayName ? '...' : displayName}!
				</Box>
			</CardContent>

			<Box
				component='img'
				alt='welcome'
				src='/static/illustrations/illustration_home.svg'
				sx={{
					p: 2,
					height: 180,
					margin: { xs: 'auto', md: 'inherit' }
				}}
			/>
		</Card>
	);
}

export default Welcome;

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
	root: {
		boxShadow: 'none',
		textAlign: 'center',
		backgroundColor: theme.palette.primary.lighter,
		[theme.breakpoints.up('md')]: {
			display: 'flex',
			textAlign: 'left',
			alignItems: 'center',
			justifyContent: 'space-between'
		},
		[theme.breakpoints.up('xl')]: {
			height: 220
		}
	},
	content: {
		[theme.breakpoints.up('md')]: {
			padding: 0,
			paddingLeft: theme.spacing(5)
		}
	}
}));
