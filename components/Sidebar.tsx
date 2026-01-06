import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <aside aria-label="Primary Filter Panel" className="w-72 flex flex-col border-r border-border-subtle bg-[#0e160d] hidden md:flex shrink-0 h-full">
      <div className="p-6 pb-2">
        <div className="flex items-center gap-3 mb-6">
          <div aria-label="Project Logo" className="bg-center bg-no-repeat aspect-square bg-cover rounded-xl size-10 border border-border-subtle shadow-inner" role="img" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB-lkW7_5yrfq_VzA5DLEr4IKMjIo8Wn952VyAQgafUduAW90914RO-6KRLPxYCphJRkQmw5yHz92SIDw04lZPOfvZU5956cf721WYBcQ_JvHd0bI_ytmjeFF8P2dznQnms76WTpldA97ANG-NOMkSQK1d8OnB39q0_rm20gsfF4FBlgWjaDwGtS_7dw1RL8HDYUWVC3bo_2vleoNe_Y_eatfNzu5GRIXui3jNCNIITcoMe-rDUxv7DDWT9__4lT7HuvjGNQZIQpoQ4")'}}></div>
          <div>
            <h1 className="text-white text-base font-bold leading-tight tracking-tight">UX Project</h1>
            <span className="text-text-secondary font-medium text-xs block mt-0.5">Overview Dashboard</span>
          </div>
        </div>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-text-secondary text-[18px]">search</span>
          <input className="w-full bg-surface-dark border border-border-subtle rounded-lg py-2 pl-9 pr-3 text-sm text-white placeholder-text-secondary/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" placeholder="Filter sidebar..." type="text"/>
        </div>
      </div>
      
      <div className="flex-1 px-4 flex flex-col gap-8 overflow-y-auto py-4">
        <div>
          <div className="flex items-center justify-between px-2 mb-2 group cursor-pointer">
            <h3 className="text-xs font-bold text-text-secondary uppercase tracking-widest">Saved Views</h3>
            <span className="material-symbols-outlined text-[16px] text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity">add</span>
          </div>
          <nav className="flex flex-col gap-0.5">
            <button className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 text-primary w-full text-left transition-all border border-primary/20">
              <span aria-hidden="true" className="material-symbols-outlined text-[20px] fill-current">star</span>
              <span className="text-sm font-bold">My Active Tasks</span>
              <span className="ml-auto text-xs font-mono opacity-80">12</span>
            </button>
            <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-text-secondary hover:bg-surface-dark hover:text-white w-full text-left transition-colors border border-transparent">
              <span aria-hidden="true" className="material-symbols-outlined text-[20px]">history</span>
              <span className="text-sm font-medium">Recent Items</span>
            </button>
            <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-text-secondary hover:bg-surface-dark hover:text-white w-full text-left transition-colors border border-transparent">
              <span aria-hidden="true" className="material-symbols-outlined text-[20px]">priority_high</span>
              <span className="text-sm font-medium">High Priority</span>
              <span className="ml-auto text-xs font-mono bg-error/20 text-error px-1.5 py-0.5 rounded">3</span>
            </button>
          </nav>
        </div>

        <div>
          <h3 className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-2 px-2">Task Types</h3>
          <nav className="flex flex-col gap-1">
            <label className="flex items-center gap-3 px-3 py-1.5 rounded-lg text-text-secondary hover:bg-surface-dark cursor-pointer group transition-colors">
              <input defaultChecked className="rounded border-white/20 bg-surface-dark text-primary focus:ring-primary focus:ring-offset-background-dark w-4 h-4" type="checkbox"/>
              <span className="text-sm font-medium group-hover:text-white">Research</span>
              <span className="ml-auto text-xs text-text-secondary opacity-50">5</span>
            </label>
            <label className="flex items-center gap-3 px-3 py-1.5 rounded-lg text-text-secondary hover:bg-surface-dark cursor-pointer group transition-colors">
              <input defaultChecked className="rounded border-white/20 bg-surface-dark text-primary focus:ring-primary focus:ring-offset-background-dark w-4 h-4" type="checkbox"/>
              <span className="text-sm font-medium group-hover:text-white">Design</span>
              <span className="ml-auto text-xs text-text-secondary opacity-50">8</span>
            </label>
            <label className="flex items-center gap-3 px-3 py-1.5 rounded-lg text-text-secondary hover:bg-surface-dark cursor-pointer group transition-colors">
              <input className="rounded border-white/20 bg-surface-dark text-primary focus:ring-primary focus:ring-offset-background-dark w-4 h-4" type="checkbox"/>
              <span className="text-sm font-medium group-hover:text-white">Development</span>
              <span className="ml-auto text-xs text-text-secondary opacity-50">2</span>
            </label>
          </nav>
        </div>

        <div>
          <h3 className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-2 px-2">Epics</h3>
          <nav className="flex flex-col gap-1">
            <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-text-secondary hover:bg-surface-dark hover:text-white w-full text-left transition-colors group">
              <span className="w-2.5 h-2.5 rounded-sm bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></span>
              <span className="text-sm font-medium flex-1 truncate">Onboarding Flow</span>
              <span className="material-symbols-outlined text-[16px] opacity-0 group-hover:opacity-100">chevron_right</span>
            </button>
            <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-text-secondary hover:bg-surface-dark hover:text-white w-full text-left transition-colors group">
              <span className="w-2.5 h-2.5 rounded-sm bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.5)]"></span>
              <span className="text-sm font-medium flex-1 truncate">Account Overview</span>
              <span className="material-symbols-outlined text-[16px] opacity-0 group-hover:opacity-100">chevron_right</span>
            </button>
          </nav>
        </div>
      </div>

      <div className="p-4 mt-auto border-t border-border-subtle">
        <button className="flex items-center justify-between w-full px-3 py-2 text-text-secondary hover:text-white hover:bg-surface-dark rounded-lg transition-colors">
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="material-symbols-outlined text-[20px]">first_page</span>
            <span className="text-sm font-medium">Collapse Panel</span>
          </div>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;