// 📌 Type for a Todo Item
export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

// 📌 API Response Types
export type ApiResponse<T> = {
  data: T;
  message?: string;
};

// 📌 Props for a Reusable Button Component
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

// 📌 Props for Input Component
export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

// 📌 Props for the TodoList Component
export interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number, completed: boolean) => void;
  onDelete: (id: number) => void;
}

// 📌 Props for the TodoForm Component
export interface TodoFormProps {
  onAdd: (title: string) => void;
}
