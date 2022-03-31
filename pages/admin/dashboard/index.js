import { Backdrop, Box, CircularProgress, Grid, Paper } from '@mui/material'
import { useEffect, useState } from 'react'
import { useAuth } from '../../../contexts/AuthContext'
import { useRouter } from 'next/router'
import BookIcon from '@mui/icons-material/Book'
import CodeIcon from '@mui/icons-material/Code'
import SettingsIcon from '@mui/icons-material/Settings'
import AdminSideNav from '../../../components/admin/AdminSideNav'
// COLLECTIONS
import Blogs from '../../../collections/Blogs'

const navItems = [
	{ collectionName: 'blogs', icon: <BookIcon /> },
	{ collectionName: 'code snippets', icon: <CodeIcon /> },
	{ collectionName: 'settings', icon: <SettingsIcon /> },
]

const Dashboard = () => {
	const { currentUser } = useAuth()
	const [isLoading, setIsLoading] = useState(true)
	const router = useRouter()

	useEffect(() => {
		if (!router.isReady) return
		console.log(router)
		console.log(router.query.collection)
	}, [router.isReady])

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
			<Grid container direction='row'>
				<Grid item xs={3}>
					<AdminSideNav heading='Collections' navItems={navItems} />
				</Grid>
				<Grid item xs={9}>
					<Box
						component='main'
						sx={{
							height: '100vh',
							overflowY: 'scroll',
						}}
					>
						{router.query.collection === navItems[0].collectionName && (
							<Blogs collectionName={navItems[0].collectionName} />
						)}
					</Box>
				</Grid>
			</Grid>
		)
	if (isLoading)
		return (
			<Backdrop open>
				<CircularProgress />
			</Backdrop>
		)
}

export default Dashboard
