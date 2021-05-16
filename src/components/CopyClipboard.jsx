// Utils
import { useSnackbar } from 'notistack';
import { CopyToClipboard } from 'react-copy-to-clipboard';

// MUIO
import { Tooltip, TextField, IconButton, InputAdornment } from '@material-ui/core';

// Icons
import { Icon } from '@iconify/react';
import copyFill from '@iconify-icons/eva/copy-fill';

// ----------------------------------------------------------------------

function CopyClipboard({ value, label, adornment = '' }) {
	const { enqueueSnackbar } = useSnackbar();
	const onCopy = () => {
		enqueueSnackbar('Copied', { variant: 'success' });
	};

	function displayTitle() {
		switch (adornment) {
			case 'call':
				return 'Call Contact';
			case 'mail':
				return 'Send an Email';
			default:
				return 'Copy Field';
		}
	}

	function displayIcon() {
		switch (adornment) {
			case 'call':
				return copyFill;
			case 'mail':
				return copyFill;
			default:
				return copyFill;
		}
	}

	return (
		<CopyToClipboard text={value} onCopy={onCopy}>
			<TextField
				fullWidth
				value={value}
				label={label}
				InputProps={{
					readOnly: true,
					endAdornment: (
						<InputAdornment position='end'>
							<CopyToClipboard text={value} onCopy={onCopy}>
								<Tooltip title={displayTitle()}>
									<IconButton>
										<Icon icon={displayIcon()} width={24} height={24} />
									</IconButton>
								</Tooltip>
							</CopyToClipboard>
						</InputAdornment>
					)
				}}
			/>
		</CopyToClipboard>
	);
}

export default CopyClipboard;
