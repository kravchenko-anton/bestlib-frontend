// Import env need for zod validation all env set up

import '../env-config';

import Providers from '@/providers/app-provider';
import { Space_Grotesk } from 'next/font/google';
import type { ReactNode } from 'react';
import './global.css';
import { appName } from '@/utils/constants/index';

export const metadata = {
	title: appName,
	description: 'Mobile app for reading books'
}

const font = Space_Grotesk({ subsets: ['latin'] })
const RootLayout = ({ children }: { children: ReactNode }) => (
	<html lang='en'>
		<head>
			<link rel='icon' href='/favicon.png' />
			<meta charSet='utf-8' />
			<title>${metadata.title}</title>
		</head>
		<body style={{ ...font.style }}>
			<Providers>{children}</Providers>
		</body>
	</html>
)

export default RootLayout
