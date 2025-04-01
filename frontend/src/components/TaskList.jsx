import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../api";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskName, setEditingTaskName] = useState("");
  const [editingTaskDescription, setEditingTaskDescription] = useState("");
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/tasks/`);
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  // Handle adding a task
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
      setIsAddFormVisible(false);  // Hide form after adding the task
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Handle deleting a task
  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`${API_BASE_URL}/tasks/${taskId}/`);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Handle updating a task
  const handleUpdateTask = async (taskId) => {
    if (!editingTaskName) return;
    try {
      const updatedTask = {
        name: editingTaskName,
        description: editingTaskDescription,
      };
      const response = await axios.patch(
        `${API_BASE_URL}/tasks/${taskId}/`,
        updatedTask
      );
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, ...updatedTask } : task
        )
      );
      setEditingTaskId(null);
      setEditingTaskName("");
      setEditingTaskDescription("");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div>
      <h1>Task List</h1>
      
      {/* Add Task Section */}
      {!isAddFormVisible && (
        <button onClick={() => setIsAddFormVisible(true)}>Add Task</button>
      )}
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
      
      {/* Tasks Display */}
      {tasks.map((task) => (
        <div key={task.id}>
          {/* Editing Task */}
          {editingTaskId === task.id ? (
            <>
              <input
                type="text"
                value={editingTaskName}
                onChange={(e) => setEditingTaskName(e.target.value)}
                placeholder="Edit task name"
              />
              <textarea
                value={editingTaskDescription}
                onChange={(e) => setEditingTaskDescription(e.target.value)}
                placeholder="Edit task description"
              />
              <button onClick={() => handleUpdateTask(task.id)}>Update</button>
              <button onClick={() => setEditingTaskId(null)}>Cancel</button>
            </>
          ) : (
            <>
              <span>{task.name}</span>
              <button onClick={() => setEditingTaskId(task.id)}>
                Edit
              </button>
              <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default TaskList;