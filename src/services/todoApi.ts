import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Todo {
    id: number;
    name: string;
    status: 'open' | 'in progress' | 'completed' | 'archived' | 'cancelled';
    color?: string;
}

interface CreateTodoRequest {
    name: string;
    status: Todo['status'];
    color: string;
}

interface UpdateTodoRequest {
    name?: string;
    status?: Todo['status'];
    color?: string;
}

export interface TodosResponse {
    total: number;
    page: number;
    limit: number;
    todos: Todo[];
    statusCount: Record<Todo['status'], number>;
}

export const todoApi = createApi({
    reducerPath: 'todoApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/todos' }),
    tagTypes: ['Todo'],
    endpoints: (builder) => ({
        getTodos: builder.query<TodosResponse, { page?: number; limit?: number }>({
            query: ({ page = 1, limit = 10 }) => `?page=${page}&limit=${limit}`,
            providesTags: ['Todo'],
        }),
        getTodoById: builder.query<Todo, number>({
            query: (id) => `/${id}`,
            providesTags: ['Todo'],
        }),
        createTodo: builder.mutation<Todo, CreateTodoRequest>({
            query: (newTodo) => ({
                url: '/',
                method: 'POST',
                body: newTodo,
            }),
            invalidatesTags: ['Todo'],
        }),
        updateTodo: builder.mutation<Todo, { id: number; todo: UpdateTodoRequest }>({
            query: ({ id, todo }) => ({
                url: `/${id}`,
                method: 'PUT',
                body: todo,
            }),
            invalidatesTags: ['Todo'],
        }),
        deleteTodo: builder.mutation<void, number>({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Todo'],
        }),
    }),
});

export const {
    useGetTodosQuery,
    useGetTodoByIdQuery,
    useCreateTodoMutation,
    useUpdateTodoMutation,
    useDeleteTodoMutation,
} = todoApi;