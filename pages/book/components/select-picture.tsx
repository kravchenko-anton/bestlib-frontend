import { useUploadFile } from '@/hooks/useFileUpload';
import { Controller } from 'react-hook-form';
import { BaseFieldProperties } from '@/types/form-types';
import { getFileUrl } from '@/utils/get-file-url';
import { StorageFolderType } from '../../../../backend/src/storage/storage.types';
import { DetailedHTMLProps, ImgHTMLAttributes } from 'react';
import { cn } from '@/utils';

interface SelectPictureProperties extends  DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
	folder: StorageFolderType
}
export const SelectPicture = <T extends Record<string, any>>({
	folder,
	control,
	name,
	className,
	width = 220,
	height = 300,
	...rest
}: BaseFieldProperties<T> & SelectPictureProperties) => {
	const { upload, uploadLoading } = useUploadFile()
	console.log(folder,'folder in select-picture')
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
										folder
									}).then(response => {
										setPicture(response.data.name)
									})
								}}
							/>
							<img
								width={width}
								className={cn('border-bordered cursor-pointer rounded border-[1px]', className)}
								height={height}
								alt='Cover'
								src={getFileUrl(value)}
								onClick={() => {
									const element: HTMLElement | null =
										document.querySelector('input[type=file]')
									element?.click()
								}}
								{...rest}
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
