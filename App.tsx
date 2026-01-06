import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import KanbanBoard from './components/KanbanBoard';
import TaskModal from './components/TaskModal';
import Toast from './components/Toast';
import DeleteConfirmationModal from './components/DeleteConfirmationModal';
import { INITIAL_COLUMNS } from './constants';
import { Column, Task } from './types';

const App: React.FC = () => {
  const [columns, setColumns] = useState<Column[]>(INITIAL_COLUMNS);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);
  const [toastConfig, setToastConfig] = useState<{show: boolean, msg: string, sub?: string}>({
    show: true, // Show initially as per screenshot
    msg: "Task Added Successfully",
    sub: "\"Create User Personas\" added to Definition."
  });

  // Delete flow state
  const [deleteConfig, setDeleteConfig] = useState<{isOpen: boolean, taskId: string, columnId: string, title: string} | null>(null);

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedTask(null), 300); // Wait for animation
  };

  const handleAddTask = (columnId: string, title: string) => {
      const newTask: Task = {
          id: `new-${Date.now()}`,
          title,
          columnId,
          tags: [],
          assignees: []
      };

      setColumns(prev => prev.map(col => {
          if (col.id === columnId) {
              return {
                  ...col,
                  tasks: [...col.tasks, newTask],
                  taskCount: col.taskCount + 1
              };
          }
          return col;
      }));

      setToastConfig({
          show: true,
          msg: "Task Added Successfully",
          sub: `"${title}" added to ${columns.find(c => c.id === columnId)?.title}.`
      });

      setTimeout(() => {
          setToastConfig(prev => ({...prev, show: false}));
      }, 3000);
  };

  const handleUpdateTask = (updatedTask: Task) => {
      setColumns(prev => prev.map(col => {
          if (col.id === updatedTask.columnId) {
              return {
                  ...col,
                  tasks: col.tasks.map(t => t.id === updatedTask.id ? updatedTask : t)
              };
          }
          return col;
      }));
      // Update the selected task so the modal reflects the changes immediately
      if (selectedTask && selectedTask.id === updatedTask.id) {
          setSelectedTask(updatedTask);
      }
  };

  // Triggered from Card or Modal
  const handleRequestDelete = (taskId: string, columnId: string, title: string) => {
      setDeleteConfig({ isOpen: true, taskId, columnId, title });
  };

  // Triggered from Delete Confirmation Modal
  const handleConfirmDelete = () => {
      if (!deleteConfig) return;
      const { taskId, columnId } = deleteConfig;

      setColumns(prev => prev.map(col => {
          if (col.id === columnId) {
              return {
                  ...col,
                  tasks: col.tasks.filter(t => t.id !== taskId),
                  taskCount: col.taskCount - 1
              };
          }
          return col;
      }));
      
      if (selectedTask?.id === taskId) {
          handleCloseModal();
      }

      setDeleteConfig(null);
  };

  const handleCancelDelete = () => {
      setDeleteConfig(null);
  };

  const handleDragStart = (taskId: string) => {
      setDraggedTaskId(taskId);
  };

  const handleDragEnd = () => {
      setDraggedTaskId(null);
  };

  const handleTaskMove = (taskId: string, targetColumnId: string) => {
      setColumns(prev => {
          const newColumns = prev.map(col => ({...col, tasks: [...col.tasks]})); // Deep copy tasks arrays
          
          let taskToMove: Task | undefined;
          
          // Find and remove task
          for (const col of newColumns) {
              const taskIdx = col.tasks.findIndex(t => t.id === taskId);
              if (taskIdx > -1) {
                  taskToMove = col.tasks[taskIdx];
                  col.tasks.splice(taskIdx, 1);
                  col.taskCount = col.tasks.length;
                  break;
              }
          }

          // Add to target
          if (taskToMove) {
              const targetCol = newColumns.find(c => c.id === targetColumnId);
              if (targetCol) {
                  // If moving to same column, append to end (simplification for demo)
                  // In a real app we'd calculate index based on drop position
                  taskToMove.columnId = targetColumnId;
                  targetCol.tasks.push(taskToMove);
                  targetCol.taskCount = targetCol.tasks.length;
              }
          }
          
          return newColumns;
      });
  };

  return (
    <div className="flex h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-text-primary overflow-hidden selection:bg-primary/30">
      <Sidebar />
      
      <main className="flex-1 flex flex-col h-full min-w-0 bg-background-light dark:bg-background-dark relative">
        <Header />
        
        <KanbanBoard 
          columns={columns} 
          onTaskClick={handleTaskClick} 
          onAddTask={handleAddTask}
          onTaskMove={handleTaskMove}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          draggedTaskId={draggedTaskId}
          onRequestDelete={handleRequestDelete}
        />

        <Toast 
            isVisible={toastConfig.show} 
            message={toastConfig.msg} 
            subMessage={toastConfig.sub} 
            onClose={() => setToastConfig(prev => ({...prev, show: false}))}
        />
      </main>

      <TaskModal 
        task={selectedTask} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
        onUpdateTask={handleUpdateTask}
        onRequestDelete={handleRequestDelete}
      />

      <DeleteConfirmationModal 
        isOpen={!!deleteConfig?.isOpen}
        taskTitle={deleteConfig?.title || ''}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};

export default App;