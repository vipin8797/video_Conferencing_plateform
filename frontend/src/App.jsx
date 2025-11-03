// import './App.css'
import LandingPage from "./pages/landingPage";
import Authentication from "./pages/authentication";
import { Routes,BrowserRouter as Router,Route } from "react-router"
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/auth" element={<Authentication/>}/>
        </Routes>
        </Router> 
      
    </>
  )
}

export default App
