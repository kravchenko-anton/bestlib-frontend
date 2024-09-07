export const secureRoutes = {
	bookCatalogRoute: '/admin/book' + '/catalog',
	bookCreateRoute: '/admin/book' + '/create',
	bookUpdateRoute: (slug: string) => '/admin/book/' + slug + '/update',
	bookOverviewRoute: (slug: string) => '/admin/book/' + slug,
	userCatalogRoute: '/admin/user' + '/catalog',
	authorCatalogRoute: '/admin/author' + '/catalog',
}

export const publicRoutes = {
	login: '/login',
	dashboard: '/admin/dashboard',
}
