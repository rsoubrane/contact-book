export const ThemeActions = {
	SET_THEME: 'SET_THEME'
};

export function setTheme(isDark) {
	return {
		type: ThemeActions.SET_THEME,
		payload: isDark
	};
}
