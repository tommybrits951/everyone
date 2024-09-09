import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faMessage, faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
export default function FriendCard(props) {
  const [pic, setPic] = useState();
  const { friend, openDropdown, dropdown, idx } = props;

  function menuHandle(e) {
    return openDropdown(e);
  }

  useEffect(() => {
    axios
      .get(`http://localhost:9000/images/${friend.image_path}`, {
        withCredentials: true,
        baseURL: "http://localhost:9000",
      })
      .then((res) => {
        setPic(res.data);
      })
      .catch((err) => console.log(err));
  }, [friend]);

  return (
    <div className="" onClick={menuHandle}>
      <div className="flex">
        <img
          src={`http://localhost:9000/images/${friend.image_path}`}
          className="h-12 mx-3"
        />
        <h4>{friend.first_name}</h4>
      </div>
      <div
        className={`${
          dropdown === idx + 1 ? "relative" : "hidden"
        } text-center flex justify-around`}
      >
        <div className="hover:scale-105">
          <FontAwesomeIcon icon={faUser} />
          <p className="text-xs">Profile</p>
        </div>
        <div className="hover:scale-105">
          <FontAwesomeIcon icon={faMessage} />
          <p className="text-xs">Message</p>
        </div>
        <div className="hover:scale-105">
          <FontAwesomeIcon icon={faDeleteLeft} />
          <p className="text-xs">Remove</p>
        </div>
      </div>
    </div>
  );
}
