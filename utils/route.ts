export const secureRoutes = {
	bookCatalogRoute: '/admin/book' + '/catalog',
	bookCreateRoute: '/admin/book' + '/create',
	bookUpdateRoute: (id: string) => '/admin/book/' + id + '/update',
	bookOverviewRoute: (id: string) => '/admin/book/' + id,
	userCatalogRoute: '/admin/user' + '/catalog',
	authorCatalogRoute: '/admin/author' + '/catalog',
}

export const publicRoutes = {
	login: '/login',
	dashboard: '/admin/dashboard',
}
