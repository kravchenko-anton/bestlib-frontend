'use client';

import { Login } from '@/app/login'
import { loginRoute } from '@/providers/secure-route'

const Page = () => <Login/>

export default loginRoute(Page)