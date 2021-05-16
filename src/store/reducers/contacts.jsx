const contacts = (state = [], action) => {
	switch (action.type) {
		case 'SET_CONTACT_LIST':
			return action.payload;
		case 'ADD_CONTACT':
			return [...state, action.payload];
		case 'EDIT_CONTACT':
			return state.map((t) => (t.id === action.payload ? [...t, action.payload] : t));
		case 'REMOVE_CONTACT':
			return state.filter((t) => t.id !== action.payload);

		default:
			return state;
	}
};

export default contacts;
