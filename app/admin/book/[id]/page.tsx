"use client";
import { useParams } from 'next/navigation';
import { validateStringParameter } from '@/utils/validate-parameter';
import { OverviewBook } from '@/pages/book/overview/overview';

const Page = () => {
	const parameters = useParams()
	const id = validateStringParameter(parameters?.id)

	return <OverviewBook id={id} />
}
export default Page