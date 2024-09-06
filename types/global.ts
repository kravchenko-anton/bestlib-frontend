export interface NextPageProps<SlugType = string> {
	params: { slug: SlugType }
	searchParams?: { [key: string]: string | string[] | undefined }
}
