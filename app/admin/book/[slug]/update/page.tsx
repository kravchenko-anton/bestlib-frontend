"use client";
import { UpdateBook } from '@/pages/book/update/update';
import { useParams } from 'next/navigation';
import { validateStringParameter } from '@/utils/validate-parameter';

const Page = () => {
	const parameters = useParams()
	const bookId = validateStringParameter(parameters?.id)

	return <UpdateBook bookId={bookId} />
}

export default Page