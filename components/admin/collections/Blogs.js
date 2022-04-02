import CollectionHeader from '../../admin/CollectionHeader'
import { useEffect, useState } from 'react'
import {
	List,
	ListItem,
	IconButton,
	ListItemAvatar,
	Avatar,
	ListItemText,
	Alert,
	CircularProgress,
	ListItemButton,
	TextField,
} from '@mui/material'
import { Delete } from '@mui/icons-material'
import useFirestore from '../../../hooks/useFirestore'
import { useRouter } from 'next/router'
import { Box } from '@mui/system'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import LoadingButton from '@mui/lab/LoadingButton'
import { Save } from '@mui/icons-material'
import { blogs as blogsCollection } from '../../../collectionsConfig'

const blogSchema = yup.object({
	title: yup.string().required(),
})

const Blogs = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		clearErrors,
	} = useForm({
		resolver: yupResolver(blogSchema),
	})
	const [blogs, setBlogs] = useState()
	const [isLoading, setIsLoading] = useState(true)
	const [errorMessage, setErrorMessage] = useState()
	const router = useRouter()
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

	useEffect(() => {
		console.log(router)
	}, [router])

	const onSubmit = async (form) => {
		try {
			// setIsLoading(true)
			console.log(form)
		} catch (error) {
			setIsLoading(false)
			setErrorMessage('Something went wrong')
		}
	}

	const handleTextFieldOnChange = () => {
		clearErrors()
		setErrorMessage(null)
	}

	return (
		<>
			<CollectionHeader
				collectionName={blogsCollection.name}
				onClickAddNew={() => router.push(`${router.asPath}&addNew=true`)}
				onClickSave={handleSubmit(onSubmit)}
				isLoading={isLoading}
			/>
			{/* FORM TO ADD NEW BLOG */}
			{router.query.addNew && (
				<Box
					component='form'
					// onSubmit={handleSubmit(onSubmit)}
					sx={{ display: 'grid', gap: '1.5rem' }}
				>
					<TextField
						label='Title *'
						variant='standard'
						fullWidth
						{...register('title')}
						error={errors?.title ? true : false}
						helperText={errors?.title && errors.title?.message}
						onChange={handleTextFieldOnChange}
					/>
					<LoadingButton
						loading={isLoading}
						onClick={handleSubmit(onSubmit)}
						variant={'contained'}
						size={'medium'}
						startIcon={<Save />}
						sx={{ justifySelf: 'end', mt: 1 }}
					>
						Save
					</LoadingButton>
				</Box>
			)}
			{/* LIST OF ALL BLOGS */}
			{!router.query.addNew && (
				<List>
					{blogs?.map((blog, i) => (
						<ListItem
							key={blog.id}
							secondaryAction={
								<IconButton edge='end'>{<Delete />}</IconButton>
							}
							divider
							disablePadding
						>
							<ListItemButton sx={{ py: 2 }}>
								<ListItemAvatar>
									<Avatar>{blogsCollection.icon}</Avatar>
								</ListItemAvatar>
								<ListItemText primary={blog.title} />
							</ListItemButton>
						</ListItem>
					))}
				</List>
			)}
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
