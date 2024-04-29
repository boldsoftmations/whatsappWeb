// App.js
import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { getLocalAccessToken } from "./Service/TokenService";

// Lazy load components
const LoginForm = React.lazy(() => import("./pages/LoginForm"));
const Home = React.lazy(() => import("./pages/Home"));

function App() {
  const accessToken = getLocalAccessToken();

  // PrivateRoute component to manage access to protected routes
  const PrivateRoute = ({ children }) => {
    return accessToken ? children : <Navigate to="/" replace />;
  };

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/home" element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
