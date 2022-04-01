import { Add } from '@mui/icons-material'
import { Box, Typography, Button } from '@mui/material'

const CollectionHeader = ({ collectionName, onClickBtn }) => {
	return (
		<Box component='header' sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
			<Typography
				variant='h4'
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
				onClick={onClickBtn}
			>
				Add New
			</Button>
		</Box>
	)
}

export default CollectionHeader
