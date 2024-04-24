import { useState, useCallback } from "react";
import "./App.css";
import whatsappSVG from './Images/whatsappSVG.svg'; 

function App() {
  const [inputs, setInputs] = useState({});

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    console.log("Submitted", inputs);
  }, [inputs]);

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setInputs(prev => ({ ...prev, [name]: value }));
  }, []);

  return (
    <div className="App">
    <div className="split left">
      <img src={whatsappSVG} alt="WhatsApp" />
    </div>
    <div className="split right">
      <h1 className="company-name">BoldSoftmation LLP</h1>
      <div className="centered">
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-control">
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                value={inputs.username || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-control">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={inputs.password || ""}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="submit-button">Log In</button>
            <div className="change-password-link">
            <a href="/change-password">Change Password?</a>
          </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
