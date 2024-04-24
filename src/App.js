import { useState, useCallback } from "react";
import "./App.css";
import whatsappSVG from "./Images/whatsappSVG.svg";
import InputLabel from "./components/InputLabel/InputLabel";
import Button from "./components/Button/Button";

function App() {
  const [inputs, setInputs] = useState({});

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      console.log("Submitted", inputs);
    },
    [inputs]
  );

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
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
              <InputLabel
                label="Username"
                name="username"
                type="text"
                value={inputs.username}
                onChange={(event) => handleChange(event)}
              />
            </div>
            <div className="form-control">
              <InputLabel
                label="Password"
                name="password"
                type="password"
                value={inputs.password}
                onChange={(event) => handleChange(event)}
              />
            </div>
            <Button type="submit">Log In</Button>
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
