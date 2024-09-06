import Cookies from 'js-cookie';
import api from '../../../services/api';
import { errorCatch } from '@/utils/catch-error';

export const getAccessToken = () => {
	const accessToken = Cookies.get('accessToken')
	console.log('getAccessToken', accessToken)
	return accessToken || null
}

export const getRefreshToken = () => {
	const refreshToken = Cookies.get('refreshToken')
	console.log('getRefreshToken', refreshToken)
	return refreshToken || null
}

export const getTokensStorage = () => {
	const accessToken = Cookies.get('accessToken') || null
	const refreshToken = Cookies.get('refreshToken') || null
	console.log('getTokensStorage', { accessToken, refreshToken })
	return { accessToken, refreshToken }
}

export const saveTokensStorage = (data: {
	accessToken: string
	refreshToken: string
}) => {
	Cookies.set('accessToken', data.accessToken)
	Cookies.set('refreshToken', data.refreshToken)
	console.log('saveTokensStorage', data)
}

export const deleteTokensStorage = () => {
	console.log('deleteTokensStorage')
	Cookies.remove('accessToken')
	Cookies.remove('refreshToken')
}

export const getNewTokens = async () => {
	const refreshToken = getRefreshToken()
	if (!refreshToken) throw new Error('No refresh token')
	console.log('refreshToken', refreshToken)
	const { data: response } = await api.auth
		.refreshToken({ refreshToken })
		.catch((error: any) => {
			if (errorCatch(error) === 'jwt expired') deleteTokensStorage()
			if (errorCatch(error) === 'jwt malformed') deleteTokensStorage()
			if (errorCatch(error) === 'jwt must be provided') deleteTokensStorage()
			throw error
		})
	if (response.accessToken)
		saveTokensStorage({
			accessToken: response.accessToken,
			refreshToken: response.refreshToken
		})
	if (!response.accessToken) throw new Error('No access token')

	return response
}
