import { forwardRef } from 'react';

// Utils
import clsx from 'clsx';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import { capitalize } from '@material-ui/core/utils';
import { Fab } from '@material-ui/core';

// Components
import ButtonAnimate from '../Animate/ButtonAnimate';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => {
	const createStyle = (color) => {
		return {
			boxShadow: theme.shadows[25][color],
			color: theme.palette[color].contrastText,
			backgroundColor: theme.palette[color].main,
			'&:hover': {
				backgroundColor: theme.palette[color].dark
			}
		};
	};

	return {
		colorInfo: createStyle('info'),
		colorSuccess: createStyle('success'),
		colorWarning: createStyle('warning'),
		colorError: createStyle('error')
	};
});

// ----------------------------------------------------------------------

const MFab = forwardRef(({ color = 'primary', children, className, ...other }, ref) => {
	const classes = useStyles();

	if (
		color === 'default' ||
		color === 'inherit' ||
		color === 'primary' ||
		color === 'secondary'
	) {
		return (
			<ButtonAnimate>
				<Fab ref={ref} color={color} className={className} {...other}>
					{children}
				</Fab>
			</ButtonAnimate>
		);
	}

	return (
		<ButtonAnimate>
			<Fab
				ref={ref}
				className={clsx(
					{
						[classes[`color${capitalize(color)}`]]: color
					},
					className
				)}
				{...other}>
				{children}
			</Fab>
		</ButtonAnimate>
	);
});

export default MFab;
