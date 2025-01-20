export type Task = {
  "@id": string;
  "@type": string;
  id: number;
  title: string;
  description: string;
  dueDate?: string;
  done: boolean;
  priority?: number;
  category: string;
  createdAt: string;
  updatedAt: string;
};

export type TaskCollection = {
  "@context": string;
  "@id": string;
  "@type": string;
  totalItems: number;
  member: Task[];
};