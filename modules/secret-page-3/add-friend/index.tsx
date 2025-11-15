'use client'

import Button from '@/components/button'
import Card from '@/components/card'
import Typography from '@/components/typography'
import { useFriendRequest } from '@/context/FriendRequestContext'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup.object().shape({
  usernameOrEmail: yup
    .string()
    .trim()
    .required('Please enter a valid email or username')
    .min(3, 'Must be at least 3 characters'),
})

type FormValues = {
  usernameOrEmail: string
}

export default function AddFriend() {
  const { sendStatus, handleSubmit } = useFriendRequest()

  const {
    register,
    handleSubmit: rhfHandleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data: FormValues) => {
    await handleSubmit(data.usernameOrEmail)
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
          {errors.usernameOrEmail && (
            <span className="text-red-500 text-sm">
              {errors.usernameOrEmail.message}
            </span>
          )}
          <input
            id="new-friend-username"
            {...register('usernameOrEmail')}
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
