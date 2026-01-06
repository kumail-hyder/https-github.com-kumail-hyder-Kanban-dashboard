import React from 'react';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  taskTitle: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ isOpen, taskTitle, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity" 
        onClick={onCancel}
        aria-hidden="true"
      />

      {/* Modal */}
      <div 
        className="relative bg-[#162214] border border-white/10 rounded-xl shadow-2xl w-full max-w-sm overflow-hidden transform transition-all animate-slide-in"
        role="dialog"
        aria-labelledby="delete-title"
        aria-modal="true"
      >
        <div className="p-6 text-center">
           <div className="w-12 h-12 rounded-full bg-error/10 flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-error text-[24px]">warning</span>
           </div>
           
           <h3 id="delete-title" className="text-lg font-bold text-white mb-2">Delete Task?</h3>
           <p className="text-text-secondary text-sm mb-6 leading-relaxed">
             Are you sure you want to delete <span className="text-white font-medium">"{taskTitle}"</span>? This action cannot be undone.
           </p>

           <div className="flex gap-3 justify-center">
              <button 
                onClick={onCancel}
                className="px-4 py-2 text-sm font-bold text-text-secondary hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={onConfirm}
                className="px-4 py-2 text-sm font-bold bg-error hover:bg-red-600 text-white rounded-lg shadow-lg transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-error focus:ring-offset-[#162214]"
              >
                Delete
              </button>
           </div>
        </div>
        
        {/* Decorative error line at top */}
        <div className="absolute top-0 left-0 w-full h-1 bg-error"></div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;