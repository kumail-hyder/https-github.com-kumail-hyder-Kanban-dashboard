import React from 'react';
import { Column, Task } from '../types';
import KanbanColumn from './KanbanColumn';

interface KanbanBoardProps {
  columns: Column[];
  onTaskClick: (task: Task) => void;
  onAddTask: (columnId: string, title: string) => void;
  onTaskMove: (taskId: string, targetColumnId: string) => void;
  onDragStart: (taskId: string) => void;
  onDragEnd: () => void;
  draggedTaskId: string | null;
  onRequestDelete: (taskId: string, columnId: string, title: string) => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ 
    columns, 
    onTaskClick, 
    onAddTask, 
    onTaskMove,
    onDragStart,
    onDragEnd,
    draggedTaskId,
    onRequestDelete
}) => {
  return (
    <div className="flex-1 overflow-x-auto overflow-y-hidden p-6 kanban-container bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-opacity-5" id="kanban-board">
      <div className="flex h-full gap-5 min-w-max pb-2">
        {columns.map(col => (
          <KanbanColumn 
            key={col.id} 
            column={col} 
            onTaskClick={onTaskClick} 
            onAddTask={onAddTask}
            onTaskMove={onTaskMove}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            isDraggingActive={!!draggedTaskId}
            onRequestDelete={onRequestDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;