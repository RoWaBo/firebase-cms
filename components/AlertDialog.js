import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

const AlertDialog = ({
	title,
	message,
	onDeleteBtnClick,
	alertDialogIsVisible,
	setAlertDialogIsVisible,
	setErrorMessage,
}) => {
	const handleClose = () => {
		setAlertDialogIsVisible(false)
	}

	const handleDeleteBtnClick = async () => {
		try {
			await onDeleteBtnClick()
			setAlertDialogIsVisible(false)
		} catch (error) {
			console.error(error)
			setErrorMessage('Unable to delete item')
		}
	}

	return (
		<Dialog open={alertDialogIsVisible} onClose={handleClose}>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>
				{message && <DialogContentText>{message}</DialogContentText>}
			</DialogContent>
			<DialogActions>
				<Button variant={'outlined'} size={'medium'} onClick={handleClose}>
					Cancel
				</Button>
				<Button
					variant={'outlined'}
					size={'medium'}
					color='error'
					onClick={handleDeleteBtnClick}
				>
					Delete
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default AlertDialog
