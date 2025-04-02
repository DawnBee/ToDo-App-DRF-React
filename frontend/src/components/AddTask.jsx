import axios from "axios";
import { useState } from "react";
import { API_BASE_URL } from "../api";

const PRIORITY_OPTIONS = ["Urgent", "High", "Normal"];

const AddTask = ({ setTasks }) => {
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState(PRIORITY_OPTIONS[0]);
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);

  const handleAddTask = async () => {
    if (!newTaskName.trim()) {
      alert("Task name cannot be empty!");
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/tasks/`, {
        name: newTaskName.trim(),
        description: newTaskDescription.trim(),
        priority: newTaskPriority,
      });

      setTasks((prevTasks) => [...prevTasks, response.data]);

      // Reset form
      setNewTaskName("");
      setNewTaskDescription("");
      setNewTaskPriority(PRIORITY_OPTIONS[0]);
      setIsAddFormVisible(false);
    } catch (error) {
      console.error("Error adding task:", error.response?.data || error.message);
      alert("Failed to add task. Please try again.");
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