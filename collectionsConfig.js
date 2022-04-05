import Blogs from './components/admin/collections/Blogs'
import BookIcon from '@mui/icons-material/Book'
import CodeIcon from '@mui/icons-material/Code'

export const blogs = {
	name: 'blogs',
	icon: <BookIcon />,
	component: <Blogs />,
	firestoreCollectionName: 'blogs',
}

export const collections = [blogs]
