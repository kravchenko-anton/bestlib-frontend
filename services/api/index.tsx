import { instance } from './interceptors';
import { AuthApi } from 'api-client/clients/auth-api';
import { BookApi } from 'api-client/clients/book-api';
import { CatalogApi } from 'api-client/clients/catalog-api';
import { EbookApi } from 'api-client/clients/ebook-api';
import { GenreApi } from 'api-client/clients/genre-api';
import { RecommendationApi } from 'api-client/clients/recommendation-api';
import { StorageApi } from 'api-client/clients/storage-api';
import { UserApi } from 'api-client/clients/user-api';
import { ParserApi } from 'api-client/clients/parser-api';

export const webServerURL = process.env.SERVER_URL
console.log('webServerURL', webServerURL)
const baseParameters = {
	basePath: webServerURL,
	isJsonMime: () => true
}


const auth = new AuthApi(baseParameters, webServerURL, undefined)
const parser = new ParserApi(baseParameters, webServerURL, undefined)

const book = new BookApi(baseParameters, webServerURL, instance)

const catalog = new CatalogApi(baseParameters, webServerURL, instance)

const ebook = new EbookApi(baseParameters, webServerURL, instance)

const genre = new GenreApi(baseParameters, webServerURL, instance)


const recommendation = new RecommendationApi(
	baseParameters,
	webServerURL,
	instance
)

const storage = new StorageApi(baseParameters, webServerURL, instance)

const user = new UserApi(baseParameters, webServerURL, instance)

export default {
	auth,
	book,
	catalog,
	ebook,
	parser,
	genre,
	recommendation,
	storage,
	user
}
