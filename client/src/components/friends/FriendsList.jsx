import { useContext, useEffect, useState } from "react";
import FriendCard from "./FriendCard";
import { Social } from "../../App";

import axios from 'axios'
export default function FriendsList() {
  const { user, token } = useContext(Social);
  const [dropdown, setDropdown] = useState(0);
  const [friends, setFriends] = useState([])
  const openDropdown = (e) => {
    console.log(e, dropdown)
    if (dropdown == e) {
      setDropdown(0)
    }
    setDropdown(e)
  };
  useEffect(() => {
    axios.get(`http://localhost:9000/friends/${user._id}`, {
      withCredentials: true,
      baseURL: "http://localhost:9000",
      headers: {
        authorization: `Bearer ${token}` 
      }
    })
    .then(res => {
      console.log(res.data)
      setFriends(res.data)
    })
  }, [user])
  return (
    <div className="absolute left-0 top-0 w-1/6 h-full bg-stone-200">
      <h2 className="text-center text-2xl mt-3 underline font-mono">Friends</h2>
      <ul className="bg-stone-100 h-full mx-1 my-2">
        {friends.length > 0
          ? friends.map((friend, idx) => {
              return (
                <li onClick={() => openDropdown(idx + 1)} key={idx} className="bg-stone-300 border-4 border-cyan-500 p-2 rounded-lg cursor-pointer hover:scale-95">
                  <FriendCard friend={friend} openDropdown={openDropdown} idx={idx} dropdown={dropdown}/>
                </li>
              );
            })
          : null}
      </ul>
    </div>
  );
}
