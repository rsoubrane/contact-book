import prefersDarkMode from 'utils/prefersDark';

const theme = (state = prefersDarkMode, action) => {
	switch (action.type) {
		case 'SET_THEME':
			return action.payload;
		default:
			return state;
	}
};

export default theme;
