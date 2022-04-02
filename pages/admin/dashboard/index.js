import { Backdrop, CircularProgress, Grid, Paper } from '@mui/material'
import { useEffect, useState } from 'react'
import { useAuth } from '../../../contexts/AuthContext'
import { useRouter } from 'next/router'
import AdminSideNav from '../../../components/admin/AdminSideNav'
// COLLECTIONS
import { collections } from '../../../collectionsConfig'

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
					<AdminSideNav heading='Collections' navItems={collections} />
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
					{collections.map((collection, i) => (
						<div key={i}>
							{router.query.collection === collection.name && (
								<>{collection.component}</>
							)}
						</div>
					))}
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
