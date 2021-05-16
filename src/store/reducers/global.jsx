const global = (state = true, action) => {
	switch (action.type) {
		case 'SET_DISPLAY_GLOBAL':
			return action.payload;
		default:
			return state;
	}
};

export default global;
