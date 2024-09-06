import { validateNumberParameter, validateStringParameter } from '@/utils/validate-parameter';
import { useSearchParams } from 'next/navigation';

export const useTableParameters = () => {
	const parameters = useSearchParams()
	const searchTerm = validateStringParameter(parameters?.get('searchTerm'))
	const page = validateNumberParameter(parameters?.get('page'))
	const dialog = validateStringParameter(parameters?.get('dialog'))

	return {
		searchTerm,
		page,
		dialog
	}
}
