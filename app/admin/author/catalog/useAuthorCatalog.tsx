import { QueryKeys } from '@/utils/query-keys';
import api from '@/services/api';
import { useQuery } from '@tanstack/react-query';

interface UseAuthorCatalogProperties {
	searchTerm: string
	page: number
}

export const UseAuthorCatalog = ({page =0,searchTerm }:UseAuthorCatalogProperties) => {
	const { data: authors } = useQuery({
		queryKey: QueryKeys.author.catalog.action(searchTerm, page),
		queryFn: () => api.author.catalog(searchTerm, +page),
		select: data => data.data,
		staleTime: 1000 * 60 * 60
	})

	return { authors }
}