import React from 'react';
import { USERS } from '../constants';

const Header: React.FC = () => {
  return (
    <header className="shrink-0 flex flex-col bg-background-dark/80 backdrop-blur-md z-20 sticky top-0 border-b border-border-subtle">
      <div className="px-6 py-4 flex flex-col gap-3">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs">
          <a className="text-text-secondary hover:text-primary transition-colors font-medium focus:text-primary" href="#">Projects</a>
          <span aria-hidden="true" className="text-text-secondary/40 font-medium">/</span>
          <a className="text-text-secondary hover:text-primary transition-colors font-medium focus:text-primary" href="#">Mobile Banking App</a>
          <span aria-hidden="true" className="text-text-secondary/40 font-medium">/</span>
          <span aria-current="page" className="text-white font-medium">Board Overview</span>
        </nav>

        {/* Title and Actions */}
        <div className="flex justify-between items-end">
          <h1 className="text-white tracking-tight text-2xl font-bold leading-none">Kanban Board</h1>
          <div className="flex items-center gap-3">
            <div className="flex items-center -space-x-2 mr-2">
              <div className="w-8 h-8 rounded-full border-2 border-background-dark bg-gray-600 bg-cover bg-center" style={{backgroundImage: `url('${USERS.u1.avatarUrl}')`}} title={USERS.u1.name}></div>
              <div className="w-8 h-8 rounded-full border-2 border-background-dark bg-gray-600 bg-cover bg-center" style={{backgroundImage: `url('${USERS.u2.avatarUrl}')`}} title={USERS.u2.name}></div>
              <div className="w-8 h-8 rounded-full border-2 border-background-dark bg-surface-dark flex items-center justify-center text-xs font-bold text-white hover:bg-surface-dark-hover cursor-pointer transition-colors">+3</div>
            </div>
            <div className="h-8 w-[1px] bg-border-subtle mx-1"></div>
            <button className="h-10 px-5 bg-primary hover:bg-primary-hover text-background-dark font-extrabold text-sm rounded-lg flex items-center gap-2 transition-all shadow-glow hover:shadow-[0_0_20px_rgba(70,236,19,0.3)] focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-background-dark">
              <span aria-hidden="true" className="material-symbols-outlined text-[20px]">add</span>
              <span>Create Task</span>
            </button>
          </div>
        </div>
      </div>

      {/* Toolbar / Filters */}
      <div className="px-6 py-3 border-t border-border-subtle bg-surface-dark/30 flex items-center gap-4 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2 shrink-0">
          <div className="relative group">
            <button className="flex items-center gap-2 h-8 px-3 rounded-md bg-surface-dark border border-border-subtle text-white text-sm font-medium hover:border-primary/50 transition-colors">
              <span className="material-symbols-outlined text-[18px] text-text-secondary">person</span>
              <span>Assignee</span>
              <span className="material-symbols-outlined text-[16px] text-text-secondary">expand_more</span>
            </button>
          </div>
          <div className="relative group">
            <button className="flex items-center gap-2 h-8 px-3 rounded-md bg-surface-dark border border-border-subtle text-white text-sm font-medium hover:border-primary/50 transition-colors">
              <span className="material-symbols-outlined text-[18px] text-text-secondary">label</span>
              <span>Label</span>
              <span className="material-symbols-outlined text-[16px] text-text-secondary">expand_more</span>
            </button>
          </div>
        </div>
        
        <div className="h-5 w-[1px] bg-border-subtle shrink-0"></div>
        
        <div aria-label="Quick Filters" className="flex items-center gap-2 overflow-x-auto no-scrollbar" role="group">
          <button aria-pressed="true" className="shrink-0 h-7 pl-2 pr-3 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold hover:bg-primary/20 transition-colors flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">check</span>
            My Tasks
          </button>
          <button aria-pressed="false" className="shrink-0 h-7 px-3 rounded-full border border-border-subtle bg-transparent text-text-secondary text-xs font-medium hover:bg-surface-dark hover:text-white hover:border-white/20 transition-colors">
            Due this week
          </button>
          <button aria-pressed="false" className="shrink-0 h-7 px-3 rounded-full border border-border-subtle bg-transparent text-text-secondary text-xs font-medium hover:bg-surface-dark hover:text-white hover:border-white/20 transition-colors">
            Bug Reports
          </button>
          <button aria-label="Add custom filter" className="shrink-0 h-7 w-7 rounded-full border border-dashed border-border-subtle bg-transparent text-text-secondary hover:border-primary/50 hover:text-primary transition-colors flex items-center justify-center">
            <span className="material-symbols-outlined text-[16px]">add</span>
          </button>
        </div>

        <div className="ml-auto flex items-center gap-2 shrink-0 border-l border-border-subtle pl-4">
          <span className="text-xs text-text-secondary font-medium uppercase tracking-wider">View</span>
          <div className="flex bg-surface-dark rounded-lg p-0.5 border border-border-subtle">
            <button aria-label="Kanban View" aria-pressed="true" className="p-1.5 rounded-md bg-card-dark text-white shadow-sm">
              <span className="material-symbols-outlined text-[18px]">view_kanban</span>
            </button>
            <button aria-label="List View" aria-pressed="false" className="p-1.5 rounded-md text-text-secondary hover:text-white transition-colors">
              <span className="material-symbols-outlined text-[18px]">format_list_bulleted</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;