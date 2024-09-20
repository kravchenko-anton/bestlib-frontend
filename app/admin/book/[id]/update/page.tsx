"use client";
import { UpdateBook } from '@/app/admin/book/[id]/update/update'
import { validateStringParameter } from '@/utils/validate-parameter'
import { useParams } from 'next/navigation'

const Page = () => {
	const parameters = useParams()
	const bookId = validateStringParameter(parameters?.id)

	return <UpdateBook bookId={bookId} />
}

export default Page