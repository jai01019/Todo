
import { useState } from "react";

function TaskItem({ task, toggleComplete, deleteTask, editTask, provided }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);

  const handleEdit = () => {
    if (isEditing) {
      editTask(task.id, newText);
    }
    setIsEditing(!isEditing);
  };

  return (
    <li
      className="list-group-item d-flex justify-content-between align-items-center p-3 rounded"
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={{
        backgroundColor: task.completed ? "#d4edda" : "white",
        borderLeft: task.completed ? "5px solid #28a745" : "5px solid #007bff",
        transition: "all 0.3s ease",
      }}
    >
      {/* If Editing */}
      {isEditing ? (
        <input
          type="text"
          className="form-control me-2 border-primary shadow-sm"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          style={{ flex: "1", borderRadius: "8px", padding: "5px" }}
        />
      ) : (
        <span
          style={{
            textDecoration: task.completed ? "line-through" : "none",
            fontWeight: task.completed ? "bold" : "normal",
            fontSize: "16px",
          }}
        >
          {task.text}
        </span>
      )}

      <div className="d-flex gap-2">
        {/* Complete Button */}
        <button
          className={`btn btn-sm ${task.completed ? "btn-success" : "btn-outline-success"}`}
          onClick={() => toggleComplete(task.id)}
          disabled={task.completed}
          style={{ minWidth: "90px", fontWeight: "500" }}
        >
          {task.completed ? "Completed" : "Complete"}
        </button>

        {/* Edit/Save Button */}
        <button
          className={`btn btn-sm ${isEditing ? "btn-primary" : "btn-warning"} fw-bold`}
          onClick={handleEdit}
          style={{ minWidth: "70px" }}
        >
          {isEditing ? "Save" : "Edit"}
        </button>

        {/* Delete Button */}
        <button
          className="btn btn-danger btn-sm fw-bold"
          onClick={() => deleteTask(task.id)}
          style={{ minWidth: "80px" }}
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export default TaskItem;
