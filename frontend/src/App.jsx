import React, { useState } from "react";

import {
  BrowserRouter,
  Route,
  Routes,
  useNavigate,
  Navigate,
} from "react-router-dom";
import LikedRecipe from "./components/LikedRecipe";
import RecipeCardList from "./components/RecipeCardList";
import HomeRoute from "./routes/HomeRoute";
import NavigationBar from "./components/NavigationBar";
import LoginForm from "./components/LoginForm";
import Signup from "./components/Signup";
import Authentication from "./components/Authentication";
import PreferencesPage from "./components/PreferencePage";
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleLogin = (email, password) => {
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      
      <BrowserRouter>

        <Routes>
          {/* <Route path="/" */}
            {/* element={isLoggedIn ?<> <NavigationBar   onLogout={handleLogout} */}
            {/* isLoggedIn={isLoggedIn} /> <HomeRoute /> </>: <Navigate to="/LoginForm" />} */}
          {/* /> */}
            <Route path="/login" element={<Authentication onLogin={handleLogin} />} />
          <Route path="/Liked-Recipe" element={<><NavigationBar  onLogout={handleLogout}
                  isLoggedIn={isLoggedIn} /> <LikedRecipe /> </>} />
          <Route path="/LoginForm" element={isLoggedIn ? <Navigate to="/" /> : <LoginForm onAuthenticate={handleLogin} />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/preferences" element={<PreferencesPage />} />
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
      </BrowserRouter>
      
    </div>
  );
}

export default App;
