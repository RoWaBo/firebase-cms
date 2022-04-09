import CollectionHeader from '../../admin/CollectionHeader'
import { useEffect, useState } from 'react'
import { Alert, CircularProgress, TextField, Snackbar, Button } from '@mui/material'
import useFirestore from '../../../hooks/useFirestore'
import { useRouter } from 'next/router'
import { Box } from '@mui/system'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { blogs as col } from '../../../collectionsConfig'
import CollectionItemList from '../CollectionItemList'
import MyRichTextEditor from '../MyRichTextEditor'
import useStorage from '../../../hooks/useStorage'

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
		reset,
	} = useForm({
		resolver: yupResolver(blogSchema),
	})
	const [isLoading, setIsLoading] = useState()
	const [isSaving, setIsSaving] = useState()
	const [errorMessage, setErrorMessage] = useState()
	const [successMessage, setSuccessMessage] = useState()
	const [editorContent, setEditorContent] = useState()
	const router = useRouter()
	const { addDocWithAutoId, getDocument, updateDocument } = useFirestore()
	const { uploadeImage } = useStorage()

	// reset collection item content on id change
	useEffect(() => {
		reset()
		setEditorContent(null)
	}, [router.query.id])

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
				setEditorContent(doc.richTextEditor)
			} catch (error) {
				console.error(error)
				setIsLoading(false)
				setErrorMessage("Item couldn't be loaded... try to refresh the page")
			}
		})()
	}, [router.isReady, router.query.id])

	const onSubmit = async (form) => {
		const formData = {
			...form,
			richTextEditor: editorContent,
		}
		console.log('form: ', formData)
		try {
			setIsSaving(true)
			if (router.query.id === 'null') {
				const docId = await addDocWithAutoId(
					col.firestoreCollectionName,
					formData
				)
				router.push(`${router.route}?collection=${col.name}&id=${docId}`)
			} else {
				await updateDocument(
					col.firestoreCollectionName,
					router.query.id,
					formData
				)
			}
			setIsSaving(false)
			setSuccessMessage('Successfully saved')
		} catch (error) {
			console.error(error)
			setIsSaving(false)
			setErrorMessage('Something went wrong')
		}
	}

	const handleAddNewBtnClick = () => {
		router.push(`${router.asPath}&id=null`)
	}

	const logEditor = () => {
		console.log('EditorContent: ', editorContent)
	}

	const handleImageUploade = async (image) => {
		try {
			const imageUrl = await uploadeImage(col.firestoreCollectionName, image)
			return imageUrl
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<>
			<CollectionHeader
				collectionName={col.name}
				onClickAddNew={handleAddNewBtnClick}
				onClickSave={handleSubmit(onSubmit)}
				isSaving={isSaving}
			/>

			{/* ERRORMESSAGE */}
			{errorMessage && <Alert severity='error'>{errorMessage}</Alert>}

			{/* LIST OF ALL COLLECTION ITEMS */}
			{!router.query.id && (
				<CollectionItemList
					collectionInfo={col}
					setErrorMessage={setErrorMessage}
				/>
			)}

			{/* FORM TO ADD NEW ITEM DATA */}
			{router.query.id && !isLoading && (
				<>
					<Box
						component='form'
						onSubmit={(e) => e.preventDefault()}
						sx={{ height: '100%' }}
					>
						<TextField
							label='Title *'
							variant='standard'
							fullWidth
							{...register('title')}
							error={errors?.title ? true : false}
							helperText={errors?.title && errors.title?.message}
							disabled={isSaving}
							sx={{ mb: 3 }}
						/>
						<MyRichTextEditor
							editorContent={editorContent}
							setEditorContent={setEditorContent}
							handleImageUploade={handleImageUploade}
						/>
					</Box>
					<Button
						variant={'outlined'}
						size={'small'}
						sx={{ mt: 2, mr: 2 }}
						onClick={() => setEditorContent(null)}
						disabled={isSaving}
					>
						reset
					</Button>
					<Button
						variant={'contained'}
						size={'small'}
						sx={{ mt: 2 }}
						onClick={logEditor}
						disabled={isSaving}
					>
						log editor
					</Button>
				</>
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
			{isLoading && (
				<CircularProgress
					size={50}
					sx={{ margin: '10vh auto', display: 'block' }}
				/>
			)}
		</>
	)
}

export default Blogs
