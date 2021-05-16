// Utils
import HashLoader from 'react-spinners/HashLoader';

// Redux
import { useSelector } from 'react-redux';

// MUI
import { makeStyles } from '@material-ui/core/styles';

// ----------------------------------------------------------------------

export default function Spinner({ isVisible, children }) {
	const classes = useStyles();

	const isDarkMode = useSelector((state) => state.app.theme);

	return isVisible ? (
		<div className={classes.spinner}>
			<HashLoader color={isDarkMode ? 'white' : 'black'} loading size={150} />
		</div>
	) : (
		children
	);
}

// ----------------------------------------------------------------------

const useStyles = makeStyles(() => ({
	spinner: {
		textAlign: 'center'
	},
	spinner_img: {
		display: 'inline',
		height: 450
	}
}));
