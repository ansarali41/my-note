import { HiOutlineDocumentText, HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi';

const Note = ({ note, onEdit, onDelete, view, onShowDetails }) => {
    const formattedDate = new Date(note.updatedAt).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });

    const handleEdit = e => {
        e.stopPropagation(); // Prevent triggering click on the note
        onEdit(note);
    };

    const handleDelete = e => {
        e.stopPropagation(); // Prevent triggering click on the note
        // Add confirmation before delete
        if (window.confirm('Are you sure you want to delete this note?')) {
            onDelete(note.id);
        }
    };

    const handleReadMore = e => {
        e.stopPropagation(); // Prevent triggering click on the note
        onShowDetails(note);
    };

    const handleNoteClick = () => {
        onShowDetails(note);
    };

    // Determine if text needs to be truncated
    const needsTruncation = (text, charLimit = 120) => {
        return text.length > charLimit;
    };

    if (view === 'card') {
        const isLongDescription = needsTruncation(note.description, 150);

        return (
            <div
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col min-h-[200px] backdrop-blur relative group cursor-pointer"
                onClick={handleNoteClick}
            >
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-indigo-100 dark:bg-indigo-900/50 p-2.5 rounded-xl">
                        <HiOutlineDocumentText className="text-indigo-600 dark:text-indigo-400 text-xl" />
                    </div>
                    <h2 className="font-bold text-lg text-gray-900 dark:text-white truncate hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" title={note.title}>
                        {note.title}
                    </h2>
                </div>
                <div className="flex-1 relative">
                    <div className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{note.description}</div>
                    {isLongDescription && (
                        <button
                            onClick={handleReadMore}
                            className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium flex items-center mt-1"
                        >
                            Read more
                        </button>
                    )}
                </div>
                <div className="border-t border-gray-100 dark:border-gray-700 pt-3 mt-auto flex items-center justify-between">
                    <span className="text-xs text-gray-400 dark:text-gray-500">{formattedDate}</span>
                    <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                            onClick={handleEdit}
                            className="p-1.5 rounded-md text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
                            title="Edit note"
                        >
                            <HiOutlinePencil className="w-4 h-4" />
                        </button>
                        <button
                            onClick={handleDelete}
                            className="p-1.5 rounded-md text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30"
                            title="Delete note"
                        >
                            <HiOutlineTrash className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // List view
    return (
        <li
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md hover:shadow-lg transition-all p-5 flex items-center gap-5 hover:bg-gray-50 dark:hover:bg-gray-700/80 group cursor-pointer"
            onClick={handleNoteClick}
        >
            <div className="bg-indigo-100 dark:bg-indigo-900/50 p-3 rounded-xl">
                <HiOutlineDocumentText className="text-indigo-600 dark:text-indigo-400 text-xl" />
            </div>
            <div className="flex-1 min-w-0">
                <h2 className="font-semibold text-lg text-gray-900 dark:text-white truncate" title={note.title}>
                    {note.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 truncate mt-1" title={note.description}>
                    {note.description}
                </p>
            </div>
            <div className="flex items-center">
                <span className="hidden sm:block text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap bg-gray-100 dark:bg-gray-700 px-3 py-1.5 rounded-full mr-2">
                    {formattedDate}
                </span>
                <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={handleEdit}
                        className="p-1.5 rounded-md text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
                        title="Edit note"
                    >
                        <HiOutlinePencil className="w-4 h-4" />
                    </button>
                    <button
                        onClick={handleDelete}
                        className="p-1.5 rounded-md text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30"
                        title="Delete note"
                    >
                        <HiOutlineTrash className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </li>
    );
};

export default Note;
