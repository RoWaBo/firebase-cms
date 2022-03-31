import { Add } from '@mui/icons-material'
import { Box, Typography, Button } from '@mui/material'

const CollectionHeader = ({ collectionName }) => {
	return (
		<Box
			component='header'
			sx={{ display: 'flex', alignItems: 'center', px: '10%', mt: '10vh', mb: 4 }}
		>
			<Typography
				variant='h5'
				component='h1'
				sx={{ textTransform: 'capitalize', fontWeight: 500 }}
			>
				{collectionName}
			</Typography>
			<Button
				startIcon={<Add />}
				variant={'contained'}
				size={'medium'}
				sx={{ marginLeft: 'auto' }}
			>
				Add New
			</Button>
		</Box>
	)
}

export default CollectionHeader
