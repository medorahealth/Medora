// components/RegistrationForm.js
import React, { useState } from "react";

function RegistrationForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Basic client-side validation (add more robust validation)
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
  };

  const containerStyle = {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage: "url('/images/background.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
    padding: "20px",
  };

  const formContainerStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: "12px",
    padding: "40px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    position: "relative",
    zIndex: 1,
    maxWidth: "500px",
    width: "100%",
  };

  const decorativeTopStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "200px",
    backgroundImage: "url('/images/wave.svg')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    zIndex: 0,
  };

  const formStyle = {
    width: "100%",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "8px",
    fontWeight: "600",
    color: "#374151",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    marginBottom: "20px",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    fontSize: "16px",
    transition: "border-color 0.2s",
  };

  const buttonStyle = {
    backgroundColor: "#4f46e5",
    color: "white",
    padding: "12px 24px",
    borderRadius: "8px",
    cursor: "pointer",
    border: "none",
    fontWeight: "600",
    fontSize: "16px",
    transition: "background-color 0.2s",
    width: "100%",
    marginTop: "10px",
  };

  return (
    <div style={containerStyle}>
      <div style={decorativeTopStyle}></div>
      <div style={formContainerStyle}>
        <h2 style={{ textAlign: "center", marginBottom: "30px", color: "#111827" }}>Create Account</h2>
        <form onSubmit={handleSubmit} style={formStyle}>
          {error && (
            <div
              style={{
                backgroundColor: "#f8d7da",
                borderColor: "#f5c6cb",
                color: "#721c24",
                padding: "12px",
                marginBottom: "20px",
                borderRadius: "8px",
              }}
            >
              <strong>Error:</strong> {error}
            </div>
          )}
          <div>
            <label htmlFor="firstName" style={labelStyle}>
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              style={inputStyle}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter your first name"
            />
          </div>
          <div>
            <label htmlFor="lastName" style={labelStyle}>
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              style={inputStyle}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter your last name"
            />
          </div>
          <div>
            <label htmlFor="email" style={labelStyle}>
              Email
            </label>
            <input
              type="email"
              id="email"
              style={inputStyle}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="password" style={labelStyle}>
              Password
            </label>
            <input
              type="password"
              id="password"
              style={inputStyle}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Choose a password"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" style={labelStyle}>
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              style={inputStyle}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
            />
          </div>
          <button 
            style={buttonStyle} 
            type="submit"
            onMouseOver={(e) => e.target.style.backgroundColor = "#4338ca"}
            onMouseOut={(e) => e.target.style.backgroundColor = "#4f46e5"}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegistrationForm;
