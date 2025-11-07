// import './App.css'
import LandingPage from "./pages/landingPage";
import Authentication from "./pages/authentication";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";  // ✅ yeh import zaroori hai



function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<Authentication />} />
          
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
