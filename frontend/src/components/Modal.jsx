import { useEffect, useRef } from 'react';
import { HiX } from 'react-icons/hi';

const Modal = ({ isOpen, onClose, title, children, size = 'default' }) => {
    const modalRef = useRef(null);

    useEffect(() => {
        const handleEscape = e => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        const handleClickOutside = e => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.addEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'auto';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    // Define size classes based on the size prop
    const sizeClasses = {
        small: 'max-w-sm',
        default: 'max-w-md',
        large: 'max-w-lg',
        xlarge: 'max-w-xl',
        xxlarge: 'max-w-2xl',
        full: 'max-w-4xl',
    };

    const maxHeightClass = size === 'full' ? 'max-h-[85vh]' : 'max-h-[90vh]';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
            <div
                ref={modalRef}
                className={`bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full ${sizeClasses[size]} ${maxHeightClass} border border-gray-200 dark:border-gray-700 transform transition-all overflow-hidden flex flex-col`}
                style={{
                    animation: 'modal-appear 0.3s ease-out forwards',
                }}
            >
                <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 p-5">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none">
                        <HiX className="h-5 w-5" />
                    </button>
                </div>
                <div className="p-6 overflow-y-auto flex-grow">{children}</div>
            </div>
            <style jsx>{`
                @keyframes modal-appear {
                    from {
                        opacity: 0;
                        transform: scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
            `}</style>
        </div>
    );
};

export default Modal;
