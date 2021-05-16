// Utils
import clsx from 'clsx';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

// ----------------------------------------------------------------------

export default function DisplayAvatar({ avatar }) {
	const classes = useStyles();

	return (
		<Box
			className={clsx(classes.root)}
			sx={{
				mt: 2,
				mb: 5
			}}>
			<div className={classes.dropZone}>
				{avatar && (
					<Box
						component='img'
						alt='avatar'
						src={avatar.url}
						sx={{ zIndex: 8, objectFit: 'cover' }}
					/>
				)}
			</div>
		</Box>
	);
}

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
	root: {
		width: 144,
		height: 144,
		margin: 'auto',
		borderRadius: '50%',
		padding: theme.spacing(1),
		border: `1px dashed ${theme.palette.grey[500_32]}`
	},
	dropZone: {
		zIndex: 0,
		width: '100%',
		height: '100%',
		outline: 'none',
		display: 'flex',
		overflow: 'hidden',
		borderRadius: '50%',
		position: 'relative',
		alignItems: 'center',
		justifyContent: 'center',
		'& > *': { width: '100%', height: '100%' },
		'&:hover': { cursor: 'pointer', '& $placeholder': { zIndex: 9 } }
	}
}));
