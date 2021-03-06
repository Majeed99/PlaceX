import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import userStatus from "./components/userStatus";
import HomePage from "./pages/HomePage";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import NavBar from "./components/NavBar";
import TimeLine from "./pages/TimeLine";
import Profile from "./pages/Profile";
import Friends from "./pages/Friends";
import EditProfile from "./pages/EditProfile";
import Search from "./pages/Search";
import User from "./pages/User";
import Notification from "./pages/Notification";
import NewPost from "./pages/NewPost";
import Post from "./pages/Post";
import Place from "./pages/Place";
import Chat from "./pages/Chat";
import Rooms from "./pages/Rooms";
import AdminSignIn from "./pages/AdminSignIn";
import Admin from "./pages/Admin";
import AOS from "aos";
import { useEffect } from "react";
import "aos/dist/aos.css";

function App() {
  let [auth, setAuth] = useState(false);
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <userStatus.Provider value={{ auth, setAuth }}>
      <div className="App">
        <BrowserRouter>
          <div className="navBar__cover">
            <NavBar />
          </div>
          <div className="pages__cover">
            <Routes>
              <Route exact path="/" element={<HomePage />} />
              <Route exact path="/signUp" element={<SignUp />} />
              <Route exact path="/SignIn" element={<SignIn />} />
              <Route exact path="/TimeLine" element={<TimeLine />} />
              <Route exact path="/Profile" element={<Profile />} />
              <Route exact path="/Friends" element={<Friends />} />
              <Route exact path="/EditProfile" element={<EditProfile />} />
              <Route exact path="/Search" element={<Search />} />
              <Route exact path="/User/:id" element={<User />} />
              <Route exact path="/Notification" element={<Notification />} />
              <Route exact path="/NewPost" element={<NewPost />} />
              <Route exact path="/Post/:userId/:postId" element={<Post />} />
              <Route exact path="/Place/:id" element={<Place />} />
              <Route exact path="/Chat/:roomId" element={<Chat />} />
              <Route exact path="/Rooms" element={<Rooms />} />
              {/*Admin Pages */}
              <Route exact path="/adminSignIn" element={<AdminSignIn />} />
              <Route exact path="/admin" element={<Admin />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </userStatus.Provider>
  );
}

export default App;
