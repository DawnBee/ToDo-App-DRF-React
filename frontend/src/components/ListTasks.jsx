import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../api";
import DeleteTask from "./DeleteTask";
import UpdateTask from "./UpdateTask";
import AddTask from "./AddTask";

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

  return (
    <div>
      <h1>Task List</h1>
      <AddTask setTasks={setTasks} />

      {/* Task List */}
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <p>{task.name}</p>
            <p>{task.description}</p>
            <UpdateTask task={task} setTasks={setTasks} />
            <DeleteTask taskId={task.id} setTasks={setTasks} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListTasks;