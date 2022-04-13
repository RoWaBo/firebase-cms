import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import UploadIcon from '@mui/icons-material/Upload'
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported'
import { Typography } from '@mui/material'
import { Box } from '@mui/system'

const ImageDropzone = ({ margin }) => {
	const dropzoneChildren = (status) => (
		<Box
			sx={{
				width: 'fit-content',
				display: 'flex',
				alignItems: 'center',
				pointerEvents: 'none',
			}}
		>
			{!status.accepted && !status.rejected && (
				<AddPhotoAlternateIcon fontSize={'large'} />
			)}
			{status.accepted && <UploadIcon fontSize={'large'} />}
			{status.rejected && <ImageNotSupportedIcon fontSize={'large'} />}
			<Typography ml={2}>Drag image here or click to select file</Typography>
		</Box>
	)

	return (
		<Dropzone
			onDrop={(files) => console.log('accepted files', files)}
			onReject={(files) => console.log('rejected files', files)}
			// maxSize={3 * 1024 ** 2}
			accept={IMAGE_MIME_TYPE}
			style={{
				margin: margin,
				minHeight: '70px',
				display: 'grid',
				placeContent: 'center',
			}}
		>
			{(status) => dropzoneChildren(status)}
		</Dropzone>
	)
}

export default ImageDropzone
