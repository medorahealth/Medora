// components/LoginForm.js
import React, { useState } from "react";
import { signIn } from "next-auth/react";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError(result.error);
    } else {
      //Redirect to Root Page
      window.location.href = "/";
    }
  };
  const formStyle = {
    maxWidth: "400px",
    margin: "0 auto",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "8px",
    fontWeight: "bold",
  };

  const inputStyle = {
    width: "100%",
    padding: "8px",
    marginBottom: "16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  };

  const buttonStyle = {
    backgroundColor: "#007bff",
    color: "white",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
    border: "none",
    fontWeight: "bold",
  };
  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      {error && (
        <div
          style={{
            backgroundColor: "#f8d7da",
            borderColor: "#f5c6cb",
            color: "#721c24",
            padding: "8px",
            marginBottom: "16px",
            borderRadius: "4px",
          }}
        >
          <strong>Error:</strong> {error}
        </div>
      )}
      <div>
        <label htmlFor="email" style={labelStyle}>
          Email:
        </label>
        <input
          type="email"
          id="email"
          style={inputStyle}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password" style={labelStyle}>
          Password:
        </label>
        <input
          type="password"
          id="password"
          style={inputStyle}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <button style={buttonStyle} type="submit">
          Sign In
        </button>
        <a href="#" style={{ fontWeight: "bold", color: "#007bff" }}>
          Forgot Password?
        </a>
      </div>
    </form>
  );
}

export default LoginForm;
