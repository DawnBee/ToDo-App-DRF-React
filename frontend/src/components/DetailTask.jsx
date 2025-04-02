const DetailTask = ({ task, onClose }) => {
    if (!task) return null;

    return (
      <div className="modal-overlay">
        <div className="modal-content">
            <h2>Task Details</h2>
            <p><strong>Name:</strong> {task.name}</p>
            <p><strong>Description:</strong> {task.description}</p>
            <p><strong>Priority:</strong> {task.priority}</p>
            <p><strong>Category:</strong> {task.category}</p>
            <p><strong>Due Date:</strong> {new Date(task.due_date).toLocaleDateString()}</p>
            <button className="cancel-btn" onClick={onClose}>Close</button>
        </div>
      </div>
    );
};

export default DetailTask;