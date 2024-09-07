'use client';

import Loader from '@/components/ui/loader/loader';
import { type FC, Suspense } from 'react';
import { CreateBookForm } from '@/pages/book/create/create-form/create-form';

const Page: FC = () => (
	<Suspense fallback={<Loader />}>
		<CreateBookForm />
	</Suspense>
)

export default Page
