import { Add } from '@mui/icons-material'
import { Box, Typography, Button } from '@mui/material'
import { useRouter } from 'next/router'
import LoadingButton from '@mui/lab/LoadingButton'
import { Save } from '@mui/icons-material'

const CollectionHeader = ({
	collectionName,
	onClickAddNew,
	onClickSave,
	isLoading,
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
			{!router.query.addNew && (
				<Button
					startIcon={<Add />}
					variant={'contained'}
					size={'medium'}
					sx={{ marginLeft: 'auto' }}
					onClick={onClickAddNew}
				>
					Add New
				</Button>
			)}
			{router.query.addNew && (
				<>
					<Button
						variant={'outlined'}
						size={'medium'}
						color='error'
						sx={{ marginLeft: 'auto', py: 0.63 }}
						onClick={handleOnClickCancelBtn}
					>
						Cancel
					</Button>
					<LoadingButton
						loading={isLoading}
						onClick={onClickSave}
						variant={'contained'}
						size={'medium'}
						startIcon={<Save />}
						sx={{ ml: 2 }}
					>
						Save
					</LoadingButton>
				</>
			)}
		</Box>
	)
}

export default CollectionHeader
