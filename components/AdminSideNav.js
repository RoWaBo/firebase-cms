import {
	Button,
	Divider,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Paper,
	Typography,
} from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import { useAuth } from '../contexts/AuthContext'
import { useRouter } from 'next/router'

const AdminSideNav = ({ heading, navItems }) => {
	const { logout } = useAuth()
	const router = useRouter()

	const handleLogout = () => {
		logout()
		router.push('/admin')
	}

	return (
		<Paper
			component='nav'
			variant='outlined'
			square
			sx={{
				width: '100%',
				maxWidth: 300,
				minHeight: '100vh',
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			<Typography variant='h5' component='h2' px={2} pb={1} pt={4}>
				{heading}
			</Typography>
			<Divider />
			<List>
				{navItems.map(({ text, icon }, i) => (
					<ListItem key={i} disablePadding>
						<ListItemButton>
							<ListItemIcon>{icon}</ListItemIcon>
							<ListItemText
								primary={text}
								sx={{ textTransform: 'capitalize' }}
							/>
						</ListItemButton>
					</ListItem>
				))}
			</List>
			<Divider sx={{ marginTop: 'auto' }} />
			<Button
				startIcon={<LogoutIcon />}
				size='large'
				sx={{ justifyContent: 'start', pl: 2.8 }}
				fullWidth
				onClick={handleLogout}
			>
				Logout
			</Button>
		</Paper>
	)
}

export default AdminSideNav
