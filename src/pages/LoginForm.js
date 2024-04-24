import React, { useState, useCallback } from "react";
import InputLabel from "../components/InputLabel/InputLabel";
import Button from "../components/Button/Button";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import whatsappSVG from "../Images/whatsappSVG.svg";

function LoginForm() {
  const [inputs, setInputs] = useState({});
  const navigation = useNavigate(); // Use useNavigate hook to get the navigation function

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      console.log("Submitted", inputs);
      navigation("/home"); // Call navigation function directly
    },
    [inputs, navigation] // Include navigation in the dependencies array
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
                onChange={handleChange}
              />
            </div>
            <div className="form-control">
              <InputLabel
                label="Password"
                name="password"
                type="password"
                value={inputs.password}
                onChange={handleChange}
              />
            </div>
            <Button type="submit">Log In</Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
