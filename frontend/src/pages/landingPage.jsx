import React from 'react'
import {Link} from "react-router-dom";
import '../App.css';
function LandingPage() {
  return (
    <>
    <div className="landingPageContainer">
        <nav>
            <div className="navHeader">
               <h2>Apna Video Call</h2>
            </div>
            <div className="navlist">
               <p>Join as Guest</p>
               <Link to={"/auth"}><p>register</p></Link>
               <div role="button">
                <Link to={"/auth"}><p>login</p></Link>
               </div>
            </div>
        </nav>

          <div className="landingMainContainer">
          
          <div>
            <h1><span style={{ color: "orange" }}>Connect</span> with you loved once</h1>
            <p>Cover a distance by Vipin's Video conferencing app</p>
            <div role="button">
                <Link to={"/auth"}>Get Started</Link>
            </div>
          </div>

          <div>
            <img src="../../public/mobile.png" alt="hero image"></img>
          </div>
   </div>
    </div>

 
</>
  )
}

export default LandingPage