import { Backdrop, CircularProgress } from '@mui/material'
import { useEffect, useState } from 'react'
import { useAuth } from '../../../contexts/AuthContext'
import { useRouter } from 'next/router'
import BookIcon from '@mui/icons-material/Book'
import CodeIcon from '@mui/icons-material/Code'
import SettingsIcon from '@mui/icons-material/Settings'
import AdminSideNav from '../../../components/AdminSideNav'

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

	if (!isLoading) return <AdminSideNav heading='Collection' navItems={navItems} />
	if (isLoading)
		return (
			<Backdrop open>
				<CircularProgress />
			</Backdrop>
		)
}

export default Dashboard
