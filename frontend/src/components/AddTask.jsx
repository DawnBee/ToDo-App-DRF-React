import axios from "axios";
import { useState } from "react";
import { API_BASE_URL } from "../api";

const PRIORITY_OPTIONS = ["Urgent", "High", "Normal"];
const CATEGORY_OPTIONS = ["Personal", "Work", "Others"];

const AddTask = ({ setTasks }) => {
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState(PRIORITY_OPTIONS[0]);
  const [newTaskCategory, setNewTaskCategory] = useState(CATEGORY_OPTIONS[0]);
  const [attachmentImage, setAttachmentImage] = useState(null);
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);

  const handleAddTask = async () => {
    if (!newTaskName.trim()) {
      alert("Task name cannot be empty!");
      return;
    }

    const formData = new FormData();
    formData.append("name", newTaskName.trim());
    formData.append("description", newTaskDescription.trim());
    formData.append("priority", newTaskPriority);
    formData.append("category", newTaskCategory);
    if (attachmentImage) {
      formData.append("attachment", attachmentImage);
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/tasks/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setTasks((prevTasks) => [...prevTasks, response.data]);

      setNewTaskName("");
      setNewTaskDescription("");
      setNewTaskPriority(PRIORITY_OPTIONS[0]);
      setNewTaskCategory(CATEGORY_OPTIONS[0]);
      setAttachmentImage(null);
      setIsAddFormVisible(false);
    } catch (error) {
      console.error("Error adding task:", error.response?.data || error.message);
      alert("Failed to add task, make sure it has a unique name!");
    }
  };

  return (
    <div className="form-container">
      {!isAddFormVisible ? (
        <button className="add-btn" onClick={() => setIsAddFormVisible(true)}>
          Add Task
        </button>
      ) : (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Add New Task</h2>
            <input
              type="text"
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
              placeholder="Task name"
            />
            <textarea
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
              placeholder="Task description"
            />
            <select
              value={newTaskPriority}
              onChange={(e) => setNewTaskPriority(e.target.value)}
            >
              {PRIORITY_OPTIONS.map((priority) => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
            </select>
            <select
              value={newTaskCategory}
              onChange={(e) => setNewTaskCategory(e.target.value)}
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
            <div className="modal-btns">
              <button className="add-btn" onClick={handleAddTask}>
                Add Task
              </button>
              <button className="cancel-btn" onClick={() => setIsAddFormVisible(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTask;