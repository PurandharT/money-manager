import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />   {/* ✅ ADD */}
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

import { useEffect, useState } from "react";

function App() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

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
    <div>
      <button onClick={installApp} className="btn btn-success">
        📲 Install App
      </button>

      {/* your existing routes/components */}
    </div>
  );
}

export default App;