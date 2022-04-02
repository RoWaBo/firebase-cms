import Blogs from './components/admin/collections/Blogs'
import BookIcon from '@mui/icons-material/Book'
import CodeIcon from '@mui/icons-material/Code'
import CodeSnippets from './components/admin/collections/CodeSnippets'

export const blogs = {
	name: 'blogs',
	icon: <BookIcon />,
	component: <Blogs />,
}

export const codeSnippets = {
	name: 'code snippets',
	icon: <CodeIcon />,
	component: <CodeSnippets />,
}

export const collections = [blogs, codeSnippets]
