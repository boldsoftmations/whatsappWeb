import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { CustomLoader } from "./components/CustomLoader"; // Ensure this is the path to your SuspenseLoader
import "./App.css";
import { getLocalAccessToken } from "./Service/TokenService";

// Lazy load components
const LoginForm = React.lazy(() => import("./pages/LoginForm"));
const Home = React.lazy(() => import("./pages/Home"));

function App() {
  const PrivateRoute = () => {
    const token = getLocalAccessToken();
    return token ? <Home /> : <Navigate to="/" replace />;
  };

  return (
    <Router>
      <Suspense fallback={<CustomLoader open={true} />}>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/home" element={<PrivateRoute />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
