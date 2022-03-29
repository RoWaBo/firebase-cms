import { Grid } from '@mui/material'

const CenterContainer = ({ children, ...props }) => {
	return (
		<Grid
			container
			justifyContent={'center'}
			alignContent={'center'}
			minHeight={'100vh'}>
			<Grid item {...props}>
				{children}
			</Grid>
		</Grid>
	)
}

export default CenterContainer
