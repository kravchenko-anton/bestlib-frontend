'use client';
import { BookCatalogTable } from '@/pages/book/catalog/table/book-catalog-table';
import type { NextPageProps } from '@/types/global';
import { validateNumberParameter, validateStringParameter } from '@/utils/validate-parameter';
import type { FC } from 'react';
import { UseBookCatalog } from '@/pages/book/catalog/useBookCatalog';

const Page: FC<NextPageProps> = ({ searchParams }) => {
	const searchTerm = validateStringParameter(searchParams?.searchTerm)
	const page = validateNumberParameter(searchParams?.page)
	const {books} = UseBookCatalog({ page, searchTerm })
	return <BookCatalogTable books={books} page={+page} searchTerm={searchTerm} />
}
export default Page
