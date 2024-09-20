'use client';

import { getRefreshToken } from '@/app/auth/auth-helper'
import { useAuthStore } from '@/app/auth/auth-store'
import { publicRoutes, secureRoutes } from '@/utils/route'
import { redirect } from 'next/navigation'
import { type FC, useEffect } from 'react'

export const loginRoute = (Component: FC) =>
	function (properties: NonNullable<unknown>) {
		const { user, isLoading } = useAuthStore(state => ({
			user: state.user,
			isLoading: state.isLoading
		}))
		console.log('user', user, isLoading)
		useEffect(() => {
			if (user && !isLoading) redirect(secureRoutes.bookCatalogRoute)
		}, [user])

		return <Component {...properties} />
	}

export const adminRoute = (Component: FC) =>
	function (properties: NonNullable<unknown>) {
		const { user, isLoading, logout } = useAuthStore(state => ({
			user: state.user,
			isLoading: state.isLoading,
			logout: state.logout
		}))
		useEffect(() => {
			const checkRefreshToken = () => {
				const refreshToken = getRefreshToken()
				if (!refreshToken && user && !isLoading) {
					logout()
					redirect(publicRoutes.login)
				}
			}

			checkRefreshToken()
		}, [isLoading, logout, user])

		return <Component {...properties} />
	}
