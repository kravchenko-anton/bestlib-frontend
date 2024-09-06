import { useEffect, useLayoutEffect, useRef } from 'react'

export function useClickAway(callback: (error: any) => void) {
	const reference = useRef(null)
	const referenceCallback = useRef(callback)

	useLayoutEffect(() => {
		referenceCallback.current = callback
	})

	useEffect(() => {
		const handler = (error: any) => {
			const element: any = reference.current
			if (element && !element.contains(error.target)) {
				referenceCallback.current(error)
			}
		}

		document.addEventListener('mousedown', handler)
		document.addEventListener('touchstart', handler)

		return () => {
			document.removeEventListener('mousedown', handler)
			document.removeEventListener('touchstart', handler)
		}
	}, [])

	return reference
}
