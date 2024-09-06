import { SVGProps } from 'react';

export const ChevronUp = (properties: SVGProps<SVGSVGElement>) => (
	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
			 strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-up" {...properties}>
		<path d="m18 15-6-6-6 6" />
	</svg>
)