import { SVGProps } from 'react';

export const HardDriveUpload = (properties: SVGProps<SVGSVGElement>) => (
	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
			 strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-hard-drive-upload" {...properties}>
		<rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
		<line x1="12" y1="14" x2="12" y2="20" />
		<polyline points="9 17 12 14 15 17" />
		<line x1="12" y1="4" x2="12" y2="14" />
	</svg>
)