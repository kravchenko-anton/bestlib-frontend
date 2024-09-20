'use client';
import { AuthorCatalogTable } from '@/app/admin/author/catalog/table/author-catalog-table'
import { UseAuthorCatalog } from '@/app/admin/author/catalog/useAuthorCatalog'
import type { NextPageProps } from '@/types/global'
import { validateNumberParameter, validateStringParameter } from '@/utils/validate-parameter'
import type { FC } from 'react'

const Page: FC<NextPageProps> = ({ searchParams }) => {
	const searchTerm = validateStringParameter(searchParams?.searchTerm)
	const page = validateNumberParameter(searchParams?.page)
	const {authors} = UseAuthorCatalog({ page, searchTerm })
	return <AuthorCatalogTable authors={authors} page={+page} searchTerm={searchTerm} />
}
export default Page
