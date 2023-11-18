import React, { useState } from "react";

import {
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LikedRecipe from "./components/LikedRecipe";
import HomeRoute from "./routes/HomeRoute";
import NavigationBar from "./components/NavigationBar";
import LoginForm from "./components/LoginForm";
import Signup from "./components/Signup";
import TopRecipes from "./components/TopRecipes";
import Authentication from "./components/Authentication";
import PreferencesPage from "./components/PreferencePage";
import { useLocation } from "react-router-dom";
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleLogin = (email, password) => {
    setIsLoggedIn(true);
  };

  const location = useLocation();
  const appStyle = {};
console.log("window pathname", location.pathname);
if (location.pathname === "/") {
  appStyle.backgroundImage = 'url("/HomeRouteImg.png")';
  
    } else if (location.pathname === '/Profile') {
      appStyle.backgroundImage = 'url("/HomeRouteImg.png")';
    } else {
      appStyle.backgroundImage = 'url("/BackDrop.png")';
      appStyle.position = "relative"
    
    }
    appStyle.backgroundSize = 'cover';
    appStyle.backgroundRepeat = 'no-repeat';
    appStyle.backgroundColor = 'transparent';
    appStyle.boxShadow = 'none';
  

  return (

    <div className="App" style={{...appStyle}}>

    

        <Routes>
  

          <Route path="/Favourites" element={<><NavigationBar onLogout={handleLogout}
            isLoggedIn={isLoggedIn} /> <LikedRecipe /> </>} />
          <Route path="/Top Rated" element={<><NavigationBar onLogout={handleLogout}
            isLoggedIn={isLoggedIn} /> <TopRecipes /> </>} />
          <Route path="/Preferences" element={<><NavigationBar onLogout={handleLogout}
            isLoggedIn={isLoggedIn} /> <PreferencesPage /> </>} />

          <Route path="/login" element={<Authentication onLogin={handleLogin} />} />
          <Route path="/LoginForm" element={isLoggedIn ? <Navigate to="/" /> : <LoginForm onAuthenticate={handleLogin} />} />
          <Route path="/Signup" element={<Signup />} />
          <Route
            path="*"
            element={
              <>
                <NavigationBar
                  onLogout={handleLogout}
                  isLoggedIn={isLoggedIn}
                />
                <HomeRoute />
              </>

            }
          />
        </Routes>
      
    </div>

  );
}

export default App;
