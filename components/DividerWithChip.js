import { Box, Chip, Divider } from '@mui/material'

const DividerWithChip = ({ text, ...props }) => {
	return (
		<Box {...props} sx={{ position: 'relative' }}>
			<Divider />
			<Chip
				label={text}
				size='small'
				variant='outlined'
				sx={{
					backgroundColor: 'white',
					position: 'absolute',
					left: '50%',
					top: '50%',
					transform: 'translate(-50%, -50%)',
				}}
			/>
		</Box>
	)
}

export default DividerWithChip
