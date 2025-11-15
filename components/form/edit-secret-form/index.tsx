import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import Button from '@/components/button'
import Typography from '@/components/typography'

interface EditSecretFormProps {
    defaultMessage?: string
    handleSaveSecret: (message: string) => Promise<void>
    handleCancelEdit: () => void
    isSaving: boolean
    saveStatus: 'idle' | 'saving' | 'saved' | 'error'
    placeholder: string
}

// ✅ Yup schema
const schema = yup.object().shape({
    secretMessage: yup
        .string()
        .required('Secret message is required')
        .min(5, 'Message must be at least 5 characters')
})

export default function EditSecretForm({
    handleSaveSecret,
    handleCancelEdit,
    isSaving,
    saveStatus,
    placeholder,
    defaultMessage = ''
}: EditSecretFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<{ secretMessage: string }>({
        resolver: yupResolver(schema),
        defaultValues: { secretMessage: defaultMessage }
    })

    const onSubmit = (data: { secretMessage: string }) => {
        handleSaveSecret(data.secretMessage)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-2">
            <Typography variant="subtitle">Edit Your Secret Message</Typography>
            {/* Validation error */}
            {errors.secretMessage && (
                <Typography variant="small" className="text-red-500">
                    {errors.secretMessage.message}
                </Typography>
            )}
            <div className="flex-col space-y-4">
                <div>
                    <textarea
                        id="secret-message"
                        rows={6}
                        {...register('secretMessage')}
                        className="no-scrollbar bg-gray-900 w-full p-4 border border-gray-700 rounded-lg placeholder-gray-400 text-gray-200 resize-none focus:outline-none focus:ring-gray-500 focus:border-gray-500"
                        placeholder={placeholder}
                    />

                </div>

                <div className="flex justify-between">
                    <div className="flex gap-4">
                        <Button
                            type="submit"
                            className="self-end bg-indigo-600 rounded-full hover:bg-indigo-700 disabled:bg-indigo-400 disabled:shadow-none"
                            ariaLabel="Save secret message button"
                            buttonText={isSaving ? 'Saving...' : 'Save Changes'}
                            textStyle="text-white"
                            disabled={isSaving}
                        />
                        <Button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();   // prevent bubbling to Card
                                handleCancelEdit();
                            }}
                            className="self-end bg-gray-200 hover:bg-gray-100 disabled:opacity-50"
                            ariaLabel="Cancel edit button"
                            buttonText="Cancel"
                            textStyle="text-gray-700"
                            disabled={isSaving}
                        />
                    </div>
                    {/* Status Indicator */}
                    <div>
                        {saveStatus === 'saved' && (
                            <Typography variant="small" className="text-green-600 flex items-center animate-pulse-once">
                                Saved!
                            </Typography>
                        )}
                        {saveStatus === 'error' && (
                            <Typography variant="small" className="text-red-600">
                                Save Error
                            </Typography>
                        )}
                        {saveStatus === 'saving' && (
                            <Typography variant="small" className="text-indigo-600">
                                Saving...
                            </Typography>
                        )}
                        {saveStatus === 'idle' && (
                            <Typography variant="small" className="text-gray-400">
                                Editing
                            </Typography>
                        )}
                    </div>
                </div>
            </div>
        </form>
    )
}
