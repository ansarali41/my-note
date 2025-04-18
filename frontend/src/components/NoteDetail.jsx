import { HiCalendar, HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi';
import Modal from './Modal';

const NoteDetail = ({ note, isOpen, onClose, onEdit, onDelete }) => {
    if (!note) return null;

    const formattedDate = new Date(note.updatedAt).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const formattedTime = new Date(note.updatedAt).toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit',
    });

    const handleEdit = () => {
        onEdit(note);
        onClose();
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this note?')) {
            onDelete(note.id);
            onClose();
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Note Details" size="large">
            <div className="flex flex-col space-y-6">
                {/* Note title */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white break-words">{note.title}</h2>
                    <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
                        <HiCalendar className="mr-1" />
                        <span>
                            Last updated on {formattedDate} at {formattedTime}
                        </span>
                    </div>
                </div>

                {/* Note content */}
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5 min-h-[200px] max-h-[50vh] overflow-y-auto">
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap break-words leading-relaxed">{note.description}</p>
                </div>

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                        onClick={handleEdit}
                        className="flex-1 flex items-center justify-center gap-2 bg-indigo-50 dark:bg-indigo-900/30 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 text-indigo-700 dark:text-indigo-400 font-medium py-3 px-4 rounded-xl transition-colors"
                    >
                        <HiOutlinePencil className="text-lg" />
                        <span>Edit Note</span>
                    </button>
                    <button
                        onClick={handleDelete}
                        className="flex-1 flex items-center justify-center gap-2 bg-red-50 dark:bg-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/50 text-red-700 dark:text-red-400 font-medium py-3 px-4 rounded-xl transition-colors"
                    >
                        <HiOutlineTrash className="text-lg" />
                        <span>Delete Note</span>
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default NoteDetail;
