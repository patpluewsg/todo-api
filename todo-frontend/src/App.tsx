import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TodoList from "./components/TodoList";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="p-10">
        <h1 className="text-2xl font-bold mb-4">Todo App</h1>
        <TodoList />
      </div>
    </QueryClientProvider>
  );
}
