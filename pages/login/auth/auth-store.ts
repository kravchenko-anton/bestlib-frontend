import api from '@/services/api';
import { saveTokensStorage } from '@/pages/login/auth/auth-helper';
import { errorToast } from '@/utils/toast';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { AuthOutput } from 'api-client/models';
import { AuthDtoType } from '@/pages/login/auth/auth.types';

export interface AuthStoreStateType {
	isLoading: 'google' | 'mail-login' | false
	authType: 'register' | 'login' | null
	user: AuthOutput['user'] | null
}
export interface AuthStoreActionsType {
	mailLogin: (payload: AuthDtoType) => void
	googleLogin: (payload: { socialId: string }) => void
	logout: () => void
}

export const initialState: AuthStoreStateType = {
	isLoading: false,
	authType: null,
	user: null
}

export const useAuthStore = create<AuthStoreStateType & AuthStoreActionsType>()(
	persist(
		set => ({
			...initialState,
			mailLogin: async ({ email, password }) => {
				set({
					isLoading: 'mail-login'
				})
				api.auth
					.mailLogin({ email, password })
					.then(({ data: loginResponse }) => {
						if (!loginResponse.accessToken)
							throw new Error("Couldn't login")
						if (loginResponse.user.role !== 'admin')
							throw new Error("Something went wrong")
						saveTokensStorage({
							accessToken: loginResponse.accessToken,
							refreshToken: loginResponse.refreshToken
						})
						set({
							isLoading: false,
							user: loginResponse.user,
							authType: 'login'
						})
					})
					.catch(error => {
						console.error(JSON.stringify(error))

						errorToast('Something went wrong')
						set({
							isLoading: false,
							user: null,
							authType: null
						})
					})
			},
			googleLogin: async socialId => {
				set({
					isLoading: 'google'
				})
				api.auth
					.googleSign(socialId)
					.then(({ data: loginResponse }) => {
						if (!loginResponse.accessToken)
							throw new Error("Couldn't login")
						if (loginResponse.user.role !== 'admin')
							throw new Error("Something went wrong")
						saveTokensStorage({
							accessToken: loginResponse.accessToken,
							refreshToken: loginResponse.refreshToken
						})
						set({
							isLoading: false,
							user: loginResponse.user,
							authType: loginResponse.type as 'register' | 'login'
						})
					})
					.catch(error => {
						console.error(JSON.stringify(error))

						errorToast("Couldn't login")
						set({
							isLoading: false,
							user: null,
							authType: null
						})
					})
			},
			logout: () => {
				set({
					isLoading: false,
					user: null,
					authType: null
				})
			}
		}),
		{
			name: 'auth-store',
			storage: createJSONStorage(() => localStorage)
		}
	)
)
