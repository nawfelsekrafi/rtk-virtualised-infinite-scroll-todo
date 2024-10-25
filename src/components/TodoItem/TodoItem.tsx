import { Todo, useDeleteTodoMutation } from "../../services/todoApi";

const TodoItem = ({ todo }: { todo: Todo | undefined }) => {
  const [deleteTodo, { isLoading: isDeleting }] = useDeleteTodoMutation();

  const handleDelete = async () => {
    if (todo?.id) {
      try {
        await deleteTodo(todo.id).unwrap();
      } catch (error) {
        console.error("Failed to delete todo:", error);
      }
    }
  };

  return (
    <div className="todo-item">
      <div className="todo-item-content">
        <span
          className="status"
          style={{ backgroundColor: todo?.color || "#000" }}
        ></span>
        <p>{todo?.name}</p>
        <p>{todo?.status}</p>
      </div>

      <div className="todo-item-actions">
        <button onClick={handleDelete} disabled={isDeleting}>
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
        {/* <button>Edit</button> */}
      </div>
    </div>
  );
};

export default TodoItem;
