import CollectionHeader from '../components/admin/CollectionHeader'
import { useEffect, useState } from 'react'
import {
	List,
	ListItem,
	IconButton,
	ListItemAvatar,
	Avatar,
	ListItemText,
	Divider,
	Alert,
	CircularProgress,
} from '@mui/material'
import { Delete } from '@mui/icons-material'
import useFirestore from '../hooks/useFirestore'

const Blogs = ({ collectionInfo }) => {
	const [blogs, setBlogs] = useState()
	const [isLoading, setIsLoading] = useState(true)
	const [errorMessage, setErrorMessage] = useState()
	const { getCollection } = useFirestore()

	// Get all blogs
	useEffect(() => {
		setErrorMessage(null)
		if (blogs) return
		;(async () => {
			try {
				const blogs = await getCollection('blogs')
				setBlogs([...blogs])
				setIsLoading(false)
			} catch (error) {
				console.error(error)
				setIsLoading(false)
				setErrorMessage(
					"Collection couldn't be loaded... try to refresh the page"
				)
			}
		})()
	}, [blogs])

	return (
		<>
			<CollectionHeader collectionName={collectionInfo.collectionName} />
			<List>
				{blogs?.map((blog, i) => (
					<ListItem
						key={blog.id}
						secondaryAction={<IconButton edge='end'>{<Delete />}</IconButton>}
						divider
						sx={{ py: 2 }}
					>
						<ListItemAvatar>
							<Avatar>{collectionInfo.icon}</Avatar>
						</ListItemAvatar>
						<ListItemText primary={blog.title} />
					</ListItem>
				))}
			</List>
			{errorMessage && <Alert severity='error'>{errorMessage}</Alert>}
			{isLoading && (
				<CircularProgress
					size={60}
					sx={{ margin: '10vh auto', display: 'block' }}
				/>
			)}
		</>
	)
}

export default Blogs
