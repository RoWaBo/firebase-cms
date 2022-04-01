import { doc, getDoc, getDocs, setDoc, collection, query } from 'firebase/firestore'
import { db } from '../firebaseConfig'

const useFirestore = () => {
	const getCollection = async (collectionName) => {
		const ress = await getDocs(collection(db, collectionName))
		const result = []
		ress.forEach((item) => result.push(item.data()))
		return result
	}
	return { getCollection }
}

export default useFirestore
