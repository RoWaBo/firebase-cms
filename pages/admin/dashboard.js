import { Backdrop, CircularProgress, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useRouter } from 'next/router'

const Dashboard = () => {
	const { currentUser } = useAuth()
	const [isLoading, setIsLoading] = useState(true)
	const router = useRouter()

	// Page requires login
	useEffect(() => {
		if (currentUser) {
			setIsLoading(false)
		} else {
			router.push('/admin')
		}
	}, [])

	if (!isLoading)
		return (
			<Typography variant='h4' component='h1'>
				Dashboard
			</Typography>
		)
	if (isLoading)
		return (
			<Backdrop open>
				<CircularProgress />
			</Backdrop>
		)
}

export default Dashboard
