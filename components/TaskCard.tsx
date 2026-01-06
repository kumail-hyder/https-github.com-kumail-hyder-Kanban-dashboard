import React, { useState } from 'react';
import { Task, TagColor } from '../types';
import { motion } from 'framer-motion';

interface TaskCardProps {
  task: Task;
  onClick: (task: Task) => void;
  onDragStart: (e: React.DragEvent) => void;
  onRequestDelete: (taskId: string, columnId: string, title: string) => void;
}

const getTagStyles = (color: TagColor) => {
  switch (color) {
    case 'blue': return 'bg-blue-500/10 text-blue-300 border-blue-500/20';
    case 'red': return 'bg-red-500/10 text-red-300 border-red-500/20';
    case 'orange': return 'bg-orange-500/10 text-orange-300 border-orange-500/20';
    case 'indigo': return 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20';
    case 'purple': return 'bg-purple-500/10 text-purple-300 border-purple-500/20';
    case 'gray': return 'bg-gray-500/10 text-gray-300 border-gray-500/20';
    case 'green': return 'bg-green-500/10 text-green-300 border-green-500/20';
    default: return 'bg-gray-500/10 text-gray-300 border-gray-500/20';
  }
};

const TaskCard: React.FC<TaskCardProps> = ({ task, onClick, onDragStart, onRequestDelete }) => {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <motion.article 
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: isDragging ? 0.5 : 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={`bg-card-dark p-3.5 rounded-lg cursor-grab active:cursor-grabbing hover:ring-1 hover:ring-primary/40 transition-shadow group shadow-card relative border border-border-subtle hover:border-primary/20 select-none ${task.coverImage ? 'ring-1 ring-primary border-primary/20' : ''} ${isDragging ? 'border-primary/50 opacity-50 ring-2 ring-primary/20' : ''}`}
      tabIndex={0}
      onClick={() => onClick(task)}
      draggable={true}
      onDragStart={(e) => {
          setIsDragging(true);
          onDragStart(e as unknown as React.DragEvent);
      }}
      onDragEnd={() => setIsDragging(false)}
    >
        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-surface-dark rounded-full p-0.5 border border-white/10 shadow-lg z-20">
          <button 
            aria-label="Edit task" 
            className="p-1 text-text-secondary hover:text-primary rounded-full hover:bg-white/10 transition-colors"
            onClick={(e) => {
                e.stopPropagation();
                onClick(task);
            }}
          >
            <span className="material-symbols-outlined text-[14px]">edit</span>
          </button>
          <button 
            aria-label="Delete task" 
            className="p-1 text-text-secondary hover:text-error rounded-full hover:bg-white/10 transition-colors"
            onClick={(e) => {
                e.stopPropagation();
                onRequestDelete(task.id, task.columnId, task.title);
            }}
          >
            <span className="material-symbols-outlined text-[14px]">delete</span>
          </button>
        </div>

      <div className="flex flex-wrap gap-2 mb-2.5">
        {task.tags.map((tag, i) => (
           <span key={i} className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getTagStyles(tag.color)}`}>
             {tag.label}
           </span>
        ))}
      </div>

      <h4 className={`text-gray-100 font-semibold text-sm mb-1 leading-snug ${task.coverImage ? 'pr-8 text-white' : ''}`}>
        {task.title}
      </h4>

      {task.description && (
        <p className="text-text-secondary text-xs mb-3 line-clamp-2 leading-relaxed">
          {task.description}
        </p>
      )}

      {task.coverImage && (
        <div className={`w-full h-20 mb-3 rounded overflow-hidden relative border border-white/5 ${!task.description ? 'mt-3' : ''}`}>
          <div className="absolute inset-0 bg-cover bg-center opacity-80 hover:opacity-100 transition-opacity" style={{backgroundImage: `url('${task.coverImage}')`}}></div>
        </div>
      )}

      <div className={`flex items-center justify-between text-text-secondary ${!task.coverImage && !task.description ? 'mt-auto pt-2.5' : 'pt-2.5'} border-t border-white/5`}>
        <div className="flex items-center -space-x-1.5">
          {task.assignees.map(user => (
            <div key={user.id} aria-label={`Assignee: ${user.name}`} className="w-5 h-5 rounded-full ring-2 ring-card-dark bg-gray-600 bg-cover bg-center" role="img" style={{backgroundImage: `url('${user.avatarUrl}')`}}></div>
          ))}
        </div>
        
        <div className="flex items-center gap-3 text-[11px] font-medium">
          {task.attachments && (
             <div className="flex items-center gap-1" title={`${task.attachments} attachments`}>
               <span aria-hidden="true" className="material-symbols-outlined text-[14px]">{task.attachments === 1 ? 'attach_file' : 'attachment'}</span>
               <span>{typeof task.attachments === 'number' ? task.attachments : 'Zip'}</span>
             </div>
          )}
          
          {task.commentsCount && (
            <div className="flex items-center gap-1">
              <span aria-hidden="true" className="material-symbols-outlined text-[14px]">chat_bubble</span>
              <span>{task.commentsCount}</span>
            </div>
          )}

          {task.dueDate && (
             <div className={`flex items-center gap-1 ${task.isHighPriority ? 'text-primary' : ''}`} title={`Due ${task.dueDate}`}>
               <span aria-hidden="true" className="material-symbols-outlined text-[14px]">{task.isHighPriority ? 'schedule' : 'calendar_today'}</span>
               <span>{task.dueDate}</span>
             </div>
          )}
        </div>
      </div>
    </motion.article>
  );
};

export default TaskCard;