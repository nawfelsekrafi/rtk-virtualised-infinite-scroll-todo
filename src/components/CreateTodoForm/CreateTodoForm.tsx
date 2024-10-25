import React, { useState } from "react";
import { useCreateTodoMutation } from "../../services/todoApi";

interface CreateTodoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const statusColors = {
  open: "#ADB8CC",
  "in progress": "#FFA902",
  completed: "#12B76A",
  archived: "#64696F",
  cancelled: "#D92D21",
};

const CreateTodoForm: React.FC<CreateTodoModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<
    "open" | "in progress" | "completed" | "archived" | "cancelled"
  >("open");
  const [color, setColor] = useState("#808080"); // Default to gray
  const [description, setDescription] = useState("");
  const [createTodo, { isLoading }] = useCreateTodoMutation();

  const statusOptions = {
    open: "Open",
    "in progress": "In Progress",
    completed: "Completed",
    archived: "Archived",
    cancelled: "Cancelled",
  };

  const colorOptions = {
    "#ADB8CC": "Gray",
    "#FFA902": "Orange",
    "#12B76A": "Green",
    "#64696F": "Dark Gray",
    "#D92D21": "Red",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createTodo({ name: title, status, color }).unwrap();
      onClose();
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Failed to create todo:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="content">
      <h2>Create New Todo</h2>
      <form onSubmit={handleSubmit} className="new-todo-form">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
          className="new-todo-form-input"
        />
        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value as keyof typeof statusOptions);
            setColor(statusColors[e.target.value as keyof typeof statusColors]);
          }}
          className="select-status"
        >
          {Object.entries(statusOptions).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <select
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="select-color"
          style={{
            background: color,
            borderColor: color,
          }}
        >
          {Object.entries(colorOptions).map(([value, label]) => (
            <option
              key={value}
              value={value}
              style={{ backgroundColor: value }}
            >
              {label}
            </option>
          ))}
        </select>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Todo"}
        </button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default CreateTodoForm;
