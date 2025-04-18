import { HiOutlineDocumentText, HiViewGrid, HiViewList, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import Note from './Note';

const NoteList = ({ notes, view, setView, onEdit, onDelete, onShowDetails, currentPage, totalPages, onPageChange }) => {
    // Generate page numbers array for pagination
    const getPageNumbers = () => {
        const pageNumbers = [];
        const maxPagesToShow = 5;

        if (totalPages <= maxPagesToShow) {
            // Show all pages if total pages are less than or equal to maxPagesToShow
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            // Always show first page
            pageNumbers.push(1);

            // Calculate start and end of middle pages
            let startPage = Math.max(2, currentPage - 1);
            let endPage = Math.min(totalPages - 1, currentPage + 1);

            // Add ellipsis after first page if needed
            if (startPage > 2) {
                pageNumbers.push('...');
            }

            // Add middle pages
            for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(i);
            }

            // Add ellipsis before last page if needed
            if (endPage < totalPages - 1) {
                pageNumbers.push('...');
            }

            // Always show last page
            pageNumbers.push(totalPages);
        }

        return pageNumbers;
    };

    return (
        <div>
            <header className="flex flex-col sm:flex-row items-center justify-between mb-8">
                <div className="flex bg-white/50 dark:bg-gray-800/50 rounded-xl p-1 backdrop-blur-md shadow-sm mb-4 sm:mb-0">
                    <button
                        className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                            view === 'card' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50'
                        }`}
                        onClick={() => setView('card')}
                    >
                        <HiViewGrid className="text-lg" />
                        <span>Card View</span>
                    </button>
                    <button
                        className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                            view === 'list' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50'
                        }`}
                        onClick={() => setView('list')}
                    >
                        <HiViewList className="text-lg" />
                        <span>List View</span>
                    </button>
                </div>
            </header>

            <main className={view === 'card' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'w-full flex flex-col gap-4'}>
                {notes.length === 0 ? (
                    <div className="col-span-full flex flex-col items-center justify-center py-16 text-gray-400 dark:text-gray-500 bg-white/50 dark:bg-gray-800/50 rounded-3xl backdrop-blur-md">
                        <HiOutlineDocumentText className="text-7xl mb-4 opacity-50" />
                        <p className="text-lg font-medium">No notes yet. Create your first note!</p>
                    </div>
                ) : view === 'card' ? (
                    notes.map(note => <Note key={note.id} note={note} view={view} onEdit={onEdit} onDelete={onDelete} onShowDetails={onShowDetails} />)
                ) : (
                    <ul className="w-full flex flex-col gap-4">
                        {notes.map(note => (
                            <Note key={note.id} note={note} view={view} onEdit={onEdit} onDelete={onDelete} onShowDetails={onShowDetails} />
                        ))}
                    </ul>
                )}
            </main>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center mt-10">
                    <nav className="flex items-center gap-1 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md px-2 py-1.5 rounded-xl shadow-md">
                        <button
                            onClick={() => onPageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`p-2 rounded-lg transition-all ${
                                currentPage === 1
                                    ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                            aria-label="Previous page"
                        >
                            <HiChevronLeft className="w-5 h-5" />
                        </button>

                        {getPageNumbers().map((page, index) =>
                            page === '...' ? (
                                <span key={`ellipsis-${index}`} className="px-2 text-gray-500 dark:text-gray-400">
                                    ...
                                </span>
                            ) : (
                                <button
                                    key={`page-${page}`}
                                    onClick={() => onPageChange(page)}
                                    className={`min-w-[36px] h-9 flex items-center justify-center px-3 rounded-lg transition-all ${
                                        currentPage === page
                                            ? 'bg-indigo-600 text-white font-medium shadow-sm'
                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                    }`}
                                >
                                    {page}
                                </button>
                            ),
                        )}

                        <button
                            onClick={() => onPageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`p-2 rounded-lg transition-all ${
                                currentPage === totalPages
                                    ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                            aria-label="Next page"
                        >
                            <HiChevronRight className="w-5 h-5" />
                        </button>
                    </nav>
                </div>
            )}
        </div>
    );
};

export default NoteList;
