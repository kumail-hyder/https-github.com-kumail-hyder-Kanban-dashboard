import React, { useState } from 'react';
import { Task, Subtask, Tag, TagColor } from '../types';
import { USERS } from '../constants';

interface TaskModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateTask: (task: Task) => void;
  onRequestDelete: (taskId: string, columnId: string, title: string) => void;
}

const PRESET_TAGS: Tag[] = [
    { label: 'Bug', color: 'red' },
    { label: 'Feature', color: 'green' },
    { label: 'Design', color: 'purple' },
    { label: 'Research', color: 'blue' },
    { label: 'Urgent', color: 'orange' },
];

const COLORS: TagColor[] = ['blue', 'red', 'orange', 'indigo', 'purple', 'gray', 'green'];

const TaskModal: React.FC<TaskModalProps> = ({ task, isOpen, onClose, onUpdateTask, onRequestDelete }) => {
  const [isAddingSubtask, setIsAddingSubtask] = useState(false);
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('');
  const [activeDropdown, setActiveDropdown] = useState<'assignee' | 'priority' | 'labels' | null>(null);
  
  // Label State
  const [newLabelTitle, setNewLabelTitle] = useState('');
  const [selectedLabelColor, setSelectedLabelColor] = useState<TagColor>('blue');

  if (!isOpen || !task) return null;

  const getPriorityColor = (priority?: string) => {
    switch(priority) {
      case 'High': return 'text-red-400';
      case 'Medium': return 'text-yellow-400';
      case 'Low': return 'text-blue-400';
      default: return 'text-text-secondary';
    }
  };

  const getPriorityIcon = (priority?: string) => {
    switch(priority) {
      case 'High': return 'keyboard_double_arrow_up';
      case 'Medium': return 'drag_handle'; // or 'equal'
      case 'Low': return 'keyboard_arrow_down';
      default: return 'remove';
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onUpdateTask({ ...task, title: e.target.value });
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onUpdateTask({ ...task, description: e.target.value });
  };

  // Assignee Logic
  const handleAssigneeToggle = (userId: string) => {
    const user = USERS[userId];
    if (!user) return;

    const currentAssignees = task.assignees || [];
    const exists = currentAssignees.find(u => u.id === userId);
    
    let newAssignees;
    if (exists) {
        newAssignees = currentAssignees.filter(u => u.id !== userId);
    } else {
        newAssignees = [...currentAssignees, user];
    }
    onUpdateTask({ ...task, assignees: newAssignees });
  };

  // Priority Logic
  const handlePriorityChange = (priority: 'Low' | 'Medium' | 'High') => {
    onUpdateTask({ 
        ...task, 
        priority, 
        isHighPriority: priority === 'High' 
    });
    setActiveDropdown(null);
  };

  // Label Logic
  const handleRemoveTag = (label: string) => {
      const newTags = task.tags.filter(t => t.label !== label);
      onUpdateTask({ ...task, tags: newTags });
  };

  const handleAddTag = (e?: React.FormEvent) => {
      e?.preventDefault();
      if(!newLabelTitle.trim()) return;
      
      const title = newLabelTitle.trim();
      // Prevent duplicates
      if(task.tags.some(t => t.label.toLowerCase() === title.toLowerCase())) {
          setNewLabelTitle('');
          return;
      }

      const newTag: Tag = { label: title, color: selectedLabelColor };
      onUpdateTask({ ...task, tags: [...task.tags, newTag] });
      setNewLabelTitle('');
      setActiveDropdown(null);
  };

  const handleAddPresetTag = (tag: Tag) => {
     if(task.tags.some(t => t.label === tag.label)) return;
     onUpdateTask({ ...task, tags: [...task.tags, tag] });
     setActiveDropdown(null);
  };

  // Subtask Handlers
  const handleToggleSubtask = (subtaskId: string) => {
    const currentSubtasks = task.subtasks || [];
    const updatedSubtasks = currentSubtasks.map(st => 
        st.id === subtaskId ? { ...st, isCompleted: !st.isCompleted } : st
    );
    onUpdateTask({ ...task, subtasks: updatedSubtasks });
  };

  const handleDeleteSubtask = (subtaskId: string) => {
    const currentSubtasks = task.subtasks || [];
    const updatedSubtasks = currentSubtasks.filter(st => st.id !== subtaskId);
    onUpdateTask({ ...task, subtasks: updatedSubtasks });
  };

  const handleAddSubtaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubtaskTitle.trim()) {
        setIsAddingSubtask(false);
        return;
    }
    
    const newSubtask: Subtask = {
        id: `st-${Date.now()}`,
        title: newSubtaskTitle,
        isCompleted: false
    };
    
    const currentSubtasks = task.subtasks || [];
    onUpdateTask({ ...task, subtasks: [...currentSubtasks, newSubtask] });
    
    setNewSubtaskTitle('');
    setIsAddingSubtask(false); 
  };

  const completedSubtasks = (task.subtasks || []).filter(st => st.isCompleted).length;
  const totalSubtasks = (task.subtasks || []).length;

  return (
    <>
      <div aria-hidden="true" className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity" onClick={onClose}></div>
      <div 
        aria-labelledby="task-title" 
        aria-modal="true" 
        className="fixed inset-y-0 right-0 w-full md:w-[600px] bg-[#162214] border-l border-white/10 shadow-2xl z-50 flex flex-col transform transition-transform duration-300 ease-in-out animate-slide-in" 
        role="dialog"
      >
        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-[#162214] shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-text-secondary px-2 py-1 rounded bg-white/5 border border-white/5">KAN-342</span>
            <div className="h-4 w-[1px] bg-white/10"></div>
            <span className="text-xs text-text-secondary flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                In Progress
             </span>
          </div>
          <div className="flex items-center gap-2">
            <button aria-label="Share" className="p-2 text-text-secondary hover:text-white hover:bg-white/5 rounded transition-colors">
              <span className="material-symbols-outlined text-[20px]">share</span>
            </button>
            <div className="relative">
              <button aria-label="More options" className="p-2 text-text-secondary hover:text-white hover:bg-white/5 rounded transition-colors">
                <span className="material-symbols-outlined text-[20px]">more_vert</span>
              </button>
            </div>
            <button aria-label="Close panel" className="p-2 text-text-secondary hover:text-white hover:bg-white/5 rounded transition-colors ml-2" onClick={onClose}>
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto panel-scroll relative">
            {/* Click outside listener for dropdowns */}
            {activeDropdown && (
                <div 
                    className="fixed inset-0 z-20 cursor-default" 
                    onClick={() => setActiveDropdown(null)} 
                    aria-hidden="true"
                ></div>
            )}

            {task.coverImage && (
                <div className="h-32 w-full bg-cover bg-center relative group" style={{backgroundImage: `url('${task.coverImage}')`}}>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#162214] to-transparent"></div>
                    <button className="absolute bottom-3 right-3 bg-black/50 hover:bg-black/70 text-white text-xs px-2 py-1 rounded border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">Change Cover</button>
                </div>
            )}
            
            <div className={`px-8 ${task.coverImage ? '-mt-8' : 'mt-8'} relative z-10 pb-12`}>
                <div className="mb-8">
                    <label className="sr-only" htmlFor="task-title-input">Task Title</label>
                    <textarea 
                        className="w-full bg-transparent text-2xl font-bold text-white border-none focus:ring-0 p-0 resize-none placeholder-gray-500 leading-tight focus:bg-white/5 rounded -ml-2 pl-2 transition-colors" 
                        id="task-title-input" 
                        rows={1} 
                        value={task.title}
                        onChange={handleTitleChange}
                    ></textarea>
                    <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-text-secondary">in</span>
                        <button className="text-xs font-medium text-primary hover:underline">Epics / Onboarding Flow</button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-8">
                        {/* Description */}
                        <div className="group">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-sm font-bold text-text-secondary uppercase tracking-wider">Description</h3>
                                <button className="text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">Formatting</button>
                            </div>
                            <textarea 
                                className="w-full bg-white/5 text-gray-300 text-sm p-4 rounded-lg border border-transparent hover:border-white/10 focus:border-primary focus:ring-0 transition-colors min-h-[120px] resize-none leading-relaxed placeholder-text-secondary/50"
                                placeholder="Add a more detailed description..."
                                value={task.description || ''}
                                onChange={handleDescriptionChange}
                            ></textarea>
                        </div>

                        {/* Subtasks */}
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-sm font-bold text-text-secondary uppercase tracking-wider">Subtasks</h3>
                                <span className="text-xs text-text-secondary">{completedSubtasks}/{totalSubtasks} Done</span>
                            </div>
                            
                            {/* Progress Bar */}
                            <div className="w-full h-1 bg-white/10 rounded-full mb-4 overflow-hidden">
                                <div 
                                    className="h-full bg-primary transition-all duration-300" 
                                    style={{ width: totalSubtasks > 0 ? `${(completedSubtasks / totalSubtasks) * 100}%` : '0%' }}
                                ></div>
                            </div>

                            <div className="space-y-1">
                                {(task.subtasks || []).map(st => (
                                    <div key={st.id} className="flex items-center gap-3 p-2 rounded hover:bg-white/5 transition-colors group relative">
                                        <input 
                                            checked={st.isCompleted} 
                                            onChange={() => handleToggleSubtask(st.id)}
                                            className="mt-0.5 rounded border-white/20 bg-[#162214] text-primary focus:ring-primary focus:ring-offset-[#162214] cursor-pointer" 
                                            type="checkbox"
                                        />
                                        <span className={`text-sm transition-colors flex-1 ${st.isCompleted ? 'text-gray-400 line-through group-hover:text-gray-300' : 'text-white group-hover:text-white'}`}>
                                            {st.title}
                                        </span>
                                        <button 
                                            onClick={() => handleDeleteSubtask(st.id)}
                                            className="text-text-secondary hover:text-error opacity-0 group-hover:opacity-100 transition-opacity p-1"
                                            title="Delete subtask"
                                        >
                                            <span className="material-symbols-outlined text-[16px]">close</span>
                                        </button>
                                    </div>
                                ))}

                                {isAddingSubtask ? (
                                    <form onSubmit={handleAddSubtaskSubmit} className="flex items-center gap-2 p-2 animate-slide-in">
                                        <input 
                                            autoFocus
                                            className="flex-1 bg-surface-dark border border-primary/50 rounded px-2 py-1 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary"
                                            placeholder="What needs to be done?"
                                            value={newSubtaskTitle}
                                            onChange={(e) => setNewSubtaskTitle(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Escape') {
                                                    setIsAddingSubtask(false);
                                                    setNewSubtaskTitle('');
                                                }
                                            }}
                                        />
                                        <button type="submit" className="text-xs font-bold bg-primary text-background-dark px-2 py-1 rounded">Save</button>
                                        <button 
                                            type="button" 
                                            onClick={() => setIsAddingSubtask(false)}
                                            className="text-xs font-medium text-text-secondary hover:text-white px-2 py-1"
                                        >
                                            Cancel
                                        </button>
                                    </form>
                                ) : (
                                    <button 
                                        onClick={() => setIsAddingSubtask(true)}
                                        className="flex items-center gap-2 px-2 py-1.5 mt-2 text-xs font-bold text-text-secondary hover:text-primary transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-[16px]">add</span>
                                        Add Subtask
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Activity */}
                        <div>
                            <h3 className="text-sm font-bold text-text-secondary uppercase tracking-wider mb-4">Activity</h3>
                            <div className="flex gap-3 mb-6">
                                <div className="w-8 h-8 rounded-full bg-gray-600 shrink-0 bg-cover bg-center" style={{backgroundImage: `url('${USERS.u1.avatarUrl}')`}}></div>
                                <div className="flex-1 relative">
                                    <textarea className="w-full bg-[#0a110a] border border-white/10 rounded-lg p-3 text-sm text-white focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none h-20 placeholder:text-text-secondary/50" placeholder="Add a comment..."></textarea>
                                    <div className="absolute bottom-2 right-2 flex gap-1">
                                        <button className="p-1 text-text-secondary hover:text-white rounded"><span className="material-symbols-outlined text-[18px]">attach_file</span></button>
                                        <button className="bg-primary hover:bg-primary-hover text-[#0a110a] text-xs font-bold px-3 py-1 rounded transition-colors">Send</button>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4 animate-pulse">
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 rounded-full bg-white/10"></div>
                                    <div className="flex-1 space-y-2">
                                        <div className="h-3 w-24 bg-white/10 rounded"></div>
                                        <div className="h-16 w-full bg-white/5 rounded"></div>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 rounded-full bg-white/10"></div>
                                    <div className="flex-1 space-y-2">
                                        <div className="h-3 w-32 bg-white/10 rounded"></div>
                                        <div className="h-10 w-3/4 bg-white/5 rounded"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Metadata */}
                    <div className="space-y-6">
                        <div className="bg-[#0a110a]/50 p-4 rounded-xl border border-white/5 space-y-5">
                            {/* Assignee Selection */}
                            <div className="relative z-30">
                                <span className="text-xs font-bold text-text-secondary block mb-1.5 uppercase">Assignee</span>
                                <button 
                                    onClick={() => setActiveDropdown(activeDropdown === 'assignee' ? null : 'assignee')}
                                    className={`flex items-center gap-2 text-sm text-white hover:bg-white/5 p-1 -ml-1 pr-2 rounded transition-colors w-full text-left group ${activeDropdown === 'assignee' ? 'bg-white/5 ring-1 ring-primary/30' : ''}`}
                                >
                                    {task.assignees && task.assignees.length > 0 ? (
                                        <>
                                            <div className="w-6 h-6 rounded-full bg-gray-600 bg-cover bg-center ring-1 ring-white/20" style={{backgroundImage: `url('${task.assignees[0].avatarUrl}')`}}></div>
                                            <span>
                                                {task.assignees[0].name}
                                                {task.assignees.length > 1 && <span className="text-text-secondary ml-1 text-xs">(+{task.assignees.length - 1})</span>}
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center"><span className="material-symbols-outlined text-[14px]">person_add</span></div>
                                            <span className="text-text-secondary italic">Unassigned</span>
                                        </>
                                    )}
                                    <span className={`material-symbols-outlined text-[16px] text-text-secondary ml-auto transition-transform ${activeDropdown === 'assignee' ? 'rotate-180' : 'group-hover:opacity-100 opacity-0'}`}>expand_more</span>
                                </button>
                                
                                {activeDropdown === 'assignee' && (
                                    <div className="absolute top-full left-0 w-64 bg-[#1f2f1c] border border-white/10 rounded-lg shadow-2xl mt-1 overflow-hidden animate-slide-in flex flex-col max-h-64">
                                        <div className="p-2 border-b border-white/5 bg-[#162214]">
                                            <input className="w-full bg-black/20 border border-white/10 rounded text-xs p-1.5 text-white placeholder-text-secondary focus:border-primary focus:ring-0" placeholder="Search members..." autoFocus />
                                        </div>
                                        <div className="p-1 space-y-0.5 overflow-y-auto custom-scrollbar">
                                            {Object.values(USERS).map(user => {
                                                const isSelected = task.assignees?.some(u => u.id === user.id);
                                                return (
                                                    <button 
                                                        key={user.id}
                                                        onClick={() => handleAssigneeToggle(user.id)}
                                                        className={`flex items-center gap-3 w-full p-2 rounded hover:bg-white/5 transition-colors group ${isSelected ? 'bg-primary/5' : ''}`}
                                                    >
                                                        <div className="w-6 h-6 rounded-full bg-cover bg-center ring-1 ring-white/10" style={{backgroundImage: `url('${user.avatarUrl}')`}}></div>
                                                        <span className={`text-sm flex-1 text-left ${isSelected ? 'text-primary font-bold' : 'text-gray-300'}`}>{user.name}</span>
                                                        {isSelected && <span className="material-symbols-outlined text-[16px] text-primary">check</span>}
                                                    </button>
                                                )
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>
                            
                            {/* Priority Selection */}
                            <div className="relative z-20">
                                <span className="text-xs font-bold text-text-secondary block mb-1.5 uppercase">Priority</span>
                                <button 
                                    onClick={() => setActiveDropdown(activeDropdown === 'priority' ? null : 'priority')}
                                    className={`flex items-center gap-2 text-sm text-white hover:bg-white/5 p-1 -ml-1 pr-2 rounded transition-colors w-full text-left group ${activeDropdown === 'priority' ? 'bg-white/5 ring-1 ring-primary/30' : ''}`}
                                >
                                    <span className={`material-symbols-outlined text-[18px] ${getPriorityColor(task.priority)}`}>{getPriorityIcon(task.priority)}</span>
                                    <span>{task.priority || 'No Priority'}</span>
                                    <span className={`material-symbols-outlined text-[16px] text-text-secondary ml-auto transition-transform ${activeDropdown === 'priority' ? 'rotate-180' : 'group-hover:opacity-100 opacity-0'}`}>expand_more</span>
                                </button>

                                {activeDropdown === 'priority' && (
                                    <div className="absolute top-full left-0 w-48 bg-[#1f2f1c] border border-white/10 rounded-lg shadow-2xl mt-1 overflow-hidden animate-slide-in p-1">
                                        {(['High', 'Medium', 'Low'] as const).map(p => (
                                            <button
                                                key={p}
                                                onClick={() => handlePriorityChange(p)}
                                                className={`flex items-center gap-2 w-full p-2 rounded hover:bg-white/5 text-sm text-left ${task.priority === p ? 'bg-primary/5' : ''}`}
                                            >
                                                 <span className={`material-symbols-outlined text-[18px] ${getPriorityColor(p)}`}>{getPriorityIcon(p)}</span>
                                                 <span className={task.priority === p ? 'text-primary font-bold' : 'text-gray-300'}>{p}</span>
                                                 {task.priority === p && <span className="material-symbols-outlined text-[16px] text-primary ml-auto">check</span>}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Label Selection */}
                            <div className="relative z-10">
                                <span className="text-xs font-bold text-text-secondary block mb-1.5 uppercase">Labels</span>
                                <div className="flex flex-wrap gap-2">
                                    {task.tags.map(tag => (
                                         <span key={tag.label} className="px-2 py-1 rounded text-[11px] font-bold bg-orange-500/10 text-orange-300 border border-orange-500/20 flex items-center gap-1 group cursor-default hover:bg-orange-500/20 transition-colors">
                                            {tag.label}
                                            <button 
                                                onClick={() => handleRemoveTag(tag.label)}
                                                className="hover:text-white text-orange-300/50 transition-colors"
                                                aria-label={`Remove ${tag.label} label`}
                                            >
                                                <span className="material-symbols-outlined text-[12px]">close</span>
                                            </button>
                                        </span>
                                    ))}
                                    <button 
                                        onClick={() => setActiveDropdown(activeDropdown === 'labels' ? null : 'labels')}
                                        className={`text-[11px] font-bold text-text-secondary hover:text-white bg-white/5 hover:bg-white/10 border border-white/5 px-2 py-1 rounded transition-all flex items-center gap-1 ${activeDropdown === 'labels' ? 'ring-1 ring-primary/30 bg-white/10' : ''}`}
                                    >
                                        <span className="material-symbols-outlined text-[14px]">add</span> Add
                                    </button>
                                </div>
                                
                                {activeDropdown === 'labels' && (
                                    <div className="absolute top-full left-0 w-64 bg-[#1f2f1c] border border-white/10 rounded-lg shadow-2xl mt-2 overflow-hidden animate-slide-in flex flex-col z-50">
                                         <div className="p-3 border-b border-white/5">
                                            <form onSubmit={handleAddTag} className="flex flex-col gap-3">
                                                <input 
                                                    value={newLabelTitle} 
                                                    onChange={(e) => setNewLabelTitle(e.target.value)}
                                                    className="w-full bg-black/20 border border-white/10 rounded text-xs p-2 text-white placeholder-text-secondary focus:border-primary focus:ring-0" 
                                                    placeholder="New label name..." 
                                                    autoFocus 
                                                />
                                                <div className="flex gap-2 justify-between">
                                                    {COLORS.map(color => (
                                                        <button 
                                                            key={color}
                                                            type="button"
                                                            onClick={() => setSelectedLabelColor(color)}
                                                            className={`w-5 h-5 rounded-full ring-offset-2 ring-offset-[#1f2f1c] transition-all ${selectedLabelColor === color ? 'ring-2 ring-white scale-110' : 'hover:scale-110 opacity-70 hover:opacity-100'}`}
                                                            style={{backgroundColor: `var(--color-${color})`}} 
                                                            // Tailwind doesn't allow dynamic class construction like bg-${color}-500 easily without safelisting. 
                                                            // For simplicity in this env, I'll use inline styles or mapped classes if I had them. 
                                                            // I'll stick to a simple mapping for now.
                                                        >
                                                           <div className={`w-full h-full rounded-full ${
                                                               color === 'blue' ? 'bg-blue-500' : 
                                                               color === 'red' ? 'bg-red-500' : 
                                                               color === 'orange' ? 'bg-orange-500' : 
                                                               color === 'indigo' ? 'bg-indigo-500' : 
                                                               color === 'purple' ? 'bg-purple-500' : 
                                                               color === 'gray' ? 'bg-gray-500' : 
                                                               'bg-green-500'
                                                           }`}></div>
                                                        </button>
                                                    ))}
                                                </div>
                                                <button 
                                                    type="submit" 
                                                    disabled={!newLabelTitle.trim()}
                                                    className="w-full bg-primary hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed text-background-dark text-xs font-bold py-1.5 rounded"
                                                >
                                                    Create Label
                                                </button>
                                            </form>
                                         </div>
                                         <div className="p-1 max-h-40 overflow-y-auto custom-scrollbar">
                                            <p className="text-[10px] text-text-secondary font-bold uppercase px-2 py-1">Suggestions</p>
                                            {PRESET_TAGS.map(tag => {
                                                const isAdded = task.tags.some(t => t.label === tag.label);
                                                if (isAdded) return null;
                                                return (
                                                    <button 
                                                        key={tag.label}
                                                        onClick={() => handleAddPresetTag(tag)}
                                                        className="flex items-center gap-2 w-full p-2 rounded hover:bg-white/5 transition-colors group text-left"
                                                    >
                                                        <div className={`w-2 h-2 rounded-full ${
                                                               tag.color === 'blue' ? 'bg-blue-500' : 
                                                               tag.color === 'red' ? 'bg-red-500' : 
                                                               tag.color === 'orange' ? 'bg-orange-500' : 
                                                               tag.color === 'indigo' ? 'bg-indigo-500' : 
                                                               tag.color === 'purple' ? 'bg-purple-500' : 
                                                               tag.color === 'gray' ? 'bg-gray-500' : 
                                                               'bg-green-500'
                                                        }`}></div>
                                                        <span className="text-sm text-gray-300">{tag.label}</span>
                                                    </button>
                                                )
                                            })}
                                         </div>
                                    </div>
                                )}
                            </div>

                            <div>
                                <span className="text-xs font-bold text-text-secondary block mb-1.5 uppercase">Due Date</span>
                                <button className="flex items-center gap-2 text-sm text-white hover:bg-white/5 p-1 -ml-1 pr-2 rounded transition-colors w-full text-left group">
                                    <span className="material-symbols-outlined text-[18px] text-text-secondary">calendar_today</span>
                                    <span>{task.dueDate || 'Set date'}</span>
                                </button>
                            </div>
                            <div>
                                <span className="text-xs font-bold text-text-secondary block mb-1.5 uppercase">Story Points</span>
                                {task.storyPoints ? (
                                    <button className="flex items-center gap-2 text-sm text-white hover:bg-white/5 p-1 -ml-1 pr-2 rounded transition-colors w-full text-left group">
                                        <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold">{task.storyPoints}</div>
                                        <span>Points</span>
                                    </button>
                                ) : (
                                    <button className="text-sm text-text-secondary/50 italic hover:text-white hover:bg-white/5 p-1 -ml-1 rounded transition-colors w-full text-left">
                                        No estimate set
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2 pt-4 border-t border-white/5">
                            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-text-secondary hover:text-white hover:bg-white/5 rounded transition-colors text-left">
                                <span className="material-symbols-outlined text-[18px]">content_copy</span>
                                Duplicate Task
                            </button>
                             <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-text-secondary hover:text-white hover:bg-white/5 rounded transition-colors text-left">
                                <span className="material-symbols-outlined text-[18px]">link</span>
                                Copy Link
                            </button>
                             <button 
                                className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-error hover:bg-error/10 rounded transition-colors text-left"
                                onClick={() => onRequestDelete(task.id, task.columnId, task.title)}
                             >
                                <span className="material-symbols-outlined text-[18px]">delete</span>
                                Delete Task
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div className="p-4 bg-[#162214] border-t border-white/5 flex justify-between items-center shrink-0">
            <span className="text-xs text-text-secondary flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Saved just now
            </span>
            <div className="flex gap-3">
                <button className="px-4 py-2 text-sm font-bold text-text-secondary hover:text-white transition-colors" onClick={onClose}>Cancel</button>
                <button className="px-6 py-2 bg-primary hover:bg-primary-hover text-[#0a110a] text-sm font-extrabold rounded-lg shadow-glow transition-all" onClick={onClose}>Done</button>
            </div>
        </div>
      </div>
    </>
  );
};

export default TaskModal;