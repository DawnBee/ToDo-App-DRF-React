import axios from "axios";
import { API_BASE_URL } from "../api";
import { useState, useEffect } from "react";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PRIORITY_OPTIONS = ["Urgent", "High", "Normal"];

const UpdateTask = ({ task, setTasks }) => {
  const [editTask, setEditTask] = useState({ ...task });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setEditTask({ ...task });
  }, [task]);

  const handleUpdate = async () => {
    if (!editTask.name.trim()) {
      alert("Task name cannot be empty!");
      return;
    }

    try {
      const response = await axios.patch(
        `${API_BASE_URL}/tasks/${editTask.id}/`,
        {
          ...editTask,
          name: editTask.name.trim(),
          description: editTask.description.trim(),
        }
      );

      setTasks((prevTasks) =>
        prevTasks.map((item) => (item.id === editTask.id ? response.data : item))
      );
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating task:", error.response?.data || error.message);
      alert("Failed to update task. Please try again.");
    }
  };

  return (
    <div>
      {!isEditing ? (
        <button className="edit-btn" onClick={() => setIsEditing(true)}>
          <FontAwesomeIcon icon={faEdit} />
        </button>
      ) : (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Edit Task</h2>
            <input
              type="text"
              value={editTask.name}
              onChange={(e) => setEditTask({ ...editTask, name: e.target.value })}
              placeholder="Task Name"
            />
            <textarea
              value={editTask.description}
              onChange={(e) =>
                setEditTask({ ...editTask, description: e.target.value })
              }
              placeholder="Task Description"
            />
            <select
              value={editTask.priority}
              onChange={(e) =>
                setEditTask({ ...editTask, priority: e.target.value })
              }
            >
              {PRIORITY_OPTIONS.map((priority) => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
            </select>
            <div className="checkbox-wrap">
              <input
                type="checkbox"
                checked={editTask.completed || false}
                onChange={(e) =>
                  setEditTask({ ...editTask, completed: e.target.checked })
                }
              />
              <p>Completed</p>
            </div>
            <div className="modal-btns">
              <button className="update-btn" onClick={handleUpdate}>
                Update
              </button>
              <button className="cancel-btn" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateTask;