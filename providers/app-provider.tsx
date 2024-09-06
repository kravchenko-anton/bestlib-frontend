'use client';
import { Toaster } from '@/components/ui/sonner';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { PropsWithChildren } from 'react';

const Providers = ({ children }: PropsWithChildren) => {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 1000 * 60 * 5,
				gcTime: 1000 * 60 * 60 * 24
			}
		}
	})

	return (
		<QueryClientProvider client={queryClient}>
			<GoogleOAuthProvider clientId={String(process.env.CLIENT_ID)}>
				{children}
				<Toaster />
			</GoogleOAuthProvider>
		</QueryClientProvider>
	)
}

export default Providers
