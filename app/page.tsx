'use client';

import { Login } from '@/pages/login/login'
import { loginRoute } from '@/providers/secure-route'

const Page = () => <Login/>

export default loginRoute(Page)