import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  // PWA install listener
  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });
  }, []);

  const installApp = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
    }
  };

  return (
    <BrowserRouter>
      <div className="container mt-3">

        {/* Install Button */}
        {deferredPrompt && (
          <button onClick={installApp} className="btn btn-success mb-3">
            📲 Install App
          </button>
        )}

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;