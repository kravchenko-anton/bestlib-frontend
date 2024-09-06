import { deleteTokensStorage, getAccessToken, getNewTokens } from '@/pages/login/auth/auth-helper';
import { errorToast } from '@/utils/toast';
import axios, { type InternalAxiosRequestConfig } from 'axios';
import { errorCatch } from '@/utils/catch-error';

const componentType = typeof window === 'undefined' ? 'server' : 'client'

export const instance = axios.create({
	headers: {
		'Content-Type': 'application/json'
	}
})

export const axiosRequestInstance = async (
	config: InternalAxiosRequestConfig<any>
) => {
	const accessToken = getAccessToken()

	if (config.headers && accessToken)
		config.headers.Authorization = `Bearer ${accessToken}`

	return config
}
export const axiosResponseInstance = async (error: any) => {
	const originalRequest = error.config
	console.log(originalRequest._isRetry)
	if (error.response?.status === 403) deleteTokensStorage()
	if (
		(error.response?.status === 401 ||
			errorCatch(error) === 'jwt expired' ||
			errorCatch(error) === 'jwt malformed' ||
			errorCatch(error) === 'jwt must be provided') &&
		originalRequest &&
		!originalRequest._isRetry
	) {
		originalRequest._isRetry = true
		try {
			await getNewTokens()
			return await axios.request({
				...originalRequest,
				headers: {
					...originalRequest.headers,
					Authorization: `Bearer ${getAccessToken()}`
				}
			})
		} catch (error) {
			if (
				errorCatch(error) === 'jwt expired' ||
				errorCatch(error) === 'jwt must be provided' ||
				errorCatch(error) === 'jwt malformed'
			) {
				return deleteTokensStorage()
			}
			if (componentType === 'client') errorToast(error)
			return Promise.reject(error)
		}
	}
	if (componentType === 'client') errorToast(error)
	throw error
}

instance.interceptors.request.use(axiosRequestInstance)
instance.interceptors.response.use(undefined, axiosResponseInstance)
