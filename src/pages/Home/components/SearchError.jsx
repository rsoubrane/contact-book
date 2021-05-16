// MUI
import { Box, Typography } from '@material-ui/core';

// ----------------------------------------------------------------------

function SearchError({ title, text, className, ...other }) {
	return (
		<Box className={className} {...other}>
			<Typography gutterBottom align='center' variant='h4' color='textPrimary'>
				{title}
			</Typography>
			<Typography variant='subtitle1' align='center'>
				{text}
			</Typography>
		</Box>
	);
}

export default SearchError;
