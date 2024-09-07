"use client";
import { UpdateBook } from '@/pages/book/update/update';
import { useParams } from 'next/navigation';
import { validateStringParameter } from '@/utils/validate-parameter';

const Page = () => {
	const parameters = useParams()
	const id = validateStringParameter(parameters?.id)

	return <UpdateBook bookId={id} />
}
export default Page