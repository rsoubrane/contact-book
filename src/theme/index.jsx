import { useEffect, useMemo } from 'react';

// Redux
import { useSelector } from 'react-redux';

// MUI
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { CssBaseline, StyledEngineProvider } from '@material-ui/core';

// Utils
import prefersDarkMode from '../utils/prefersDark';

// Styles
import palette from './palette';
import shadows from './shadows';
import GlobalStyles from './globalStyles';
import typography from './typography';
import shape from './shape';
import breakpoints from './breakpoints';
import ComponentsOverrides from './overrides';

// ----------------------------------------------------------------------

function ThemeConfig({ children }) {
	const isDarkMode = useSelector((state) =>
		typeof state.app.theme !== 'undefined' ? state.app.theme : prefersDarkMode
	);

	const themeOptions = useMemo(() => {
		return {
			palette: palette[!isDarkMode ? 'light' : 'dark'],
			shadows: shadows[!isDarkMode ? 'light' : 'dark'],
			typography,
			shape,
			breakpoints,

			components: ComponentsOverrides({
				theme: {
					palette: palette[!isDarkMode ? 'light' : 'dark'],
					shadows: shadows[!isDarkMode ? 'light' : 'dark'],
					typography,
					shape
				}
			})
		};
	}, [isDarkMode]);

	useEffect(() => {
		if (isDarkMode) themeOptions.palette['mode'] = 'dark';
		localStorage.setItem('darkMode', isDarkMode ? true : false);
	}, [isDarkMode, themeOptions.palette]);

	const theme = useMemo(() => createTheme(themeOptions), [themeOptions]);

	return (
		<ThemeProvider theme={theme}>
			<StyledEngineProvider injectFirst>
				<CssBaseline />
				<GlobalStyles />
				{children}
			</StyledEngineProvider>
		</ThemeProvider>
	);
}

export default ThemeConfig;
