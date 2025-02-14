import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8090/auth/register", {
        name,
        email,
        password
      });
      setMessage(response.data.message);
      navigate("/login");
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed");
    }
  };

  // Inline Styles
  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#f4f4f4",
    },
    formContainer: {
      background: "white",
      padding: "2rem",
      borderRadius: "8px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      width: "100%",
      maxWidth: "400px",
      textAlign: "center",
    },
    title: {
      fontSize: "28px",
      fontWeight: "bold",
      color: "#000", 
      marginBottom: "15px",
    },
    inputContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    input: {
      width: "90%",
      padding: "10px",
      margin: "8px 0",
      border: "1px solid #ccc",
      borderRadius: "5px",
      fontSize: "16px",
    },
    button: {
      width: "95%",
      padding: "10px",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "5px",
      fontSize: "18px",
      cursor: "pointer",
      transition: "background 0.3s",
      marginTop: "10px",
    },
    buttonHover: {
      backgroundColor: "#0056b3",
    },
    message: {
      marginTop: "10px",
      color: "#ff0000",
    },
    loginLink: {
      marginTop: "15px",
      fontSize: "18px", 
      color: "#333",
    },
    link: {
      color: "#007bff",
      textDecoration: "none",
      fontWeight: "bold",
      fontSize: "18px", 
    },
    linkHover: {
      textDecoration: "underline",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Create an Account</h2>
        <form onSubmit={handleRegister} style={styles.inputContainer}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Register
          </button>
        </form>
        <p style={styles.message}>{message}</p>
        <p style={styles.loginLink}>
          Already have an account? <Link to="/login" style={styles.link}>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
