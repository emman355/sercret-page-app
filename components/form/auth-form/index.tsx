'use client'
import { FcGoogle } from "react-icons/fc";
import { useSupabaseUser } from '@/hooks/useSupabaseUser';
import CustomForm from "./CustomForm";
import Card from "@/components/card";
import Typography from "@/components/typography";

type AuthInputs = {
  email: string;
  password: string;
};

const AuthForm = () => {
	const {
		error,
		isLoginView,
		setIsLoginView,
		isLoading,
		handleAuthSubmit,
		handleOAuthLogin,
	} = useSupabaseUser();

	return (
		<Card className="w-full max-w-lg bg-gray-100 rounded-xl p-8 space-y-6 shadow-lg shadow-gray-950">

			{/* Header */}
			<Typography variant="h2" className="font-extrabold text-center text-gray-950">
				{isLoginView ? 'Login' : 'Create an Account'}
			</Typography>

			{/* Toggle Button */}
			<Typography variant="body" className="text-center text-gray-700">
				{isLoginView ? "Don't have an account?" : "Already have an account?"}{' '}
				<button
					onClick={() => setIsLoginView(!isLoginView)}
					className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200 focus:outline-none"
				>
					{isLoginView ? 'Register here' : 'Sign in'}
				</button>
			</Typography>

			{/* OAuth Buttons */}
			<div className="flex justify-center">
				<button
					onClick={() => handleOAuthLogin('google')}
					className="lg:max-w-9/12 flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white"
					disabled={isLoading}
				>
					<FcGoogle size={14} className='mr-2' />
					<Typography variant="small" color="text-gray-700">{isLoginView ? 'Sign in with Google' : 'Register with Google'}</Typography>
				</button>
			</div>

			{/* Separator */}
			<div className="relative">
				<div className="absolute inset-0 flex items-center" aria-hidden="true">
					<div className="w-full border-t border-gray-400" />
				</div>
				<div className="relative flex justify-center text-sm">
					<Typography variant="small" className="px-2 bg-gray-100 text-gray-500">
						Or continue with
					</Typography>
				</div>
			</div>

			<CustomForm
				isLoading={isLoading}
				error={error}
				onSubmit={({ email, password }: AuthInputs) => handleAuthSubmit({ email, password })}
			/>
		</Card>
	);
};

export default AuthForm;
