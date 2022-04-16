import { Backdrop, CircularProgress, Grid, Box } from '@mui/material'
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
				<Grid item xs={4} sm={2.5}>
					<AdminSideNav heading='Collections' navItems={collections} />
				</Grid>
				<Grid
					item
					xs={8}
					sm={9.5}
					component='main'
					sx={{
						height: '100vh',
						overflowY: 'scroll',
						px: '6%',
						pt: '6vh',
					}}
				>
					{collections.map((collection, i) => (
						<Box key={i} sx={{ height: '100%' }}>
							{router.query.collection === collection.name && (
								<>{collection.component}</>
							)}
						</Box>
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
