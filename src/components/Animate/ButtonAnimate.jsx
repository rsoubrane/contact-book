// Utils
import clsx from 'clsx';
import { motion } from 'framer-motion';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

// ----------------------------------------------------------------------

function ButtonAnimate({ children, className, ...other }) {
	const classes = useStyles();

	return (
		<Box
			component={motion.div}
			whileTap='tap'
			whileHover='hover'
			className={clsx(classes.root, className)}
			{...other}>
			{children}
		</Box>
	);
}

export default ButtonAnimate;

// ----------------------------------------------------------------------

const useStyles = makeStyles({
	root: {
		display: 'inline-flex'
	}
});
