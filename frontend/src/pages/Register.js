import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleRegister = async (
    e
  ) => {
    e.preventDefault();

    if (
      !name ||
      !email ||
      !password
    ) {
      return alert(
        "All fields are required"
      );
    }

    setLoading(true);

    try {
      const response =
        await API.post(
          "/auth/register",
          {
            name,
            email: email
              .trim()
              .toLowerCase(),
            password,
          }
        );

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(
          response.data.user
        )
      );

      navigate("/dashboard");
    } catch (error) {
      alert(
        error.response?.data
          ?.message ||
          "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent:
          "center",
        alignItems: "center",
        height: "100vh",
        background:
          "linear-gradient(135deg,#0f172a,#1e293b)",
      }}
    >
      <form
        onSubmit={
          handleRegister
        }
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "15px",
          width: "380px",
          boxShadow:
            "0 10px 30px rgba(0,0,0,0.2)",
        }}
      >
        <h1
          style={{
            textAlign:
              "center",
            marginBottom:
              "25px",
          }}
        >
          Register
        </h1>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) =>
            setName(
              e.target.value
            )
          }
          required
          style={{
            width: "100%",
            padding: "12px",
            marginBottom:
              "15px",
          }}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          required
          style={{
            width: "100%",
            padding: "12px",
            marginBottom:
              "15px",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          required
          style={{
            width: "100%",
            padding: "12px",
            marginBottom:
              "20px",
          }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            background:
              "#4f46e5",
            color: "white",
            border: "none",
            borderRadius:
              "8px",
          }}
        >
          {loading
            ? "Creating..."
            : "Register"}
        </button>

        <p
          style={{
            textAlign:
              "center",
            marginTop:
              "15px",
          }}
        >
          Already have an account?{" "}
          <Link to="/">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;