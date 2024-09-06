'use client'

import * as Sentry from '@sentry/nextjs'
import Error from 'next/error'
import { useEffect } from 'react'

// eslint-disable-next-line react/prop-types
export const GlobalError = ({ error }) => {
	useEffect(() => {
		Sentry.captureException(error)
	}, [error])

	return (
		<html>
			<body>
				<Error />
			</body>
		</html>
	)
}

export default GlobalError
