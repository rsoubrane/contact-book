export const getFullName = (firstName, lastName) => {
	return `${firstName} ${lastName}`;
};

export const getInitials = (firstName, lastName) => {
	return `${firstName.charAt(0)}${lastName.charAt(0)}`;
};
