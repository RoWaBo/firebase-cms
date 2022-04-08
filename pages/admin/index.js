import { Box, Paper, TextField, Typography, Alert, Button } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import CenterContainer from '../../components/CenterContainer'
import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useRouter } from 'next/router'
import DividerWithChip from '../../components/DividerWithChip'

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
	const { login } = useAuth()
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(false)
	const [errorMessage, setErrorMessage] = useState()

	const handleOnChange = () => {
		clearErrors()
		setErrorMessage(null)
	}

	const firebaseAuthErrorMessages = (errorCode) => {
		switch (errorCode) {
			case 'auth/user-not-found':
				return "Couldn't find user"
			case 'auth/wrong-password':
				return 'Password is wrong'
			default:
				return 'Something went wrong'
		}
	}

	const onSubmit = async (form) => {
		try {
			setIsLoading(true)
			await login(form.email, form.password)
			router.push('admin/dashboard')
		} catch (error) {
			setIsLoading(false)
			setErrorMessage(firebaseAuthErrorMessages(error.code))
		}
	}

	const handleLoginAsGuest = async () => {
		try {
			setIsLoading(true)
			const guestEmail = process.env.NEXT_PUBLIC_GUEST_EMAIL
			const guestPassword = process.env.NEXT_PUBLIC_GUEST_PASSWORD
			await login(guestEmail, guestPassword)
			router.push('admin/dashboard')
		} catch (error) {
			setIsLoading(false)
			setErrorMessage(firebaseAuthErrorMessages(error.code))
		}
	}

	return (
		<CenterContainer>
			<Paper
				variant='outlined'
				sx={{ p: { xs: 4 }, width: 'clamp(300px, 50vw, 450px)' }}
			>
				<Typography variant='h5' component={'h1'} mb={2}>
					Login
				</Typography>
				<Box
					component={'form'}
					// onSubmit={handleSubmit(onSubmit)}
					sx={{ display: 'grid', gap: '1.5rem' }}
				>
					<TextField
						label='Email *'
						variant='standard'
						fullWidth
						{...register('email')}
						error={errors?.email ? true : false}
						helperText={errors?.email && errors.email?.message}
						onChange={handleOnChange}
						disabled={isLoading}
					/>

					<TextField
						label='Password *'
						variant='standard'
						fullWidth
						type='password'
						{...register('password')}
						error={errors?.password ? true : false}
						helperText={errors?.password && errors.password?.message}
						onChange={handleOnChange}
						disabled={isLoading}
					/>
					{errorMessage && <Alert severity='error'>{errorMessage}</Alert>}
					<LoadingButton
						loading={isLoading}
						onClick={handleSubmit(onSubmit)}
						variant={'contained'}
						size={'large'}
						sx={{ justifySelf: 'end', mt: 1 }}
					>
						Login
					</LoadingButton>
				</Box>
				<DividerWithChip text='OR' mt={4} mb={2} />
				<Button
					disabled={isLoading}
					onClick={handleLoginAsGuest}
					size={'large'}
					fullWidth
				>
					Login as guest
				</Button>
			</Paper>
		</CenterContainer>
	)
}

export default Admin
