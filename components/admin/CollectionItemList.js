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

const CollectionItemList = ({ collectionItems, collectionInfo, setErrorMessage }) => {
	const [alertDialogIsVisible, setAlertDialogIsVisible] = useState()
	const [deletedItemId, setDeletedItemId] = useState()
	const { deleteDocument } = useFirestore()

	const handleDeleteBtnClick = (id) => {
		setDeletedItemId(id)
		setAlertDialogIsVisible(true)
	}

	const handleAlertDialogDeleteBtnClick = () => {
		deleteDocument(collectionInfo.firestoreCollectionName, deletedItemId)
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
								onClick={() => handleDeleteBtnClick(item.id)}
							>
								{<Delete />}
							</IconButton>
						}
						divider
						disablePadding
					>
						<ListItemButton sx={{ py: 2 }}>
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
					title='Are you sure you want to delete?'
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
