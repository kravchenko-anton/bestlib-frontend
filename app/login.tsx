import { useAuthStore } from '@/app/auth/auth-store'
import type { AuthDtoType } from '@/app/auth/auth.types'
import { Button, Field } from '@/components/ui'
import { Mail } from '@/icons/mail'
import { Password } from '@/icons/password'
import { AuthSchema } from '@/validation/auth.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { type CredentialResponse, GoogleLogin } from '@react-oauth/google'

import { useForm } from 'react-hook-form'

export const Login = () => {
	const { mailLogin, googleLogin } = useAuthStore(state => ({
		mailLogin: state.mailLogin,
		googleLogin: state.googleLogin
	}))
	const { handleSubmit, control } = useForm<AuthDtoType>({
		mode: 'onSubmit',
		resolver: zodResolver(AuthSchema)
	})
	const onSubmit = (data: AuthDtoType) => {
		mailLogin(data)
	}

	const onGoogleLoginSuccess = async (tokenResponse: CredentialResponse) => {
		if (!tokenResponse.credential) return
		googleLogin({
			socialId: tokenResponse.credential
		})
	}

	return (
		<div className='flex h-screen w-screen items-center justify-center'>
			<div className='bg-foreground  w-[390px] items-center justify-center rounded p-8'>
				<h1 className='mb-4 text-center text-3xl text-white'>Sign in</h1>
				<Field
					icon={Mail}
					variant='muted'
					name='email'
					control={control}
					type='email'
					placeholder='Enter your email'
				/>
				<Field
					icon={Password}
					variant='muted'
					control={control}
					className='my-3'
					name='password'
					type='password'
					placeholder='Enter your password'
				/>
				<div className='flex h-8 w-full items-center justify-center gap-2'>
					<Button
						fullWidth
						size='sm'
						className='h-full'
						variant='primary'
						onClick={handleSubmit(onSubmit)}>
						Login
					</Button>
					<GoogleLogin
						useOneTap
						size='medium'
						shape={'rectangular'}
						theme='outline'
						onSuccess={onGoogleLoginSuccess}
					/>
				</div>
			</div>
		</div>
	)
}


