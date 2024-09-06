'use client'

import { CreateBookForm } from '@/app/admin/book/create/_create-form/create-form'
import Loader from '@/components/ui/loader/loader'
import { Suspense, type FC } from 'react'

const Page: FC = () => (
	<Suspense fallback={<Loader />}>
		<CreateBookForm />
	</Suspense>
)

export default Page
