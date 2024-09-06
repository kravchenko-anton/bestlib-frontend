import type { SVGProps } from 'react';
import { LineColorType } from '@/utils/colors';

export interface LoaderProperties extends SVGProps<SVGSVGElement> {
	color?: LineColorType
	width?: number
	height?: number
}
