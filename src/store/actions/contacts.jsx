export const ContactsActions = {
	SET_CONTACT_LIST: 'SET_CONTACT_LIST',
	ADD_CONTACT: 'ADD_CONTACT',
	EDIT_CONTACT: 'EDIT_CONTACT',
	REMOVE_CONTACT: 'REMOVE_CONTACT'
};

export function setContactList(contacts = null) {
	return {
		type: ContactsActions.SET_CONTACT_LIST,
		payload: contacts
	};
}

export function addContact(contact) {
	return {
		type: ContactsActions.ADD_CONTACT,
		payload: contact
	};
}

export function editContact(contactId) {
	return (dispatch, getState) => {
		dispatch({ type: ContactsActions.EDIT_CONTACT, payload: contactId });
	};
}

export function removeContact(contactId) {
	return {
		type: ContactsActions.DELETE_CONTACT,
		payload: contactId
	};
}
