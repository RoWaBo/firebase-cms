import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '../firebaseConfig'

const useStorage = () => {
	const uploadeImage = async (collectionName, image) => {
		const imageRef = ref(storage, `${collectionName}/${image.name}`)
		await uploadBytes(imageRef, image)
		return getDownloadURL(imageRef)
	}

	return {
		uploadeImage,
	}
}

export default useStorage
