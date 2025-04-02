import axios from "axios";
import { API_BASE_URL } from "../api";
import { useState, useEffect } from "react";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PRIORITY_OPTIONS = ["Urgent", "High", "Normal"];
const CATEGORY_OPTIONS = ["Personal", "Work", "Others"];

const UpdateTask = ({ task, setTasks }) => {
  const [editTask, setEditTask] = useState({ ...task });
  const [isEditing, setIsEditing] = useState(false);
  const [attachmentImage, setAttachmentImage] = useState(null);

  useEffect(() => {
    setEditTask({ ...task });
    setAttachmentImage(task.attachment_image || null);
  }, [task]);

  const handleUpdate = async () => {
    if (!editTask.name.trim()) {
      alert("Task name cannot be empty!");
      return;
    }

    const formData = new FormData();
    formData.append("name", editTask.name.trim());
    formData.append("description", editTask.description.trim());
    formData.append("priority", editTask.priority);
    formData.append("category", editTask.category);
    formData.append("completed", editTask.completed);
    if (attachmentImage) {
      formData.append("attachment", attachmentImage);
    }

    try {
      const response = await axios.patch(
        `${API_BASE_URL}/tasks/${editTask.id}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
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
            <select
              value={editTask.category}
              onChange={(e) =>
                setEditTask({ ...editTask, category: e.target.value })
              }
            >
              {CATEGORY_OPTIONS.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setAttachmentImage(e.target.files[0])}
            />
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