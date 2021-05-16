// Utils
import clsx from 'clsx';

// Redux
import { useSelector } from 'react-redux';

// MUI
import { makeStyles } from '@material-ui/core/styles';
import { Box, Card, Avatar, Typography, SpeedDial, SpeedDialAction } from '@material-ui/core';

// Icons
import { Icon } from '@iconify/react';
import calendarFill from '@iconify-icons/eva/calendar-fill';
import emailFill from '@iconify-icons/eva/email-fill';
import phoneFill from '@iconify-icons/eva/phone-call-fill';
import briefcaseFill from '@iconify-icons/eva/briefcase-fill';
import moreHorizontalFill from '@iconify-icons/eva/more-horizontal-fill';
import expandFill from '@iconify-icons/eva/expand-fill';
import editFill from '@iconify-icons/eva/edit-2-fill';
import deleteFill from '@iconify-icons/eva/person-delete-fill';

// Hooks & Utils
import { getFullName, getInitials } from 'utils/formatName';

// ----------------------------------------------------------------------

export default function ContactCard({
	contact,
	editContact,
	detailsContact,
	deleteContact,
	isMobile
}) {
	const classes = useStyles();
	const user = useSelector((state) => state.app.user);

	const { firstName, lastName, birthDate, avatar, email, phoneNumber, companyName } = contact;

	const fullName = getFullName(firstName, lastName);
	const initials = getInitials(firstName, lastName);

	const ACTIONS = [
		{
			display: true,
			action: detailsContact,
			name: 'See all',
			icon: <Icon icon={expandFill} width={18} height={18} color='#74CAFF' />
		},
		{
			display: user,
			action: editContact,
			name: 'Edit',
			icon: <Icon icon={editFill} width={18} height={18} color='#DFE3E8' />
		},
		{
			display: user,
			action: deleteContact,
			name: 'Delete',
			icon: <Icon icon={deleteFill} width={18} height={18} color='#D11A2A' />
		}
	];

	return (
		<Card className={classes.card}>
			{!isMobile ? (
				avatar ? (
					<Avatar
						alt={fullName}
						src={avatar.url}
						onClick={() => detailsContact(contact)}
						className={clsx(classes.avatar, classes.pointer)}
					/>
				) : (
					<Avatar
						alt={fullName}
						onClick={() => detailsContact(contact)}
						className={clsx(classes.avatar, classes.pointer)}>
						{initials}
					</Avatar>
				)
			) : null}
			<Box sx={{ flexGrow: 1, minWidth: 0, pl: !isMobile ? 4 : 0, pr: !isMobile ? 1 : 0 }}>
				<Typography
					variant='h6'
					noWrap
					onClick={() => detailsContact(contact)}
					className={classes.pointer}>
					{fullName}
				</Typography>

				<Box className={classes.cardField}>
					<Box
						component={Icon}
						icon={phoneFill}
						sx={{ width: 20, height: 20, mr: 1, flexShrink: 0 }}
					/>
					<Typography variant='subtitle1' color='textSecondary' noWrap>
						{phoneNumber}
					</Typography>
				</Box>
				<Box className={classes.cardField}>
					<Box
						component={Icon}
						icon={emailFill}
						sx={{ width: 20, height: 20, mr: 1, flexShrink: 0 }}
					/>
					<Typography variant='subtitle1' color='textSecondary' noWrap>
						{email}
					</Typography>
				</Box>

				{companyName && (
					<Box className={classes.cardField}>
						{companyName && (
							<>
								<Box
									component={Icon}
									icon={briefcaseFill}
									sx={{ width: 20, height: 20, mr: 1, flexShrink: 0 }}
								/>
								<Typography variant='subtitle1' color='textSecondary' noWrap>
									{companyName}
								</Typography>
							</>
						)}
					</Box>
				)}

				<Box className={classes.cardField}>
					<Box
						component={Icon}
						icon={calendarFill}
						sx={{ width: 20, height: 20, mr: 1, flexShrink: 0 }}
					/>
					<Typography variant='subtitle1' color='textSecondary' noWrap>
						{birthDate}
					</Typography>
				</Box>
			</Box>

			<SpeedDial
				direction={isMobile ? 'up' : 'down'}
				ariaLabel='More infos'
				icon={<Icon icon={moreHorizontalFill} />}
				classes={{ fab: classes.speedDial }}
				hidden={!user}
				sx={{ float: 'right' }}>
				{ACTIONS.map((action) => (
					<SpeedDialAction
						key={action.name}
						icon={action.icon}
						tooltipTitle={action.name}
						tooltipPlacement='top'
						classes={{ fab: classes.speedDial }}
						onClick={() => action.action(contact)}
					/>
				))}
			</SpeedDial>
		</Card>
	);
}

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
	card: {
		position: 'relative',
		minHeight: '220px',
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(3)
	},
	cardField: {
		display: 'flex',
		alignItems: 'center',
		marginTop: theme.spacing(1.25)
	},
	avatar: {
		width: 80,
		height: 80
	},
	speedDial: {
		width: 36,
		height: 36
	},
	pointer: {
		'&:hover': {
			cursor: 'pointer'
		}
	}
}));
