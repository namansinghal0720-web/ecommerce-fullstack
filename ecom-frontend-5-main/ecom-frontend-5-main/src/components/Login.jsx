import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../axios";

const Login = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/auth/login", credentials);

      localStorage.setItem("token", response.data.token);

      alert("Login Successful");

      navigate("/");
      window.location.reload();

    } catch (error) {
      console.error(error);

      if (error.response) {
        alert(error.response.data);
      } else {
        alert("Unable to connect to server");
      }
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "450px" }}>
      <div className="card shadow p-4">

        <h2 className="text-center mb-4">
          Login
        </h2>

        <form onSubmit={handleLogin}>

          <div className="mb-3">
            <label className="form-label">
              Email
            </label>

            <input
              className="form-control"
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label">
              Password
            </label>

            <input
              className="form-control"
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
          >
            Login
          </button>

        </form>

        <p className="text-center mt-3">
          Don't have an account?

          <Link
            to="/register"
            className="ms-2"
          >
            Register
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;