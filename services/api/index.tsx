import { AdminAuthorApi, AdminBookApi, AdminUserApi, EbookApi, GenreApi, StorageApi } from '@/api-client'
import { AuthApi } from 'api-client/clients/auth-api'
import { instance } from './interceptors'

export const webServerURL = process.env.SERVER_URL
console.log('webServerURL', webServerURL)
const baseParameters = {
	basePath: webServerURL,
	isJsonMime: () => true
}


const auth = new AuthApi(baseParameters, webServerURL, undefined)

const author = new AdminAuthorApi(baseParameters, webServerURL, instance)
const book = new AdminBookApi(baseParameters, webServerURL, instance)
const user = new AdminUserApi(baseParameters, webServerURL, instance)
const ebook = new EbookApi(baseParameters, webServerURL, instance)
	const genre = new GenreApi(baseParameters, webServerURL, instance)
	const storage = new StorageApi(baseParameters, webServerURL, instance)
export default {
	auth,
	book,
	author,
	ebook,
	genre,
	storage,
	user
}
