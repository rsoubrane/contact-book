import { forwardRef } from 'react';

// Utils
import { Helmet } from 'react-helmet-async';

// MUI
import { Box } from '@material-ui/core';

// ----------------------------------------------------------------------

const Page = forwardRef(({ children, title = '', ...other }, ref) => {
	return (
		<Box ref={ref} {...other}>
			<Helmet>
				<title>{title}</title>
			</Helmet>
			{children}
		</Box>
	);
});

export default Page;
