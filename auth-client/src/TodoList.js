import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:8090/todo", { withCredentials: true });
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const handleAddTodo = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8090/todo/create", { title, description }, { withCredentials: true });
      fetchTodos();
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleComplete = async (id) => {
    try {
      await axios.put(`http://localhost:8090/todo/${id}/complete`, {}, { withCredentials: true });
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
        )
      );
    } catch (error) {
      console.error("Error completing todo:", error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(
        `http://localhost:8090/todo/${id}`,
        { title: updatedTitle, description: updatedDescription },
        { withCredentials: true }
      );
      fetchTodos();
      setEditingId(null);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8090/todo/${id}`, { withCredentials: true });
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const startEditing = (todo) => {
    setEditingId(todo._id);
    setUpdatedTitle(todo.title);
    setUpdatedDescription(todo.description);
  };

  const handleLogout = async () => {
    await axios.post("http://localhost:8090/auth/logout", {}, { withCredentials: true });
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2 style={styles.title}>To-Do List</h2>

        {/* Form for Adding Tasks */}
        <form onSubmit={handleAddTodo} style={styles.form}>
          <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required style={styles.input} />
          <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required style={styles.input} />
          <button type="submit" style={styles.button}>Add Task</button>
        </form>

        {/* Task List */}
        <ul style={styles.list}>
          {todos.map((todo) => (
            <li key={todo._id} style={styles.listItem}>
              {editingId === todo._id ? (
                <div>
                  <input type="text" value={updatedTitle} onChange={(e) => setUpdatedTitle(e.target.value)} style={styles.input} />
                  <input type="text" value={updatedDescription} onChange={(e) => setUpdatedDescription(e.target.value)} style={styles.input} />
                  <button onClick={() => handleUpdate(todo._id)} style={styles.button}>Save</button>
                  <button onClick={() => setEditingId(null)} style={styles.cancelButton}>Cancel</button>
                </div>
              ) : (
                <div style={{ textDecoration: todo.isCompleted ? "line-through" : "none" }}>
                  <strong>{todo.title}</strong> - {todo.description}
                </div>
              )}

              <div style={styles.buttonGroup}>
                {editingId !== todo._id && (
                  <>
                    <button onClick={() => startEditing(todo)} style={styles.editButton}>Edit</button>
                    <button onClick={() => handleComplete(todo._id)} style={styles.completeButton}>
                      {todo.isCompleted ? "Undo" : "Complete"}
                    </button>
                    <button onClick={() => handleDelete(todo._id)} style={styles.deleteButton}>Delete</button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>

        {/* Logout & Navigation Links */}
        <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
        <div style={styles.links}>
          <Link to="/login" style={styles.link}>Login</Link>
          <span style={styles.separator}> | </span>
          <Link to="/register" style={styles.link}>Register</Link>
        </div>
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: { display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", backgroundColor: "#f5f5f5" },
  box: { width: "450px", padding: "30px", backgroundColor: "#fff", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", textAlign: "center" },
  title: { fontSize: "28px", fontWeight: "bold", color: "black", marginBottom: "20px" },
  form: { display: "flex", flexDirection: "column", alignItems: "center", width: "100%" },
  input: { padding: "12px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ccc", fontSize: "16px", width: "90%", textAlign: "center" },
  button: { backgroundColor: "#007bff", color: "white", padding: "12px", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "16px", width: "90%", marginTop: "10px" },
  cancelButton: { backgroundColor: "#6c757d", color: "white", padding: "8px", border: "none", borderRadius: "5px", cursor: "pointer", marginLeft: "10px" },
  list: { listStyle: "none", padding: "0", marginTop: "20px" },
  listItem: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px", borderBottom: "1px solid #ddd" },
  buttonGroup: { display: "flex", gap: "10px" },
  editButton: { backgroundColor: "#ffc107", color: "white", padding: "8px", border: "none", borderRadius: "5px", cursor: "pointer" },
  completeButton: { backgroundColor: "#28a745", color: "white", padding: "8px", border: "none", borderRadius: "5px", cursor: "pointer" },
  deleteButton: { backgroundColor: "#dc3545", color: "white", padding: "8px", border: "none", borderRadius: "5px", cursor: "pointer" },
  logoutButton: { backgroundColor: "#ff5733", color: "white", padding: "12px", border: "none", borderRadius: "5px", cursor: "pointer", width: "100%", marginTop: "20px" },
  links: { marginTop: "20px", fontSize: "18px" },
  link: { textDecoration: "none", color: "#007bff", fontWeight: "bold", fontSize: "20px" },
  separator: { margin: "0 10px", color: "#000" },
};

export default TodoList;
