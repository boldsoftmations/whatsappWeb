import { useState, useCallback } from "react";
import "./App.css";

function App() {
  const [inputs, setInputs] = useState([]);

  const handleSubmit = useCallback(() => {
    console.log("submit function")
    console.log("submitted", inputs);
  },[inputs])

  const handleChange = useCallback((event) => {
    console.log("input changes");
    const { name, value } = event.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  },[])

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <h1>this is form</h1>
        <label>
          Enter your name:
          <input
            type="text"
            name="username"
            value={inputs.username || ""}
            onChange={(event, value) => handleChange(event)}
          />
        </label>
        <lable>
          Enter Your Password :
          <input
            type="password"
            name="password"
            value={inputs.password}
            onChange={(event, value) => handleChange(event)}
          />
        </lable>
        <input type="submit" />
      </form>
    </div>
  );
}

export default App;
