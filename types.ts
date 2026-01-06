export interface User {
  id: string;
  name: string;
  avatarUrl: string;
}

export interface Attachment {
  id: string;
  type: 'file' | 'link';
  name: string;
}

export interface Comment {
  id: string;
  userId: string;
  content: string;
  createdAt: string;
}

export interface Subtask {
  id: string;
  title: string;
  isCompleted: boolean;
}

export type TagColor = 'blue' | 'red' | 'orange' | 'indigo' | 'purple' | 'gray' | 'green';

export interface Tag {
  label: string;
  color: TagColor;
}

export interface Task {
  id: string;
  title: string;
  columnId: string;
  tags: Tag[];
  assignees: User[];
  dueDate?: string;
  isHighPriority?: boolean; // Kept for backward compat or derived logic
  priority?: 'Low' | 'Medium' | 'High';
  storyPoints?: number;
  coverImage?: string;
  attachments?: number;
  commentsCount?: number;
  description?: string;
  subtasks?: Subtask[];
}

export interface Column {
  id: string;
  title: string;
  colorClass: string; // e.g., "bg-blue-400"
  tasks: Task[];
  taskCount: number;
}