import CollectionHeader from '../../admin/CollectionHeader'
import { useEffect, useState } from 'react'
import { Alert, CircularProgress, TextField, Snackbar } from '@mui/material'
import useFirestore from '../../../hooks/useFirestore'
import { useRouter } from 'next/router'
import { Box } from '@mui/system'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { blogs as col } from '../../../collectionsConfig'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../../../firebaseConfig'
import CollectionItemList from '../CollectionItemList'
import MyRichTextEditor from '../MyRichTextEditor'

const blogSchema = yup.object({
	title: yup.string().required(),
})

const Blogs = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		clearErrors,
		setValue,
		...useFormProps
	} = useForm({
		resolver: yupResolver(blogSchema),
	})
	const [collectionItems, setCollectionItems] = useState()
	const [isLoading, setIsLoading] = useState()
	const [isSaving, setIsSaving] = useState()
	const [errorMessage, setErrorMessage] = useState()
	const [successMessage, setSuccessMessage] = useState()
	const [editorContent, setEditorContent] = useState()
	const router = useRouter()
	const { addDocWithAutoId, getDocument, updateDocument } = useFirestore()
	const collectionRef = collection(db, col.firestoreCollectionName)

	// Get all collection items
	useEffect(() => {
		setErrorMessage(null)
		let unsub
		;(async () => {
			try {
				setIsLoading(true)
				unsub = onSnapshot(collectionRef, (docs) => {
					const result = []
					docs.forEach((doc) => {
						result.push(doc.data())
					})
					setCollectionItems([...result])
				})
				setIsLoading(false)
			} catch (error) {
				console.error(error)
				setIsLoading(false)
				setErrorMessage(
					"Collection couldn't be loaded... try to refresh the page"
				)
			}
		})()
		return unsub
	}, [])

	// GET AND ADD DOC DATA TO FORM
	useEffect(() => {
		if (router.query.id === 'null' || !router.query.id || !router.isReady) return
		;(async () => {
			try {
				setIsLoading(true)
				const doc = await getDocument(
					col.firestoreCollectionName,
					router.query.id
				)
				setIsLoading(false)
				// Update form with doc data
				setValue('title', doc.title)
			} catch (error) {
				console.error(error)
				setIsLoading(false)
				setErrorMessage("Item couldn't be loaded... try to refresh the page")
			}
		})()
	}, [router.isReady, router.query.id])

	// useEffect(() => {
	// 	console.log(router)
	// }, [router])

	const onSubmit = async (form) => {
		console.log('form: ', form)
		try {
			setIsSaving(true)
			if (router.query.id === 'null') {
				const docId = await addDocWithAutoId(col.firestoreCollectionName, form)
				router.push(`${router.route}?collection=${col.name}&id=${docId}`)
			} else {
				await updateDocument(col.firestoreCollectionName, router.query.id, form)
			}
			setIsSaving(false)
			setSuccessMessage('Successfully saved')
		} catch (error) {
			console.error(error)
			setIsSaving(false)
			setErrorMessage('Something went wrong')
		}
	}

	const handleTextFieldOnChange = () => {
		clearErrors()
		setErrorMessage(null)
	}

	const handleAddNewBtnClick = () => {
		router.push(`${router.asPath}&id=null`)
	}

	return (
		<>
			<CollectionHeader
				collectionName={col.name}
				onClickAddNew={handleAddNewBtnClick}
				onClickSave={handleSubmit(onSubmit)}
				isSaving={isSaving}
				useForm={useFormProps}
			/>

			{/* ERRORMESSAGE */}
			{errorMessage && <Alert severity='error'>{errorMessage}</Alert>}

			{/* LIST OF ALL COLLECTION ITEMS */}
			{!router.query.id && (
				<CollectionItemList
					collectionItems={collectionItems}
					collectionInfo={col}
					setErrorMessage={setErrorMessage}
				/>
			)}

			{/* FORM TO ADD NEW ITEM DATA */}
			{router.query.id && !isLoading && (
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
						disabled={isSaving}
					/>
					<MyRichTextEditor
						editorContent={editorContent}
						setEditorContent={setEditorContent}
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

			{/* LOADING ANIMATION */}
			{(isLoading || !collectionItems) && (
				<CircularProgress
					size={50}
					sx={{ margin: '10vh auto', display: 'block' }}
				/>
			)}
		</>
	)
}

export default Blogs
