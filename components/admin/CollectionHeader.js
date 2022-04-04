import { Add } from '@mui/icons-material'
import { Box, Typography, Button } from '@mui/material'
import { useRouter } from 'next/router'
import LoadingButton from '@mui/lab/LoadingButton'
import { Save } from '@mui/icons-material'

const CollectionHeader = ({
	collectionName,
	onClickAddNew,
	onClickSave,
	isSaving,
	useForm,
}) => {
	const router = useRouter()

	const handleOnClickCancelBtn = () => {
		useForm.reset()
		router.push(`${router.route}?collection=${collectionName}`)
	}
	return (
		<Box component='header' sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
			<Typography
				variant='h4'
				component='h1'
				sx={{ textTransform: 'capitalize', fontWeight: 500 }}
			>
				{collectionName}
			</Typography>
			{!router.query.id && (
				<Button
					startIcon={<Add />}
					variant={'contained'}
					size={'medium'}
					sx={{ marginLeft: 'auto' }}
					onClick={onClickAddNew}
					disabled={isSaving}
				>
					Add New
				</Button>
			)}
			{router.query.id && (
				<>
					<Button
						variant={'outlined'}
						size={'medium'}
						color='error'
						sx={{ marginLeft: 'auto', py: 0.63 }}
						onClick={handleOnClickCancelBtn}
						disabled={isSaving}
					>
						Cancel
					</Button>
					<LoadingButton
						loading={isSaving}
						onClick={onClickSave}
						variant={'contained'}
						size={'medium'}
						startIcon={<Save />}
						sx={{ ml: 2 }}
						disabled={isSaving}
					>
						Save
					</LoadingButton>
				</>
			)}
		</Box>
	)
}

export default CollectionHeader
