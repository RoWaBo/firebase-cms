import {
	doc,
	getDoc,
	getDocs,
	setDoc,
	addDoc,
	collection,
	query,
	serverTimestamp,
	deleteDoc,
} from 'firebase/firestore'
import { db } from '../firebaseConfig'

const useFirestore = () => {
	const getCollection = async (collectionName) => {
		const ress = await getDocs(collection(db, collectionName))
		const result = []
		ress.forEach((item) => result.push(item.data()))
		return result
	}
	const addDocWithAutoId = async (collectionName, body) => {
		const collectionRef = collection(db, collectionName)
		const ress = await addDoc(collectionRef, body)

		const newDocRef = doc(db, collectionName, ress.id)
		const newDocBody = { id: ress.id, serverTimestamp: serverTimestamp() }
		await setDoc(newDocRef, newDocBody, { merge: true })
		return ress.id
	}
	const deleteDocument = async (collectionName, id) => {
		await deleteDoc(doc(db, collectionName, id))
	}
	return { getCollection, addDocWithAutoId, deleteDocument }
}

export default useFirestore
