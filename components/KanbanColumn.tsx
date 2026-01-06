import React, { useState } from 'react';
import { Column, Task } from '../types';
import TaskCard from './TaskCard';
import { AnimatePresence, motion } from 'framer-motion';

interface KanbanColumnProps {
  column: Column;
  onTaskClick: (task: Task) => void;
  onAddTask: (columnId: string, title: string) => void;
  onTaskMove: (taskId: string, targetColumnId: string) => void;
  onDragStart: (taskId: string) => void;
  onDragEnd: () => void;
  isDraggingActive: boolean;
  onRequestDelete: (taskId: string, columnId: string, title: string) => void;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ 
    column, 
    onTaskClick, 
    onAddTask,
    onTaskMove,
    onDragStart,
    onDragEnd,
    isDraggingActive,
    onRequestDelete
}) => {
  const [isAdding, setIsAdding] = useState(column.id === 'col-2'); 
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);

  const handleAddTask = (e: React.FormEvent) => {
      e.preventDefault();
      if(newTaskTitle.trim()) {
          onAddTask(column.id, newTaskTitle);
          setNewTaskTitle('');
      }
  }

  const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      if (!isDragOver) setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
      // Prevent flickering when dragging over children
      if (e.currentTarget.contains(e.relatedTarget as Node)) {
          return;
      }
      setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      const taskId = e.dataTransfer.getData('text/plain');
      if (taskId) {
          onTaskMove(taskId, column.id);
      }
      onDragEnd();
  };

  const renderContent = () => {
    if (column.id === 'col-4' && column.tasks.length === 0) {
       return (
        <div className={`p-4 flex-1 overflow-y-auto flex flex-col items-center justify-center text-center transition-opacity duration-200 ${isDragOver ? 'opacity-100' : 'opacity-60'}`}>
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 border transition-colors ${isDragOver ? 'bg-primary/10 border-primary/30 text-primary' : 'bg-surface-dark border-border-subtle text-text-secondary'}`}>
                <span className="material-symbols-outlined text-[32px]">assignment_turned_in</span>
            </div>
            <h4 className={`font-medium text-sm mb-1 transition-colors ${isDragOver ? 'text-primary' : 'text-white'}`}>
                {isDragOver ? 'Drop to add task' : 'No tasks yet'}
            </h4>
            <p className="text-text-secondary text-xs max-w-[200px]">
                {isDragOver ? 'Release mouse to move task here' : 'This column is empty. Great job or time to add more?'}
            </p>
            {!isDragOver && (
                <button className="mt-4 text-primary text-xs font-bold hover:underline">
                    Create a test task
                </button>
            )}
        </div>
       )
    }

    return (
        <div className="p-2 flex-1 overflow-y-auto task-list flex flex-col gap-2.5 relative">
            {/* Visual overlay for drop zone if needed, but styling parent is usually cleaner */}
            <AnimatePresence mode='popLayout'>
                {column.tasks.map(task => (
                    <TaskCard 
                        key={task.id} 
                        task={task} 
                        onClick={onTaskClick}
                        onDragStart={(e) => {
                            e.dataTransfer.setData('text/plain', task.id);
                            e.dataTransfer.effectAllowed = 'move';
                            onDragStart(task.id);
                        }}
                        onRequestDelete={onRequestDelete}
                    />
                ))}
            </AnimatePresence>
            
            {column.id === 'col-2' && (
                 <form className="mx-2 mb-2 p-3 bg-surface-dark border border-primary/40 rounded-lg shadow-lg flex flex-col gap-3 animate-slide-in ring-1 ring-primary/10" onSubmit={handleAddTask}>
                    <label className="sr-only" htmlFor="quick-add-task">New Task Title</label>
                    <textarea 
                        autoFocus 
                        className="w-full bg-transparent text-sm text-white placeholder-text-secondary/50 border-none focus:ring-0 resize-none p-0 leading-relaxed min-h-[40px]" 
                        id="quick-add-task" 
                        placeholder="Enter task title..." 
                        rows={2}
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleAddTask(e as any);
                            }
                        }}
                    ></textarea>
                    <div className="flex items-center justify-between border-t border-white/5 pt-2">
                        <div className="flex items-center gap-1">
                            <button className="p-1.5 text-text-secondary hover:text-white hover:bg-white/5 rounded transition-colors" title="Set Priority" type="button">
                                <span className="material-symbols-outlined text-[18px]">flag</span>
                            </button>
                            <button className="p-1.5 text-text-secondary hover:text-white hover:bg-white/5 rounded transition-colors" title="Assign Member" type="button">
                                <span className="material-symbols-outlined text-[18px]">person</span>
                            </button>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="text-xs font-bold text-text-secondary hover:text-white px-2 py-1.5 rounded hover:bg-white/5 transition-colors" type="button" onClick={() => setNewTaskTitle('')}>Cancel</button>
                            <button className="text-xs font-extrabold bg-primary hover:bg-primary-hover text-background-dark px-3 py-1.5 rounded shadow-glow transition-all flex items-center gap-1 group" type="submit">
                                <span>Add</span>
                                <span className="material-symbols-outlined text-[14px] group-hover:translate-x-0.5 transition-transform">assignment_return</span>
                            </button>
                        </div>
                    </div>
                </form>
            )}

            {column.id === 'col-5' && (
                <div className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center transition-all cursor-pointer group
                    ${isDragOver 
                        ? 'border-primary/50 bg-primary/5 text-primary scale-[1.02]' 
                        : 'border-white/10 text-text-secondary hover:bg-white/5 hover:border-primary/30'}
                `}>
                    <span aria-hidden="true" className={`material-symbols-outlined text-[24px] mb-2 transition-transform ${isDragOver ? 'scale-110' : 'opacity-50 group-hover:scale-110'}`}>input</span>
                    <span className={`text-xs font-medium ${isDragOver ? '' : 'group-hover:text-primary'}`}>Drop to Handoff</span>
                </div>
            )}
        </div>
    );
  };

  return (
    <section 
        aria-labelledby={`${column.id}-title`} 
        className={`flex flex-col w-[340px] h-full rounded-xl border flex-shrink-0 transition-all duration-300
            ${isDragOver 
                ? 'bg-surface-dark/60 border-primary/40 ring-1 ring-primary/20 shadow-[0_0_25px_rgba(70,236,19,0.05)] scale-[1.01] z-10' 
                : isDraggingActive 
                    ? 'bg-[#0f1810]/40 border-border-subtle/30 opacity-80' 
                    : 'bg-[#0f1810]/50 border-border-subtle/50'}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
    >
      <header className={`p-3 pb-2 flex items-center justify-between border-b rounded-t-xl sticky top-0 z-10 backdrop-blur-sm transition-colors duration-300
         ${isDragOver ? 'border-primary/20 bg-[#162214]' : 'border-border-subtle/50 bg-[#0f1810]/90'}
      `}>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${column.colorClass}`}></div>
          <h3 className={`font-bold text-sm tracking-wide transition-colors ${isDragOver ? 'text-white' : 'text-white'}`} id={`${column.id}-title`}>{column.title}</h3>
          {column.id === 'col-3' ? (
              <span aria-label={`${column.taskCount} tasks`} className={`text-[10px] px-2 py-0.5 rounded-md font-mono border transition-colors ${isDragOver ? 'bg-primary/10 text-primary border-primary/20' : 'bg-surface-dark text-text-secondary border-border-subtle'}`}>{column.taskCount}</span>
          ) : (
              <span aria-label={`${column.taskCount} tasks`} className={`text-[10px] px-2 py-0.5 rounded-md font-mono border transition-colors ${isDragOver ? 'bg-primary/10 text-primary border-primary/20' : 'bg-surface-dark text-text-secondary border-border-subtle'}`}>{column.taskCount}</span>
          )}
        </div>
        <button aria-label="Column options" className="text-text-secondary hover:text-white transition-colors rounded p-1 hover:bg-surface-dark">
          <span className="material-symbols-outlined text-[18px]">more_horiz</span>
        </button>
      </header>

      {renderContent()}

      {column.id !== 'col-2' && (
          <button className={`mx-2 mb-2 py-2 flex items-center justify-center gap-2 rounded-lg border border-dashed transition-all text-xs font-bold uppercase tracking-wide focus:ring-2 focus:ring-primary focus:border-transparent group
            ${isDragOver 
                ? 'border-primary/40 text-primary bg-primary/5' 
                : 'border-border-subtle text-text-secondary hover:border-primary/50 hover:text-primary hover:bg-surface-dark'}
          `}>
            <span aria-hidden="true" className="material-symbols-outlined text-[16px]">add</span>
            Add Item
         </button>
      )}
    </section>
  );
};

export default KanbanColumn;