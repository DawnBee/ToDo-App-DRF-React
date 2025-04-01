import React from "react";
import axios from "axios";

const TaskItem = ({ task, onToggleComplete, onDelete }) => {
  const handleToggle = async () => {
    try {
      // Toggle task completion
      await axios.patch(`http://127.0.0.1:8000/api/tasks/${task.id}/`, {
        completed: !task.completed,
      });
      onToggleComplete(task.id, !task.completed); // Update task state in parent
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDelete = async () => {
    try {
      // Delete the task
      await axios.delete(`http://127.0.0.1:8000/api/tasks/${task.id}/`);
      onDelete(task.id); // Remove task from the list
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="task-item">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={handleToggle}
      />
      <span>{task.name}</span>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default TaskItem;