'use client';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

type AuthInputs = {
  email: string;
  password: string;
};

type CustomFormProps = {
  isLoading?: boolean;
  error?: string | null;
  onSubmit: (data: AuthInputs) => void;
};

// Validation schema
const schema = yup.object({
  email: yup.string().email('Please enter a valid email address').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
}).required();

const CustomForm = ({ isLoading = false, error, onSubmit }: CustomFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthInputs>({
    resolver: yupResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Error Message */}
      {error && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-lg border border-red-300 bg-red-50 p-4 shadow-sm"
        >
          <svg
            className="h-5 w-5 text-red-600 mt-0.5 shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01M12 5a7 7 0 100 14a7 7 0 000-14z"
            />
          </svg>
          <div className="flex-1">
            <p className="text-sm font-semibold text-red-800">Authentication Error</p>
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      )}

      {/* Email Input */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email address
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="Please enter your email"
          {...register('email')}
          className="mt-1 text-gray-700 block w-full px-3 py-2 border border-gray-400 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.email && (
          <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Password Input */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          placeholder="Please enter your password"
          {...register('password')}
          className="mt-1 text-gray-700 block w-full px-3 py-2 border border-gray-400 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.password && (
          <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm shadow-gray-400 text-sm font-medium text-white bg-indigo-800"
        >
          {isLoading ? 'Processing...' : 'Submit'}
        </button>
      </div>
    </form>
  );
};

export default CustomForm;
