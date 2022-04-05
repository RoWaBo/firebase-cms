import {
	List,
	ListItem,
	IconButton,
	ListItemAvatar,
	Avatar,
	ListItemText,
	ListItemButton,
	CircularProgress,
} from '@mui/material'
import { Delete } from '@mui/icons-material'
import AlertDialog from '../AlertDialog'
import { useState, useEffect } from 'react'
import useFirestore from '../../hooks/useFirestore'
import { useRouter } from 'next/router'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebaseConfig'

const CollectionItemList = ({ collectionInfo, setErrorMessage }) => {
	const [collectionItems, setCollectionItems] = useState()
	const [alertDialogIsVisible, setAlertDialogIsVisible] = useState()
	const [deletedItem, setDeletedItem] = useState()
	const { deleteDocument } = useFirestore()
	const router = useRouter()
	const collectionRef = collection(db, collectionInfo.firestoreCollectionName)

	// Get all collection items
	useEffect(() => {
		setErrorMessage(null)
		let unsub
		;(async () => {
			try {
				unsub = onSnapshot(collectionRef, (docs) => {
					const result = []
					docs.forEach((doc) => {
						result.push(doc.data())
					})
					setCollectionItems([...result])
				})
			} catch (error) {
				console.error(error)
				setErrorMessage(
					"Collection couldn't be loaded... try to refresh the page"
				)
			}
		})()
		return unsub
	}, [])

	const handleDeleteBtnClick = (title, id) => {
		setDeletedItem({ title, id })
		setAlertDialogIsVisible(true)
	}

	const handleAlertDialogDeleteBtnClick = () => {
		deleteDocument(collectionInfo.firestoreCollectionName, deletedItem.id)
	}

	const handleOnListItemClick = (id) => {
		router.push(`${router.asPath}&id=${id}`)
	}

	return (
		<>
			<List>
				{collectionItems?.map((item, i) => (
					<ListItem
						key={item.id}
						secondaryAction={
							<IconButton
								edge='end'
								onClick={() => handleDeleteBtnClick(item.title, item.id)}
							>
								{<Delete />}
							</IconButton>
						}
						divider
						disablePadding
					>
						<ListItemButton
							sx={{ py: 2 }}
							onClick={() => handleOnListItemClick(item.id)}
						>
							<ListItemAvatar>
								<Avatar>{collectionInfo.icon}</Avatar>
							</ListItemAvatar>
							<ListItemText primary={item.title} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
			{alertDialogIsVisible && (
				<AlertDialog
					title='Do you want to delete:'
					message={`"${deletedItem.title}"`}
					alertDialogIsVisible
					setAlertDialogIsVisible={setAlertDialogIsVisible}
					setErrorMessage={setErrorMessage}
					onDeleteBtnClick={handleAlertDialogDeleteBtnClick}
				/>
			)}
			{/* LOADING ANIMATION */}
			{!collectionItems && (
				<CircularProgress
					size={50}
					sx={{ margin: '10vh auto', display: 'block' }}
				/>
			)}
		</>
	)
}

export default CollectionItemList
