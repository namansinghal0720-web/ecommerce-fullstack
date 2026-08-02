import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../axios";

const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/auth/register", user);

      alert("Registration Successful");

      navigate("/login");

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
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <div className="card shadow p-4">

        <h2 className="text-center mb-4">
          Register
        </h2>

        <form onSubmit={handleRegister}>

          <div className="mb-3">
            <label className="form-label">
              Full Name
            </label>

            <input
              className="form-control"
              type="text"
              name="fullName"
              value={user.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Email
            </label>

            <input
              className="form-control"
              type="email"
              name="email"
              value={user.email}
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
              value={user.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            className="btn btn-success w-100"
            type="submit"
          >
            Register
          </button>

        </form>

        <p className="text-center mt-3">
          Already have an account?

          <Link
            to="/login"
            className="ms-2"
          >
            Login
          </Link>

        </p>

      </div>
    </div>
  );
};

export default Register;