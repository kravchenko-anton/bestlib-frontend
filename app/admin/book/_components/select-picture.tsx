import { useUploadFile } from '@/hooks/useFileUpload';
import { Controller } from 'react-hook-form';
import { BaseFieldProperties } from '@/types/form-types';
import { getFileUrl } from '@/utils/get-file-url';

export const SelectPicture = <T extends Record<string, any>>({
	control,
	name
}: BaseFieldProperties<T>) => {
	const { upload, uploadLoading } = useUploadFile()
	return (
		<Controller
			control={control}
			name={name}
			render={({
				field: { value = '', onChange: setPicture },
				fieldState: { error }
			}) => (
				<>
					<div>
						<div>
							<input
								type='file'
								className='hidden'
								disabled={uploadLoading}
								onChange={async ({ target }) => {
									const file = target.files?.[0]

									if (!file) return
									upload({
										file,
										folder: 'booksCovers'
									}).then(response => {
										setPicture(response.data.name)
									})
								}}
							/>
							<img
								width={220}
								className='border-bordered  cursor-pointer rounded border-[1px]'
								height={300}
								src={getFileUrl(value)}
								alt='Cover'
								onClick={() => {
									const element: HTMLElement | null =
										document.querySelector('input[type=file]')
									element?.click()
								}}
							/>
						</div>
					</div>
					{!!error && (
						<p className='text-danger mt-0.5 text-xs italic'>{error.message}</p>
					)}
				</>
			)}
		/>
	)
}
