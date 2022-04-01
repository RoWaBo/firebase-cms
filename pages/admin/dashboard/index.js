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
				<Grid
					item
					xs={9}
					component='main'
					sx={{
						height: '100vh',
						overflowY: 'scroll',
						px: '8%',
						pt: '8vh',
					}}
				>
					{router.query.collection === navItems[0].collectionName && (
						<Blogs collectionInfo={navItems[0]} />
					)}
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
