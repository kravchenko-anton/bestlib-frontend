'use client';
import { BookCatalogTable } from '@/app/admin/book/catalog/table/book-catalog-table'
import { UseBookCatalog } from '@/app/admin/book/catalog/useBookCatalog'
import type { NextPageProps } from '@/types/global'
import { validateNumberParameter, validateStringParameter } from '@/utils/validate-parameter'
import type { FC } from 'react'

const Page: FC<NextPageProps> = ({ searchParams }) => {
	const searchTerm = validateStringParameter(searchParams?.searchTerm)
	const page = validateNumberParameter(searchParams?.page)
	const {books} = UseBookCatalog({ page, searchTerm })
	return <BookCatalogTable books={books} page={+page} searchTerm={searchTerm} />
}
export default Page
