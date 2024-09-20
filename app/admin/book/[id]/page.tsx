"use client";
import { OverviewBook } from '@/app/admin/book/[id]/overview'
import { validateStringParameter } from '@/utils/validate-parameter'
import { useParams } from 'next/navigation'

const Page = () => {
	const parameters = useParams()
	const id = validateStringParameter(parameters?.id)

	return <OverviewBook id={id} />
}
export default Page