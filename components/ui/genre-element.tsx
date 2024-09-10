import { settings } from '@/components/ui/button/settings';
import { cn } from '@/utils';
import { InnerColor } from '@/utils/colors';
import Image from 'next/image';
import type { FC } from 'react';
import { getFileUrl } from '@/utils/get-file-url';

interface GenreElementProperties {
	svgUri: string
	title: string
	onClick?: () => void
}
const GenreElement: FC<GenreElementProperties> = ({
	svgUri,
	onClick,
	title
}) => (
	<button
		className={cn(
			'flex cursor-pointer items-center justify-center gap-2 rounded px-2 py-2 font-bold duration-200 ease-linear',
			settings.size.sm,
			settings.colors.muted
		)}
		onClick={onClick}>
		<span className='whitespace-nowrap text-sm text-gray-500'>{title}</span>

		<Image
			alt={title}
			src={getFileUrl(svgUri)}
			color={InnerColor.muted}
			width={settings.iconSize.sm}
			height={settings.iconSize.sm}
		/>
	</button>
)

export default GenreElement
