import axios from "axios";
import { useState } from "react";
import { API_BASE_URL } from "../api";

const AddTask = ({ setTasks }) => {
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);

  const handleAddTask = async () => {
    if (!newTaskName) return;
    try {
      const response = await axios.post(`${API_BASE_URL}/tasks/`, {
        name: newTaskName,
        description: newTaskDescription,
      });
      setTasks((prevTasks) => [...prevTasks, response.data]);
      setNewTaskName("");
      setNewTaskDescription("");
      setIsAddFormVisible(false);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
  <div className="form-container">
    {!isAddFormVisible && (
      <button className="add-btn" onClick={() => setIsAddFormVisible(true)}>
        Add Task
      </button>
    )}

    {/* Modal for adding task */}
    {isAddFormVisible && (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Add New Task</h2>
          <input
            type="text"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            placeholder="name"
          />
          <textarea
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
            placeholder="description"
          />
          <div className="modal-btns">
            <button className="add-btn" onClick={handleAddTask}>Add Task</button>
            <button className="cancel-btn" onClick={() => setIsAddFormVisible(false)}>Cancel</button>
          </div>
        </div>
      </div>
    )}
  </div>

  );
};

export default AddTask;