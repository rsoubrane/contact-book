// MUI
import {
	Button,
	Dialog,
	DialogTitle,
	DialogActions,
	DialogContent,
	DialogContentText
} from '@material-ui/core';

// ----------------------------------------------------------------------

function AlertDialog({
	open,
	close,
	title,
	contentText,
	agreeText,
	agreeAction,
	disagreeText,
	disagreeAction
}) {
	const handleClose = () => {
		close();
	};

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>
				<DialogContentText id='alert-dialog-description'>{contentText}</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={disagreeAction}>{disagreeText}</Button>
				<Button onClick={agreeAction} autoFocus>
					{agreeText}
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default AlertDialog;
