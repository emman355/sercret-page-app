import Button from '@/components/button'
import Typography from '@/components/typography'

interface EditSecretFormProps {
    inputMessage: string
    setInputMessage: (message: string) => void
    handleSaveSecret: (e: React.FormEvent) => void
    handleCancelEdit: (e: React.FormEvent) => void
    isSaving: boolean
    saveStatus: 'idle' | 'saving' | 'saved' | 'error'
}

export default function EditSecretForm({
    inputMessage,
    setInputMessage,
    handleSaveSecret,
    handleCancelEdit,
    isSaving,
    saveStatus
}: EditSecretFormProps) {
    return (
        <form onSubmit={handleSaveSecret} className='w-full flex flex-col gap-2'>
            <Typography variant='subtitle'>Edit Your Secret Message</Typography>
            <div className='flex-col space-y-4'>
                <textarea
                    id="secret-message"
                    rows={6}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    className="no-scrollbar bg-gray-900 w-full p-4 border border-gray-700 rounded-lg placeholder-gray-400 text-gray-200 resize-none"
                    placeholder="Type your primary secret message here (This will overwrite the existing one)..."
                />
                <div className='flex justify-between'>
                    <div className='flex gap-4'>
                        <Button
                            type="submit"
                            className='self-end bg-indigo-600 rounded-full hover:bg-indigo-700 disabled:bg-indigo-400 disabled:shadow-none'
                            ariaLabel={`Add friend request button`}
                            buttonText={isSaving ? 'Saving...' : 'Save Changes'}
                            textStyle='text-white'
                            disabled={isSaving}
                        />
                        <Button
                            type="button"
                            onClick={handleCancelEdit}
                            className='self-end bg-gray-200 hover:bg-gray-100 disabled:opacity-50'
                            ariaLabel={`Cancel friend request button`}
                            buttonText='Cancel'
                            textStyle='text-gray-700'
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
                        {saveStatus === 'error' && <Typography variant="small" className="text-red-600">Save Error</Typography>}
                        {saveStatus === 'saving' && <Typography variant="small" className="text-indigo-600">Saving...</Typography>}
                        {saveStatus === 'idle' && <Typography variant="small" className="text-gray-400">Editing</Typography>}
                    </div>
                </div>
            </div>
        </form>
    )
}
