'use client';
import { cn } from '@/utils';
import { useCallback, useEffect, useRef, useState } from 'react';
import { settings } from './settings';
import type { DropzoneProperties } from './types';
import { Color } from '@/utils/colors';
import { File } from '@/icons/file';

const Dropzone = ({
	onDropFile = () => null,
	defaultFiles = [],
	multiple = false,
	disabled = false,
	className = '',
	style,
	accept = 'image/*',
	variant = 'foreground',
	onChange = () => null,
	onFileDelete = () => null,
	size = 'sm',
	...properties
}: DropzoneProperties) => {
	const [files, setFiles] = useState<File[]>(defaultFiles)
	const reference = useRef<HTMLInputElement>(null)
	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			if (!multiple) {
				setFiles(acceptedFiles)
				onDropFile(acceptedFiles)
			}
			setFiles([...files, ...acceptedFiles])
			onDropFile(acceptedFiles)
		},
		[files, multiple, onDropFile]
	)
	useEffect(() => {
		if (reference.current && files.length === 0) {
			reference.current.value = ''
		}
	}, [files])

	return (
		<div className={cn(settings.maxWidth[size], className)} style={style}>
			<div
				className={cn(
					'no-scrollbar flex gap-2 overflow-scroll',
					files.length === 0 && 'hidden'
				)}>
				{files.map(
					file =>
						file && (
							<div key={file.name + file.type}>
								<div
									color={variant}
									className={cn(
										'mb-2 max-w-[200px] items-center justify-center rounded border-[1px] p-2 text-center',
										settings.colors[variant]
									)}
									onClick={() => {
										setFiles(files.filter(f => f.name !== file.name))
										onFileDelete(file, files.indexOf(file))
									}}>
									<File
										color={Color.white}
										width={45}
										height={45}
										className='mx-auto mb-2'
									/>
									<span className='block overflow-hidden text-ellipsis '>
										{file.name}
									</span>
								</div>
							</div>
						)
				)}
			</div>
			<div
				className={cn(
					'mt-2 flex cursor-pointer items-center justify-center rounded  border-[1px]  duration-200',
					settings.padding[size],
					settings.colors[variant]
				)}>
				<input
					multiple={multiple}
					type='file'
					ref={reference}
					className='h-full w-full cursor-pointer'
					disabled={disabled}
					accept={accept}
					onChange={event => {
						if (event.target.files) {
							onDrop([...event.target.files])
							onChange(event)
						}
					}}
					{...properties}
				/>
			</div>
		</div>
	)
}

export default Dropzone
