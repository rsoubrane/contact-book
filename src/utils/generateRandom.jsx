// Utils
import moment from 'moment';
import faker from 'faker';
import _ from 'lodash';

faker.locale = 'fr';

// ----------------------------------------------------------------------

export const generateRandomDate = (start, end) => {
	return moment(
		new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
	).format('DD-MM-YYYY');
};

export const generateRandomUser = () => {
	const avatar = { id: faker.datatype.uuid(), url: faker.image.avatar() };
	const firstName = faker.name.firstName();
	const lastName = faker.name.lastName();

	const emailExtensions = [
		'gmail.fr',
		'gmail.com',
		'yahoo.fr',
		'yahoo.com',
		'hotmail.fr',
		'hotmail.com',
		'icloud.com'
	];

	return {
		avatar: avatar,
		firstName: firstName,
		lastName: lastName,
		email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${_.sample(emailExtensions)}`,
		phoneNumber: faker.phone.phoneNumberFormat(),
		birthDate: faker.date.between('01-01-1990', '12-31-2010'),
		companyName: faker.company.companyName(),
		schoolName: faker.company.companyName(),
		notes: faker.lorem.sentence(),
		isVisibleByEveryone: true
	};
};
