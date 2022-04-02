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
import { useAuth } from '../../contexts/AuthContext'
import { useRouter } from 'next/router'
import { blue } from '@mui/material/colors'

const AdminSideNav = ({ heading, navItems }) => {
	const { logout } = useAuth()
	const router = useRouter()

	const handleLogoutBtnClick = () => {
		logout()
		router.push('/admin')
	}

	const handleListItemBtnClick = (collectionName) => {
		router.push(`${router.route}?collection=${collectionName}`)
	}

	const listItemBtnIsSelected = (itemCollectionName) => {
		return itemCollectionName === router.query.collection ? true : false
	}
	const listItemBtnSelectedStyle = (itemCollectionName) => {
		return itemCollectionName === router.query.collection ? { color: blue[800] } : {}
	}

	return (
		<Paper
			component='nav'
			variant='outlined'
			square
			sx={{
				width: '100%',
				minHeight: '100vh',
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			<Typography variant='h6' component='h2' px={2} py={2}>
				{heading}
			</Typography>
			<Divider />
			<List>
				{navItems?.map(({ name, icon }, i) => (
					<ListItem key={i} disablePadding>
						<ListItemButton
							sx={listItemBtnSelectedStyle(name)}
							selected={listItemBtnIsSelected(name)}
							onClick={() => handleListItemBtnClick(name)}
						>
							<ListItemIcon sx={listItemBtnSelectedStyle(name)}>
								{icon}
							</ListItemIcon>
							<ListItemText
								primary={name}
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
				sx={{ justifyContent: 'start', pl: 2.8, py: 2 }}
				fullWidth
				onClick={handleLogoutBtnClick}
			>
				Logout
			</Button>
		</Paper>
	)
}

export default AdminSideNav
