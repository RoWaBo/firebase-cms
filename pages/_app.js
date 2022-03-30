import '../styles/globals.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { AuthProvider } from '../contexts/AuthContext'
import NavBar from '../components/NavBar'

function MyApp({ Component, pageProps }) {
	return (
		<AuthProvider>
			<NavBar />
			<Component {...pageProps} />
		</AuthProvider>
	)
}

export default MyApp
