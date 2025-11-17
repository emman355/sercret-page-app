'use client'

import Button from '@/components/button'
import Card from '@/components/card'
import Typography from '@/components/typography'
import { useFriendRequest } from '@/context/FriendRequestContext'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required('Please enter a valid email or username')
    .email('Must be a valid email address')
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
      'Must be a valid email address'
    )
    .test(
      'email',
      'Must be a valid email or at least 3 characters',
      (value) => {
        if (!value) return false
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(value) || value.length >= 3
      }
    ),
})

type FormValues = {
  email: string
}

export default function AddFriend() {
  const { sendStatus, handleSubmit, errorMessage } = useFriendRequest()

  const {
    register,
    handleSubmit: rhfHandleSubmit,
    formState: { errors },
    reset,
    
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  })

  const onSubmit = async (data: FormValues) => {
    await handleSubmit(data.email)
    reset()
  }

  return (
    <Card>
      <form
        onSubmit={rhfHandleSubmit(onSubmit)}
        className="flex flex-col lg:flex-row lg:gap-10 gap-4"
      >
        <div className="w-full gap-2 flex flex-col">
          <label htmlFor="new-friend-username">
            <Typography variant="subtitle">Add Friend</Typography>
          </label>
          {(errors.email || errorMessage )&& (
            <span className="text-red-500 text-sm">
              {errors.email?.message || errorMessage}
            </span>
          )}
          <input
            id="new-friend-username"
            {...register('email')}
            className="w-full p-2 border text-gray-200 border-gray-700 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500"
            placeholder="Please enter email"
            disabled={sendStatus === 'loading'}
          />
        </div>

        <Button
          type="submit"
          className="bg-cyan-700 hover:bg-cyan-600 self-end w-full lg:w-xs"
          ariaLabel="Add friend request button"
          buttonText={sendStatus === 'loading' ? 'Sending...' : 'Send Request'}
          textStyle="text-white"
          disabled={sendStatus === 'loading'}
        />
      </form>
    </Card>
  )
}
