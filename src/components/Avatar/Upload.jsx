import { useCallback, useState } from 'react';

// Utils
import clsx from 'clsx';
import faker from 'faker';
import { storage } from 'App';
import { useSnackbar } from 'notistack';
import { useDropzone } from 'react-dropzone';
import { fData } from 'utils/formatNumber';

// MUI
import { alpha, makeStyles } from '@material-ui/core/styles';
import { Box, Typography, FormHelperText, CircularProgress, Button } from '@material-ui/core';

// Icons
import { Icon } from '@iconify/react';
import roundAddAPhoto from '@iconify-icons/ic/round-add-a-photo';

// ----------------------------------------------------------------------

const PHOTO_SIZE = 3145728; // bytes
const FILE_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];
const filesPath = 'uploadedFiles/avatars';

// ----------------------------------------------------------------------

export default function UploadAvatar({ currentAvatar, returnAvatar }) {
	const { enqueueSnackbar } = useSnackbar();
	const classes = useStyles();
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(null);

	const [file, setFile] = useState(currentAvatar);
	console.log('file: ', file);

	const onFileGenerate = () => {
		const id = faker.datatype.uuid();
		const name = faker.datatype.string();
		const url = faker.image.avatar();

		setFile({
			id,
			name,
			url
		});
		returnAvatar({ id, url });
	};

	const onFileDelete = () => {
		setFile();
		returnAvatar();
		return storage.refFromURL(file.url).delete();
	};

	const handleDrop = useCallback(
		async (acceptedFiles) => {
			let file = acceptedFiles[0];

			const checkSize = file.size < PHOTO_SIZE;
			const checkType = FILE_FORMATS.includes(file.type);

			if (!checkType) {
				setIsError('type-invalid');
			}

			try {
				if (checkSize && checkType) {
					setIsLoading(true);
					const id = faker.datatype.uuid();
					const uploadTask = storage.ref(`/${filesPath}`).child(id).put(file);

					return uploadTask.on(
						'state_changed',
						(snapshot) => {
							const progress =
								(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
							console.log('Upload is ' + progress + '% done');
						},
						(error) => {
							enqueueSnackbar(`Error uploading file - ${error}`, {
								variant: 'error'
							});
						},
						() => {
							uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
								setFile({
									id: id,
									name: file.name,
									url: downloadURL.toString()
								});
								returnAvatar({ id, url: downloadURL.toString() });
								setIsLoading(false);
								setIsError(null);
							});
						}
					);
				}
			} catch (err) {
				console.error(err);
			}
		},
		[enqueueSnackbar, returnAvatar, setFile]
	);

	const { getRootProps, getInputProps, isDragActive, isDragReject, isDragAccept } = useDropzone({
		onDrop: handleDrop,
		multiple: false,
		disabled: false
	});

	return (
		<>
			<Box
				className={clsx(classes.root)}
				sx={{
					mt: 2,
					mb: 5
				}}>
				<div
					className={clsx(classes.dropZone, {
						[classes.isDragActive]: isDragActive,
						[classes.isDragAccept]: isDragAccept,
						[classes.isDragReject]: isDragReject
					})}
					{...getRootProps()}>
					<input {...getInputProps()} />

					{isLoading && (
						<Box className={classes.loading}>
							<CircularProgress size={32} thickness={2.4} />
						</Box>
					)}

					{file && (
						<Box
							component='img'
							alt='avatar'
							src={file.url}
							sx={{ zIndex: 8, objectFit: 'cover' }}
						/>
					)}

					<div className={clsx(classes.placeholder, { [classes.hover]: file })}>
						<Box
							component={Icon}
							icon={roundAddAPhoto}
							sx={{ width: 24, height: 24, mb: 0.5 }}
						/>
						<Typography display='block'>
							{file ? 'Update photo' : 'Upload photo'}
						</Typography>
					</div>
				</div>
			</Box>

			<Box sx={{ display: 'flex', justifyContent: 'center' }}>
				{isError === 'size-invalid' && (
					<FormHelperText error>{`File is larger than ${fData(
						PHOTO_SIZE
					)}`}</FormHelperText>
				)}

				{isError === 'type-invalid' && (
					<FormHelperText error>
						File type must be *.jpeg, *.jpg, *.png, *.gif
					</FormHelperText>
				)}
			</Box>

			<Box
				sx={{
					display: 'flex',
					justifyContent: 'flex-end',
					'& > *': { ml: 1.5 }
				}}>
				<Button variant='contained' onClick={() => onFileGenerate()} sx={{ ml: 1.5 }}>
					Generate
				</Button>
				{file && (
					<Button variant='contained' onClick={() => onFileDelete()} sx={{ ml: 1.5 }}>
						Remove
					</Button>
				)}
			</Box>
		</>
	);
}

const useStyles = makeStyles((theme) => ({
	root: {
		width: 144,
		height: 144,
		margin: 'auto',
		borderRadius: '50%',
		padding: theme.spacing(1),
		border: `1px dashed ${theme.palette.grey[500_32]}`
	},
	dropZone: {
		zIndex: 0,
		width: '100%',
		height: '100%',
		outline: 'none',
		display: 'flex',
		overflow: 'hidden',
		borderRadius: '50%',
		position: 'relative',
		alignItems: 'center',
		justifyContent: 'center',
		'& > *': { width: '100%', height: '100%' },
		'&:hover': { cursor: 'pointer', '& $placeholder': { zIndex: 9 } }
	},
	loading: {
		zIndex: 99,
		display: 'flex',
		alignItems: 'center',
		position: 'absolute',
		justifyContent: 'center',
		backgroundColor: alpha(theme.palette.grey[900], 0.72)
	},
	placeholder: {
		display: 'flex',
		position: 'absolute',
		alignItems: 'center',
		flexDirection: 'column',
		justifyContent: 'center',
		color: theme.palette.text.secondary,
		backgroundColor: theme.palette.background.default,
		transition: theme.transitions.create('opacity', {
			easing: theme.transitions.easing.easeInOut,
			duration: theme.transitions.duration.shorter
		}),
		'&:hover': { opacity: 0.72 }
	},
	hover: {
		opacity: 0,
		color: theme.palette.common.white,
		backgroundColor: theme.palette.grey[900],
		'&:hover': { opacity: 0.8 }
	},
	isDragActive: { opacity: 0.72 },
	isDragReject: {
		color: theme.palette.error.main,
		borderColor: theme.palette.error.light,
		backgroundColor: theme.palette.error.lighter
	}
}));
