import { Box, Paper, TextField, Typography, Alert } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import CenterContainer from '../components/CenterContainer'
import { useState } from 'react'

const loginSchema = yup.object({
	email: yup.string().email().required(),
	password: yup.string().min(6).required(),
})

const Admin = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		clearErrors,
	} = useForm({
		resolver: yupResolver(loginSchema),
	})
	const [isLoading, setIsLoading] = useState(false)
	const [errorMessage, setErrorMessage] = useState()
	const onSubmit = (data) => console.log(data)
	return (
		<CenterContainer>
			<Paper
				variant='outlined'
				sx={{ p: { xs: 3, sm: 5 }, width: 'clamp(300px, 50vw, 500px)' }}
			>
				<Typography variant='h4' component={'h1'} mb={2}>
					Login
				</Typography>
				<Box
					component={'form'}
					onSubmit={handleSubmit(onSubmit)}
					sx={{ display: 'grid', gap: '2rem' }}
				>
					<TextField
						label='Email *'
						variant='standard'
						fullWidth
						{...register('email')}
						error={errors?.email ? true : false}
						helperText={errors?.email && errors.email?.message}
						onChange={() => clearErrors()}
					/>

					<TextField
						label='Password *'
						variant='standard'
						fullWidth
						{...register('password')}
						error={errors?.password ? true : false}
						helperText={errors?.password && errors.password?.message}
						onChange={() => clearErrors()}
					/>
					{errorMessage && <Alert severity='error'>{errorMessage}</Alert>}
					<LoadingButton
						loading={isLoading}
						type='submit'
						variant={'contained'}
						size={'large'}
						sx={{ justifySelf: 'end' }}
					>
						Login
					</LoadingButton>
				</Box>
			</Paper>
		</CenterContainer>
	)
}

export default Admin
