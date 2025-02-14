import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8090/auth/login", { email, password }, { withCredentials: true });
      setMessage(response.data.message);
      navigate("/");
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2 style={styles.title}>Login</h2>
        <form onSubmit={handleLogin} style={styles.form}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={styles.input} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={styles.input} />
          <button type="submit" style={styles.button}>Login</button>
        </form>
        <p style={styles.message}>{message}</p>
        <p style={styles.switchPage}>
          Don't have an account? <Link to="/register" style={styles.link}>Register here</Link>
        </p>
      </div>
    </div>
  );
};


const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f5f5f5",
  },
  box: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "400px",
    padding: "30px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  title: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "black",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center", 
    width: "100%",
  },
  input: {
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
    width: "90%", 
  },
  button: {
    backgroundColor: "#007bff",
    color: "white",
    padding: "12px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    width: "90%",
  },
  message: {
    color: "red",
    marginTop: "10px",
    fontSize: "14px",
  },
  switchPage: {
    marginTop: "15px",
    fontSize: "18px",
  },
  link: {
    textDecoration: "none",
    color: "#007bff",
    fontWeight: "bold",
    fontSize: "20px",
  },
};

export default Login;
