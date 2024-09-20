import { QueryKeys } from '@/utils/query-keys';
import api from '@/services/api';
import { useQuery } from '@tanstack/react-query';

interface UseBookCatalogProperties {
	searchTerm: string
	page: number
}

export const UseBookCatalog = ({page =0,searchTerm }:UseBookCatalogProperties) => {
	const { data: books } = useQuery({
		queryKey: QueryKeys.book.catalog.action(searchTerm, page),
		queryFn: () => api.book.catalog(searchTerm, +page),
		select: data => data.data,
		// 1 hour
		staleTime: 1000 * 60 * 60
	})

	return { books }
}