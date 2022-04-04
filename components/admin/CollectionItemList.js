import {
	List,
	ListItem,
	IconButton,
	ListItemAvatar,
	Avatar,
	ListItemText,
	ListItemButton,
} from '@mui/material'
import { Delete } from '@mui/icons-material'
import AlertDialog from '../AlertDialog'
import { useState } from 'react'
import useFirestore from '../../hooks/useFirestore'
import { useRouter } from 'next/router'

const CollectionItemList = ({ collectionItems, collectionInfo, setErrorMessage }) => {
	const [alertDialogIsVisible, setAlertDialogIsVisible] = useState()
	const [deletedItem, setDeletedItem] = useState()
	const { deleteDocument } = useFirestore()
	const router = useRouter()

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
		</>
	)
}

export default CollectionItemList
