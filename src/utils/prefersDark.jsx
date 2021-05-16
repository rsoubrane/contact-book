// MUI
import { useMediaQuery } from '@material-ui/core';

// ----------------------------------------------------------------------

export default function prefersDarkMode() {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	return useMediaQuery('(prefers-color-scheme: dark)');
}
