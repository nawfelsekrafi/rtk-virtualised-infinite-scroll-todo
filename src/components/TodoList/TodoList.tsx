import { useState, useEffect } from "react";
import { FixedSizeList as List } from "react-window";
import { useGetTodosQuery } from "../../services/todoApi";
import CreateTodoForm from "../CreateTodoForm";
import InfiniteLoader from "react-window-infinite-loader";
import StatusCounts from "../StatusCounts";
import TodoItem from "../TodoItem";

function TodoList() {
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [allTodos, setAllTodos] = useState<any[]>([]);

  const { data, error, isLoading } = useGetTodosQuery({ page, limit });

  useEffect(() => {
    if (data?.todos) {
      setAllTodos((prev) => [...prev, ...data.todos]);
    }
  }, [data?.todos]);

  const itemCount = data?.total || 0;

  const getTodoAtIndex = (index: number) => {
    return allTodos[index];
  };

  const isItemLoaded = (index: number) => {
    return !!getTodoAtIndex(index);
  };

  const loadMoreItems = () => {
    setPage((prev) => prev + 1);
    return Promise.resolve();
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {JSON.stringify(error)}</div>;

  return (
    <div className="todo-list">
      <h1>Todo List</h1>

      {!isFormOpen && (
        <button
          onClick={() => setIsFormOpen((prev) => !prev)}
          className="create-todo-button"
        >
          Create Todo
        </button>
      )}
      <CreateTodoForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
      />
      {!isFormOpen && (
        <>
          <StatusCounts data={data} />

          <InfiniteLoader
            isItemLoaded={isItemLoaded}
            itemCount={itemCount}
            loadMoreItems={loadMoreItems}
          >
            {({ onItemsRendered, ref }) => (
              <List
                ref={ref}
                onItemsRendered={onItemsRendered}
                height={400}
                itemCount={itemCount}
                itemSize={100}
                width="100%"
              >
                {({ index, style }) => (
                  <div style={style}>
                    <TodoItem todo={getTodoAtIndex(index)} />
                  </div>
                )}
              </List>
            )}
          </InfiniteLoader>
        </>
      )}
    </div>
  );
}

export default TodoList;
