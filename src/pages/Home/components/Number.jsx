// Utils
import clsx from 'clsx';

// Redux
import { useSelector } from 'react-redux';

// Icons
import { Icon } from '@iconify/react';
import personFill from '@iconify-icons/eva/person-fill';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import { Card, Typography, Box } from '@material-ui/core';

// ----------------------------------------------------------------------

function Number({ className, ...other }) {
	const classes = useStyles();
	const contacts = useSelector((state) => state.app.contacts);

	const TOTAL = contacts ? contacts.length : 0;

	return (
		<Card className={clsx(classes.root, className)} {...other}>
			<Box sx={{ ml: 3, color: 'white' }}>
				<Typography variant='h4'> {TOTAL}</Typography>
				<Box sx={{ typography: 'body1', opacity: 0.72 }}>Contacts</Box>
			</Box>
			<Icon icon={personFill} className={classes.icon} />
		</Card>
	);
}

export default Number;

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => {
	return {
		root: {
			display: 'flex',
			position: 'relative',
			alignItems: 'center',
			height: 180,
			padding: theme.spacing(3),
			backgroundColor: theme.palette.primary.darker
		},
		icon: {
			width: 120,
			height: 120,
			opacity: 0.12,
			position: 'absolute',
			right: theme.spacing(-3),
			color: theme.palette.common.white
		}
	};
});
