import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../api";

const UpdateTask = ({ task, setTasks }) => {
  const [editTask, setEditTask] = useState({ ...task });
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = async () => {
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/tasks/${editTask.id}/`,
        editTask
      );
      setTasks((prevTasks) =>
        prevTasks.map((item) => (item.id === editTask.id ? response.data : item))
      );
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div>
      {/* Toggle Edit Form Visibility */}
      {!isEditing ? (
        <button onClick={() => setIsEditing(true)}>Edit Task</button>
      ) : (
        <div>
          <input
            type="text"
            value={editTask.name}
            onChange={(e) => setEditTask({ ...editTask, name: e.target.value })}
          />
          <textarea
            value={editTask.description}
            onChange={(e) =>
              setEditTask({ ...editTask, description: e.target.value })
            }
          />
          <button onClick={handleUpdate}>Update Task</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default UpdateTask;