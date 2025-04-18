import axios from 'axios';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { HiPlus } from 'react-icons/hi';

// Import Components
import Modal from './components/Modal';
import NoteDetail from './components/NoteDetail';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';

function App() {
    const [notes, setNotes] = useState([]);
    const [view, setView] = useState('card');
    const [isLoading, setIsLoading] = useState(false);

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalNotes, setTotalNotes] = useState(0);
    const [notesPerPage] = useState(8); // Notes per page

    // Modal and edit states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentNote, setCurrentNote] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);

    // Note detail state
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedNote, setSelectedNote] = useState(null);

    useEffect(() => {
        fetchNotes(currentPage);
    }, [currentPage]);

    const fetchNotes = async (page = 1) => {
        setIsLoading(true);
        try {
            // Using query parameters for pagination
            const res = await axios.get(`http://localhost:4000/api/notes`, {
                params: {
                    page,
                    limit: notesPerPage,
                },
            });

            // If backend returns paginated structure
            if (res.data.notes && res.data.pagination) {
                setNotes(res.data.notes);
                setTotalNotes(res.data.pagination.totalItems);
                setTotalPages(res.data.pagination.totalPages);
            } else {
                // Fallback if backend doesn't support pagination yet
                setNotes(res.data);

                // Calculate total pages based on the total number of notes
                const calculatedTotalPages = Math.ceil(res.data.length / notesPerPage);
                setTotalPages(calculatedTotalPages);
                setTotalNotes(res.data.length);

                // Client-side pagination
                const startIndex = (page - 1) * notesPerPage;
                const paginatedNotes = res.data.slice(startIndex, startIndex + notesPerPage);
                setNotes(paginatedNotes);
            }
        } catch (err) {
            toast.error('Failed to load notes');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePageChange = page => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleOpenModal = (editMode = false, note = null) => {
        setIsEditMode(editMode);
        setCurrentNote(note);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setCurrentNote(null);
        setIsEditMode(false);
    };

    const handleShowNoteDetails = note => {
        setSelectedNote(note);
        setIsDetailModalOpen(true);
    };

    const handleCloseDetailModal = () => {
        setIsDetailModalOpen(false);
        setSelectedNote(null);
    };

    const handleCreateNote = noteData => {
        setIsLoading(true);

        axios
            .post('http://localhost:4000/api/notes', noteData)
            .then(res => {
                // If we're on the first page, add the new note to the current list
                if (currentPage === 1) {
                    setNotes(prev => {
                        const updatedNotes = [res.data, ...prev];
                        // If adding this note would exceed notes per page, remove the last one
                        if (updatedNotes.length > notesPerPage) {
                            return updatedNotes.slice(0, notesPerPage);
                        }
                        return updatedNotes;
                    });
                } else {
                    // If not on first page, navigate to first page to see the new note
                    setCurrentPage(1);
                }

                // Update total notes count
                setTotalNotes(prev => prev + 1);

                // Recalculate total pages
                setTotalPages(Math.ceil((totalNotes + 1) / notesPerPage));

                toast.success('Note added successfully!');
                handleCloseModal();
            })
            .catch(err => {
                toast.error('Failed to add note');
                console.error(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const handleUpdateNote = noteData => {
        setIsLoading(true);

        axios
            .put(`http://localhost:4000/api/notes/${currentNote.id}`, noteData)
            .then(res => {
                setNotes(prev => prev.map(note => (note.id === currentNote.id ? res.data : note)));
                toast.success('Note updated successfully!');
                handleCloseModal();

                // Update the selected note if it's currently displayed in detail view
                if (selectedNote && selectedNote.id === currentNote.id) {
                    setSelectedNote(res.data);
                }
            })
            .catch(err => {
                toast.error('Failed to update note');
                console.error(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const handleDeleteNote = noteId => {
        axios
            .delete(`http://localhost:4000/api/notes/${noteId}`)
            .then(() => {
                setNotes(prev => prev.filter(note => note.id !== noteId));

                // Update total notes count
                setTotalNotes(prev => prev - 1);

                // Recalculate total pages
                const newTotalPages = Math.ceil((totalNotes - 1) / notesPerPage);
                setTotalPages(newTotalPages);

                // If the current page is now greater than the total pages, go to the last page
                if (currentPage > newTotalPages && newTotalPages > 0) {
                    setCurrentPage(newTotalPages);
                }

                // If there are no notes on the current page and we're not on the first page, go to previous page
                if (notes.length === 1 && currentPage > 1) {
                    setCurrentPage(currentPage - 1);
                } else if (notes.length === 1 && totalNotes > 1) {
                    // Refresh the current page to show new notes
                    fetchNotes(currentPage);
                }

                // If the deleted note is currently displayed in detail view, close the modal
                if (selectedNote && selectedNote.id === noteId) {
                    handleCloseDetailModal();
                }

                toast.success('Note deleted successfully!');
            })
            .catch(err => {
                toast.error('Failed to delete note');
                console.error(err);
            });
    };

    const handleNoteSubmit = noteData => {
        if (isEditMode && currentNote) {
            handleUpdateNote(noteData);
        } else {
            handleCreateNote(noteData);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-950 p-4 md:p-8 lg:p-12">
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 3000,
                    style: {
                        background: '#363636',
                        color: '#fff',
                        borderRadius: '12px',
                        padding: '16px',
                    },
                }}
            />

            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                        My Notes
                    </h1>
                </div>

                {/* Create Note Button */}
                <div className="flex justify-center mb-12">
                    <button
                        onClick={() => handleOpenModal(false)}
                        className="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg hover:shadow-indigo-500/30 transition-all duration-200 flex items-center justify-center gap-2"
                    >
                        <HiPlus className="text-lg" />
                        <span>Create New Note</span>
                    </button>
                </div>

                {/* Note List Component */}
                <NoteList
                    notes={notes}
                    view={view}
                    setView={setView}
                    onEdit={note => handleOpenModal(true, note)}
                    onDelete={handleDeleteNote}
                    onShowDetails={handleShowNoteDetails}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />

                {/* Loading indicator */}
                {isLoading && (
                    <div className="flex justify-center mt-8">
                        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                    </div>
                )}
            </div>

            {/* Note Form Modal */}
            <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={isEditMode ? 'Edit Note' : 'Create New Note'}>
                <NoteForm onSubmit={handleNoteSubmit} initialData={currentNote || { title: '', description: '' }} isEdit={isEditMode} isLoading={isLoading} />
            </Modal>

            {/* Note Detail Modal */}
            <NoteDetail
                note={selectedNote}
                isOpen={isDetailModalOpen}
                onClose={handleCloseDetailModal}
                onEdit={note => {
                    handleCloseDetailModal();
                    handleOpenModal(true, note);
                }}
                onDelete={handleDeleteNote}
            />
        </div>
    );
}

export default App;
