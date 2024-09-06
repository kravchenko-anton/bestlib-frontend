'use client';
import { BookCatalogTable } from '@/app/admin/book/catalog/book-catalog-table';
import api from '@/services/api';
import type { NextPageProps } from '@/types/global';
import { validateNumberParameter, validateStringParameter } from '@/utils/validate-parameter';
import { useQuery } from '@tanstack/react-query';
import type { FC } from 'react';
import { QueryKeys } from '@/utils/query-keys';

const Page: FC<NextPageProps> = ({ searchParams }) => {
	const searchTerm = validateStringParameter(searchParams?.searchTerm)
	const page = validateNumberParameter(searchParams?.page)
	const { data: books } = useQuery({
		queryKey: QueryKeys.book.catalog.action(searchTerm, page),
		queryFn: () => api.book.catalog(searchTerm, +page),
		select: data => data.data,
		// 1 hour
		staleTime: 1000 * 60 * 60
	})

	return <BookCatalogTable books={books} page={+page} searchTerm={searchTerm} />
}
export default Page
