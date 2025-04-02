import axios from "axios";
import AddTask from "./AddTask";
import UpdateTask from "./UpdateTask";
import DeleteTask from "./DeleteTask";
import { API_BASE_URL } from "../api";
import { useState, useEffect } from "react";

const ListTasks = () => {
  const [tasks, setTasks] = useState([]);

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

  const handleCheckboxChange = async (taskId, completed) => {
    try {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, completed: !completed } : task
        )
      );
    } catch (error) {
      console.error("Error updating task completion:", error);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, completed: completed } : task
        )
      );
    }
  };

  return (
    <div className="tasks-container">
      <h2>ToDo List</h2>
      <div className="btn-wrap">
        <AddTask setTasks={setTasks} />
      </div>

      {tasks.length === 0 ? (
        <div className="empty-tasks">No tasks available. Add a new task!</div>
      ) : (
        <ul className="tasks-list">
          {tasks.map((task) => (
            <li key={task.id} className="task-item">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleCheckboxChange(task.id, task.completed)}
                className="task-checkbox"
              />
              <p className={task.completed ? "completed-task" : ""}>{task.name}</p>
              <div className="item-btn-wrap">
                <UpdateTask task={task} setTasks={setTasks} />
                <DeleteTask taskId={task.id} setTasks={setTasks} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListTasks;