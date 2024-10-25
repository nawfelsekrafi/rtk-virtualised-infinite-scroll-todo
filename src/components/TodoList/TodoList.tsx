import { useState } from "react";
import { FixedSizeList as List } from "react-window";
import { useGetTodosQuery } from "../../services/todoApi";
import CreateTodoForm from "../CreateTodoForm";
import StatusCounts from "../StatusCounts";
import TodoItem from "../TodoItem";

function TodoList() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, error, isLoading } = useGetTodosQuery({ page, limit });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {JSON.stringify(error)}</div>;

  return (
    <div className="todo-list">
      <h1>Todo List</h1>

      {!isModalOpen && (
        <button
          onClick={() => setIsModalOpen((prev) => !prev)}
          className="create-todo-button"
        >
          Create Todo
        </button>
      )}
      <CreateTodoForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      {!isModalOpen && (
        <>
          <StatusCounts data={data} />

          <List
            height={400}
            itemCount={data?.todos.length || 0}
            itemSize={100}
            width="100%"
          >
            {({ index, style }) => (
              <div style={style}>
                <TodoItem todo={data?.todos[index]} />
              </div>
            )}
          </List>
        </>
      )}
      {/* <div
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous Page
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next Page
        </button>
      </div> */}
    </div>
  );
}

export default TodoList;
