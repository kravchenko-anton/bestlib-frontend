import api from '@/services/api'
import { MutationKeys } from '@/utils/query-keys'
import type { StorageFolderType } from '@/utils/storage.types'
import { errorToast } from '@/utils/toast'
import { useMutation } from '@tanstack/react-query'

interface UploadFileProperties {
	folder: StorageFolderType
	file: File
}

export const useUploadFile = () => {
	const { mutateAsync: upload, isPending: uploadLoading } = useMutation({
		mutationKey: MutationKeys.storage.uploadFile,
		mutationFn: ({ folder, file }: UploadFileProperties) =>
		{
			console.log(folder,"useUploadFile")
		 return 	api.storage.upload(folder, file)
		},
		onError: () =>
			errorToast({
				text1: 'Upload file',
				text2: 'An error occurred',
				type: 'error'
			})
	})

	return {
		upload,
		uploadLoading
	}
}
