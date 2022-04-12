import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import { Typography } from '@mui/material'

const ImageDropzone = () => {
	const ImageUploadIcon = (status, ...props) => {
		// if (status.accepted) {
		// 	return <Upload {...props} />
		// }
		// if (status.rejected) {
		// 	return <X {...props} />
		// }
		// return <Photo {...props} />
	}
	const dropzoneChildren = (status) => (
		<>
			<AddPhotoAlternateIcon />
			<Typography variant='h6' component='h2'>
				Add image
			</Typography>
		</>
	)

	return (
		<Dropzone
			onDrop={(files) => console.log('accepted files', files)}
			onReject={(files) => console.log('rejected files', files)}
			// maxSize={3 * 1024 ** 2}
			accept={IMAGE_MIME_TYPE}
		>
			{(status) => dropzoneChildren(status)}
		</Dropzone>
	)
}

export default ImageDropzone
