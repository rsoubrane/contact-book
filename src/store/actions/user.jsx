export const UserActions = {
	SET_USER: 'SET_USER',
	EDIT_USER: 'EDIT_USER',
	LOGOUT_USER: 'LOGOUT_USER'
};

export function setUser(user = null) {
	return {
		type: UserActions.SET_USER,
		payload: user
	};
}

export function editUser(contactId) {
	return {
		type: UserActions.EDIT_USER,
		payload: contactId
	};
}

export async function logoutUser() {
	return {
		type: UserActions.LOGOUT_USER,
		payload: null
	};
}
