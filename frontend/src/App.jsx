// import './App.css'
import LandingPage from "./pages/landingPage";
import { Routes,BrowserRouter as Router,Route } from "react-router"
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
        </Routes>
        </Router> 
      
    </>
  )
}

export default App
