import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import UploadIcon from '@mui/icons-material/Upload'
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported'
import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useState } from 'react'
import Image from 'next/image'

const ImageDropzone = ({ margin, minHeight, setImage, image }) => {
	const [isLoading, setIsLoading] = useState()

	function ImageUploadIcon({ status }) {
		if (status.accepted) {
			return <UploadIcon fontSize={'large'} color='primary' />
		}
		if (status.rejected) {
			return <ImageNotSupportedIcon fontSize={'large'} color='error' />
		}
		return (
			<AddPhotoAlternateIcon fontSize={'large'} sx={{ color: 'text.secondary' }} />
		)
	}

	const dropzoneText = (status) => {
		if (status.accepted) {
			return 'Drop to upload image'
		}
		if (status.rejected) {
			return 'File is not supported'
		}
		return 'Drag image here or click to select file'
	}

	const dropzoneChildren = (status) => (
		<>
			{image && (
				<Box
					sx={{
						position: 'relative',
						width: '100%',
						height: '150px',
						pointerEvents: 'none',
						mb: 1,
					}}
				>
					<Image
						src={image.url}
						alt={image.name}
						layout='fill'
						quality={85}
						priority
						objectFit='contain'
					/>
				</Box>
			)}
			<Box
				sx={{
					width: '350px',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					pointerEvents: 'none',
				}}
			>
				<ImageUploadIcon status={status} />
				<Typography ml={2} color='text.secondary'>
					{dropzoneText(status)}
				</Typography>
			</Box>
		</>
	)

	const handleOnDrop = (files) => {
		const imageURL = URL.createObjectURL(files[0])
		setImage({ url: imageURL, file: files[0] })
	}

	return (
		<Dropzone
			onDrop={(files) => handleOnDrop(files)}
			onReject={(files) => console.log('rejected file', files)}
			// maxSize={3 * 1024 ** 2}
			accept={IMAGE_MIME_TYPE}
			loading={isLoading}
			style={{
				margin: margin,
				display: 'grid',
				placeContent: 'center',
				minHeight: minHeight,
			}}
		>
			{(status) => dropzoneChildren(status)}
		</Dropzone>
	)
}

export default ImageDropzone
