// MUI
import { Box, Container } from '@material-ui/core';

// ----------------------------------------------------------------------

const Wrapper = ({ children, maxWidth = 'md', marginTop = 3, marginBottom = 5 }) => {
	return (
		<Container maxWidth={maxWidth}>
			<Box mt={marginTop} mb={marginBottom}>
				{children}
			</Box>
		</Container>
	);
};

export default Wrapper;
