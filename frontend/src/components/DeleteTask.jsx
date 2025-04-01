import axios from "axios";
import { API_BASE_URL } from "../api";

const DeleteTask = ({ taskId, setTasks }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/tasks/${taskId}/`);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return <button onClick={handleDelete}>Delete</button>;
};

export default DeleteTask;