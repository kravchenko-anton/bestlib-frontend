/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'f005.backblazeb2.com',
				pathname: '**'
			},
			{
				protocol: 'https',
				hostname: 'localhost',
				pathname: '**'
			}
		]
	},
	env: {
		CLIENT_ID: process.env.CLIENT_ID,
		SERVER_URL: process.env.SERVER_URL
	}
};

export default nextConfig;
