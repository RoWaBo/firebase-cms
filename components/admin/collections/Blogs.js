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
	Snackbar,
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
import { blogs as collectionInfo } from '../../../collectionsConfig'
import AlertDialog from '../../AlertDialog'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../../../firebaseConfig'
import CollectionItemList from '../CollectionItemList'

const blogSchema = yup.object({
	title: yup.string().required(),
})

const Blogs = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		clearErrors,
		...useFormProps
	} = useForm({
		resolver: yupResolver(blogSchema),
	})
	const [collectionItems, setCollectionItems] = useState()
	const [isLoading, setIsLoading] = useState(true)
	const [errorMessage, setErrorMessage] = useState()
	const [successMessage, setSuccessMessage] = useState()
	const router = useRouter()
	const { addDocWithAutoId } = useFirestore()
	const collectionRef = collection(db, collectionInfo.firestoreCollectionName)

	// Get all blogs
	useEffect(() => {
		setErrorMessage(null)
		if (collectionItems) return
		;(async () => {
			try {
				const unsub = onSnapshot(collectionRef, (docs) => {
					const result = []
					docs.forEach((doc) => {
						result.push(doc.data())
					})
					setCollectionItems([...result])
				})
				setIsLoading(false)
				return unsub
			} catch (error) {
				console.error(error)
				setIsLoading(false)
				setErrorMessage(
					"Collection couldn't be loaded... try to refresh the page"
				)
			}
		})()
	}, [collectionItems])

	useEffect(() => {
		console.log(router)
	}, [router])

	const onSubmit = async (form) => {
		console.log('form: ', form)
		try {
			setIsLoading(true)
			await addDocWithAutoId(collectionInfo.firestoreCollectionName, form)
			setIsLoading(false)
			setSuccessMessage('Successfully saved')
		} catch (error) {
			console.error(error)
			setIsLoading(false)
			setErrorMessage('Something went wrong')
		}
	}

	const handleTextFieldOnChange = () => {
		clearErrors()
		setErrorMessage(null)
	}

	const handleAddNewBtnClick = () => {
		router.push(`${router.asPath}&addNew=true`)
	}

	return (
		<>
			<CollectionHeader
				collectionName={collectionInfo.name}
				onClickAddNew={handleAddNewBtnClick}
				onClickSave={handleSubmit(onSubmit)}
				isLoading={isLoading}
				useForm={useFormProps}
			/>

			{/* LIST OF ALL BLOGS */}
			{!router.query.addNew && (
				<CollectionItemList
					collectionItems={collectionItems}
					collectionInfo={collectionInfo}
					setErrorMessage={setErrorMessage}
				/>
			)}

			{/* FORM TO ADD NEW BLOG */}
			{router.query.addNew && !isLoading && (
				<Box
					component='form'
					onSubmit={(e) => e.preventDefault()}
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
				</Box>
			)}

			{/* SNACKBAR WITH SUCCESS MESSAGE */}
			<Snackbar
				open={successMessage ? true : false}
				autoHideDuration={4000}
				onClose={() => setSuccessMessage(null)}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			>
				<Alert
					severity='success'
					sx={{ width: '100%', mx: '2vw', mb: '2vh', fontSize: '1rem' }}
				>
					{successMessage}
				</Alert>
			</Snackbar>

			{/* ERRORMESSAGE */}
			{errorMessage && <Alert severity='error'>{errorMessage}</Alert>}

			{/* LOADING ANIMATION */}
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
