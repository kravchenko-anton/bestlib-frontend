import { memo, type FC } from 'react'

const ErrorMessage: FC<{ message: any }> = ({ message }) => {
	if (typeof message === 'string') {
		return <p className='text-danger mt-0.5 text-xs italic'>{message}</p>
	}
	if (message?.message) {
		return (
			<p className='text-danger mt-0.5 text-xs italic'>{message.message}</p>
		)
	}

	return null
}

export default memo(ErrorMessage)
