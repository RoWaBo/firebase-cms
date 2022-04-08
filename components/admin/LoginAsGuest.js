import { Box, Button, Chip, Divider } from '@mui/material'
import { useState } from 'react'

const LoginAsGuest = () => {
	const [isLoading, setIsLoading] = useState()
	return (
		<>
			<Box mt={6} mb={4} sx={{ position: 'relative' }}>
				<Divider />
				<Chip
					label='OR'
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
			<Button
				size={'large'}
				sx={{ width: '100%' }}
				// onClick={onClickAddNew}
				disabled={isLoading}
			>
				Login as guest
			</Button>
		</>
	)
}

export default LoginAsGuest
