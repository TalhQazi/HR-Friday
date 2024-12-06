import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Logo from "../assets/images/header-black-logo.png";

function Login() {
  const [email, setEmail] = useState("");
  const { loginUser, user } = useContext(AuthContext);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    await loginUser(email, password);
    setLoading(false);
  };

  return (
    <div>
      <div style={{ overflowX: "hidden", fontFamily: "'Poppins'" }}>
        <section className="hero">
          <div className="hero-head">
            <div className="container">
              <nav className="navbar">
                <div className="container">
                  <div className="navbar-brand">
                    <a className="navbar-item" href="/">
                      <img
                        src={Logo}
                        alt="Logo"
                        height="250"
                        width="100"
                        style={{ maxHeight: "unset" }}
                      />
                    </a>
                    <span
                      className="navbar-burger burger"
                      data-target="navbarMenu"
                    >
                      <span></span>
                      <span></span>
                      <span></span>
                    </span>
                  </div>
                  <div
                    id="navbarMenu"
                    className="navbar-menu"
                    style={{ marginLeft: "auto", marginRight: "unset" }}
                  >
                    <div className="navbar-end">
                      <span className="navbar-item">
                        <a href="/#" style={{ color: 'black', fontSize: '1.4rem', textDecoration: 'underline' }}>
                          <span>FRIDAY's HRM software</span>
                        </a>
                      </span>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
          </div>
          <div
            className="hero-body"
            style={{
              padding: "1rem 2rem",
              flexDirection: "column",
              background: "linear-gradient(to bottom, #864def, #fff)",
            }}
          >
            <div className="container has-text-centered">
              <h1 id="firsth1">Please enter your credentials</h1>
              <form id="searchForm" onSubmit={handleLogin}>
                <div
                  style={{
                    display: "inline-flex",
                    flexDirection: "column",
                    marginBottom: "5rem",
                  }}
                >
                  <input
                    id="input1"
                    className="input"
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <br />
                  <input
                    id="input1"
                    className="input"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <br />
                  <button id="btn1" type="submit" disabled={loading}>
                    {loading ? 'Loading...' : 'Log In'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
        <script
          src="https://kit.fontawesome.com/114047c3df.js"
          crossOrigin="anonymous"
          defer
        ></script>
      </div>
    </div>
  );
}

export default Login;