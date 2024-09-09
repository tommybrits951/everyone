import { useState, createContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./components/user/Register";
import Login from "./components/auth/Login";
import Profile from "./components/user/Profile";
import UserLayout from "./components/UserLayout";
import Layout from "./components/Layout";
import axios from "axios";
import "./App.css";
import FriendsList from "./components/friends/FriendsList";
import { axiosConfig, baseUrl } from "./config/axiosConfig";

export const Social = createContext();

export default function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [openTopMenu, setOpenTopMenu] = useState(false);
  const [friends, setFriends] = useState([]);

  function openNavMenu(e) {
    if (e.target.title === "top-menu-btn") {
      setOpenTopMenu(!openTopMenu);
    } else {
      setOpenTopMenu(false);
    }
  }

  // To check if refresh token is still good when access token isn't valid
  function checkRefresh() {
    if (token === null) {
      axios
        .get(`${baseUrl}/auth`, {
          ...axiosConfig,
          headers: {
            authorization: token,
          },
        })
        .then((res) => {
          setToken(res.data.accessToken);
          setUser(res.data);
        })
        .catch((err) => console.log(err));
    }
  }

  // get friends
  

  useEffect(() => {
    checkRefresh();
  
  }, [token]);
  return (
    <Social.Provider
      value={{
        user,
        openNavMenu,
        token,
        friends,
        setUser,
        setToken,
      }}
    >
      <main className="absolute w-full h-full top-0 left-0 m-0 overflow-hidden bg-white">
        <Routes>
          {token === null ? (
            <Route element={<Layout />}>
              <Route element={<Login />} path="/" />
              <Route element={<Register />} path="/register" />
            </Route>
          ) : (
            <Route element={<UserLayout />}>
              <Route element={<FriendsList />} path="/" />
              <Route element={<Profile />} path="/user/:id" />
            </Route>
          )}
        </Routes>
      </main>
    </Social.Provider>
  );
}
