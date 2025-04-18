import { useEffect, useState } from 'react';
import { HiPencil, HiPlus } from 'react-icons/hi';

const NoteForm = ({ onSubmit, initialData = { title: '', description: '' }, isEdit = false, isLoading }) => {
    const [note, setNote] = useState(initialData);

    // Constants for character limits
    const TITLE_MAX_LENGTH = 100;
    const DESCRIPTION_MAX_LENGTH = 1000;

    useEffect(() => {
        setNote(initialData);
    }, [initialData]);

    const handleChange = e => {
        const { name, value } = e.target;

        // Enforce character limits
        if (
            (name === 'title' && value.length <= TITLE_MAX_LENGTH) ||
            (name === 'description' && value.length <= DESCRIPTION_MAX_LENGTH) ||
            (name !== 'title' && name !== 'description')
        ) {
            setNote(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = e => {
        e.preventDefault();
        onSubmit(note);
    };

    // Calculate remaining characters
    const titleCharactersRemaining = TITLE_MAX_LENGTH - (note.title?.length || 0);
    const descriptionCharactersRemaining = DESCRIPTION_MAX_LENGTH - (note.description?.length || 0);

    // Determine if we're getting close to the limit
    const isTitleNearLimit = titleCharactersRemaining < 20;
    const isDescriptionNearLimit = descriptionCharactersRemaining < 100;

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
            <div className="flex-1 w-full">
                <div className="flex justify-between items-center mb-1.5">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Title
                    </label>
                    <span className={`text-xs font-medium ${isTitleNearLimit ? 'text-amber-600 dark:text-amber-400' : 'text-gray-500 dark:text-gray-400'}`}>
                        {titleCharactersRemaining} characters remaining
                    </span>
                </div>
                <input
                    id="title"
                    name="title"
                    value={note.title}
                    onChange={handleChange}
                    placeholder="Enter a note title..."
                    className={`block w-full rounded-xl bg-gray-50 dark:bg-gray-900 px-4 py-3 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ${
                        isTitleNearLimit ? 'border-amber-300 dark:border-amber-600' : ''
                    }`}
                    required
                    maxLength={TITLE_MAX_LENGTH}
                />
            </div>

            <div className="flex-1 w-full">
                <div className="flex justify-between items-center mb-1.5">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Description
                    </label>
                    <span className={`text-xs font-medium ${isDescriptionNearLimit ? 'text-amber-600 dark:text-amber-400' : 'text-gray-500 dark:text-gray-400'}`}>
                        {descriptionCharactersRemaining} characters remaining
                    </span>
                </div>
                <textarea
                    id="description"
                    name="description"
                    value={note.description}
                    onChange={handleChange}
                    placeholder="Write your note here..."
                    rows={5}
                    className={`block w-full rounded-xl bg-gray-50 dark:bg-gray-900 px-4 py-3 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ${
                        isDescriptionNearLimit ? 'border-amber-300 dark:border-amber-600' : ''
                    }`}
                    required
                    maxLength={DESCRIPTION_MAX_LENGTH}
                />
            </div>

            <button
                type="submit"
                className="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg hover:shadow-indigo-500/30 transition-all duration-200 flex items-center justify-center gap-2 w-full"
                disabled={isLoading}
            >
                {isLoading ? (
                    'Saving...'
                ) : (
                    <>
                        {isEdit ? (
                            <>
                                <HiPencil className="text-lg" />
                                <span>Update Note</span>
                            </>
                        ) : (
                            <>
                                <HiPlus className="text-lg" />
                                <span>Add Note</span>
                            </>
                        )}
                    </>
                )}
            </button>
        </form>
    );
};

export default NoteForm;
