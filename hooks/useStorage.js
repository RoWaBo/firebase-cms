import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '../firebaseConfig'

const useStorage = () => {
	const uploadeImage = async (collectionName, docId, picture) => {
		const profilePictureRef = ref(
			storage,
			`${collectionName}/${docId}/${picture.name}`
		)
		await uploadBytes(profilePictureRef, picture)
		return getDownloadURL(profilePictureRef)
	}

	return {
		uploadeImage,
	}
}

export default useStorage
