'use client';

import { CreateBookForm } from '@/app/admin/book/create/create-form'
import Loader from '@/components/ui/loader/loader'
import { type FC, Suspense } from 'react'

const Page: FC = () => (
	<Suspense fallback={<Loader />}>
		<CreateBookForm />
	</Suspense>
)

export default Page
