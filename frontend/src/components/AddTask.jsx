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
    <div>
      {/* Add Task Form */}
      {isAddFormVisible && (
        <div>
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
          <button onClick={handleAddTask}>Add Task</button>
          <button onClick={() => setIsAddFormVisible(false)}>Cancel</button>
        </div>
      )}

      {/* Show the Add Task button when form is hidden */}
      {!isAddFormVisible && (
        <button onClick={() => setIsAddFormVisible(true)}>Add Task</button>
      )}
    </div>
  );
};

export default AddTask;