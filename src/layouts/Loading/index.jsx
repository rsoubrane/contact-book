// Utils
import clsx from 'clsx';

// MUI
import { makeStyles } from '@material-ui/core/styles';

// Components
import Spinner from 'components/Spinner';

// ----------------------------------------------------------------------

function Loading({ className, ...other }) {
	const classes = useStyles();

	return (
		<div className={clsx(classes.root, className)} {...other}>
			<Spinner isVisible sx={{ height: 64 }} />
		</div>
	);
}

export default Loading;

// ----------------------------------------------------------------------

const useStyles = makeStyles({
	root: {
		height: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	box: {
		position: 'absolute',
		borderRadius: '25%'
	},
	inner: {
		width: 100,
		height: 100
	},
	outside: {
		width: 120,
		height: 120
	}
});
