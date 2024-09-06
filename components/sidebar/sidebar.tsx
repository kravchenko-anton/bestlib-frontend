import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useAuthStore } from '@/pages/login/auth/auth-store';
import { cn } from '@/utils';
import { tapAnimation } from '@/utils/framer-animation';
import { motion } from 'framer-motion';
import { Color } from '@/utils/colors';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import type { FC } from 'react';
import { User } from '@/icons/user';
import { Book } from '@/icons/book';
import { Logout } from '@/icons/logout';
import { MoreHorizontal } from '@/icons/more-horizontal';
import { secureRoutes } from '@/utils/route';

export const iconsList = [
	{ icon: User, link: secureRoutes.userCatalogRoute, name: 'Users' },
	{ icon: Book, link: secureRoutes.bookCatalogRoute, name: 'Books' }
]

export const Sidebar: FC = () => {
	const { logout } = useAuthStore(state => ({
		logout: state.logout
	}))
	const activePath = usePathname()
	const router = useRouter()
	return (
		<div className='z-0 h-full w-full justify-center duration-100 ease-linear xl:fixed xl:w-14 xl:flex-col'>
			<div className='bg-foreground border-bordered flex w-full items-center justify-between border-b-2 p-1.5 py-2 text-sm xl:h-full xl:flex-col xl:border-r-2 xl:py-6'>
				<button
					className='flex cursor-pointer items-center text-2xl font-bold xl:mb-5'
					type='button'>
					<motion.div className='rounded-full bg-white p-2' {...tapAnimation}>
						<Book className='text-black' height={20} width={20} />
					</motion.div>
				</button>
				<ul className='hidden xl:block'>
					{iconsList.map(icon => (
						<motion.div className='w-full' key={icon.link} {...tapAnimation}>
							<Link
								href={icon.link}
								className={cn(
									'mb-4 flex h-9 w-9 items-center justify-center rounded-md transition-colors hover:text-white md:h-8 md:w-8',
									activePath === icon.link && 'bg-bordered text-white'
								)}>
								<icon.icon width={22} height={22} />
								<span className='sr-only'>{icon.name}</span>
							</Link>
						</motion.div>
					))}
				</ul>
				<div
					className='text-danger hidden cursor-pointer  items-center duration-100 ease-linear xl:mt-auto xl:flex  xl:gap-3'
					onClick={logout}>
					<Logout width={22} height={22} />
				</div>

				<div className='flex items-center justify-center  xl:hidden'>
					<DropdownMenu>
						<DropdownMenuTrigger className='focus-visible:outline-0'>
							<MoreHorizontal
								height={35}
								width={35}
								color={Color.white}
								className='bg-muted  border-bordered rounded-md border-[1px] p-1.5'
							/>
						</DropdownMenuTrigger>
						<DropdownMenuContent align='end'>
							{iconsList.map(icon => (
								<DropdownMenuItem
									key={icon.link}
									onClick={() => {
										router.push(icon.link)
									}}>
									<icon.icon width={22} height={22} className='mr-2' />
									{icon.name}
								</DropdownMenuItem>
							))}
							<DropdownMenuSeparator />
							<DropdownMenuItem onClick={logout}>
								<Logout width={22} height={22} className='mr-2' />
								Logout
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</div>
	)
}

export default Sidebar
