const user = (state = null, action) => {
	switch (action.type) {
		case 'SET_USER':
			return action.payload;
		case 'EDIT_USER':
			return state.contacts.includes(action.payload)
				? state.contacts.filter((e) => e !== action.payload)
				: state.contacts.push(action.payload);
		case 'LOGOUT_USER':
			return action.payload;
		default:
			return state;
	}
};

export default user;
