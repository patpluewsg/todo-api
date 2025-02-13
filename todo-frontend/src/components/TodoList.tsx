import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchTodos, addTodo, updateTodo, deleteTodo } from "../api/todos";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Todo } from "../types"; // Importing Todo type

const TodoList = () => {
  const queryClient = useQueryClient();
  const { data: todos = [] } = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  const [newTodo, setNewTodo] = useState("");

  const addTodoMutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  const updateTodoMutation = useMutation({
    mutationFn: ({ id, completed }: { id: number; completed: boolean }) =>
      updateTodo(id, completed),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  const deleteTodoMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  return (
    <div className="max-w-md mx-auto mt-10 space-y-4">
      <div className="flex gap-2">
        <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
          <Input
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo"
          />
          <Button
            onClick={() => {
              addTodoMutation.mutate(newTodo);
              setNewTodo("");
            }}
          >
            Add
          </Button>
        </form>
      </div>

      {todos.map((todo) => (
        <Card key={todo.id} className="p-4 flex justify-between items-center">
          <span className={todo.completed ? "line-through" : ""}>
            {todo.title}
          </span>
          <div className="flex gap-2">
            <Button
              onClick={() =>
                updateTodoMutation.mutate({
                  id: todo.id,
                  completed: !todo.completed,
                })
              }
            >
              {todo.completed ? "Undo" : "Complete"}
            </Button>
            <Button onClick={() => deleteTodoMutation.mutate(todo.id)}>
              Delete
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default TodoList;
