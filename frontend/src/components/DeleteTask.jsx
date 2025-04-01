import axios from "axios";
import { API_BASE_URL } from "../api";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DeleteTask = ({ taskId, setTasks }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/tasks/${taskId}/`);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <button className="del-btn" onClick={handleDelete}>
      <FontAwesomeIcon icon={faTrash} />
    </button>    
  );
};

export default DeleteTask;