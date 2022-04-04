import {
	doc,
	getDoc,
	getDocs,
	setDoc,
	addDoc,
	collection,
	Timestamp,
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
	const getDocument = async (collectionName, docId) => {
		const ress = await getDoc(doc(db, collectionName, docId))
		return ress.data()
	}
	const updateDocument = async (collectionName, docId, body) => {
		const docRef = doc(db, collectionName, docId)
		const currentDate = new Date()
		const docBody = {
			...body,
			editedDate: currentDate,
		}
		const updatedDoc = await setDoc(docRef, docBody, { merge: true })
		return updatedDoc
	}
	const addDocWithAutoId = async (collectionName, body) => {
		const collectionRef = collection(db, collectionName)
		const ress = await addDoc(collectionRef, body)
		const currentDate = new Date()
		const newDocRef = doc(db, collectionName, ress.id)
		const newDocBody = { id: ress.id, creationDate: currentDate }
		await setDoc(newDocRef, newDocBody, { merge: true })
		return ress.id
	}
	const deleteDocument = async (collectionName, id) => {
		await deleteDoc(doc(db, collectionName, id))
	}
	return {
		getCollection,
		addDocWithAutoId,
		deleteDocument,
		getDocument,
		updateDocument,
	}
}

export default useFirestore
