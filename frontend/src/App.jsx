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
import TopRecipes from "./components/TopRecipes";
import Authentication from "./components/Authentication";
import PreferencesPage from "./components/PreferencePage";
import SimilarRecipes from "./components/SimilarRecipesCard";
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
          {/* <Route
            path="/"
            element={isLoggedIn ? <> <NavigationBar onLogout={handleLogout}
              isLoggedIn={isLoggedIn} /> <HomeRoute /> </> : <Navigate to="/LoginForm" />}
          /> */}

          <Route path="/Favourites" element={<><NavigationBar onLogout={handleLogout}
            isLoggedIn={isLoggedIn} /> <LikedRecipe /> </>} />
          <Route path="/Top Rated" element={<><NavigationBar onLogout={handleLogout}
            isLoggedIn={isLoggedIn} /> <TopRecipes /> </>} />
          <Route path="/Preferences" element={<><NavigationBar onLogout={handleLogout}
            isLoggedIn={isLoggedIn} /> <PreferencesPage /> </>} />
          {/* <Route path="/" */}
          {/* element={isLoggedIn ?<> <NavigationBar   onLogout={handleLogout} */}
          {/* isLoggedIn={isLoggedIn} /> <HomeRoute /> </>: <Navigate to="/LoginForm" />} */}
          {/* /> */}
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
      </BrowserRouter>
    </div>

  );
}

export default App;
