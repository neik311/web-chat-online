import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./conversation.css";
import { getUserByUsername } from "../../api/apiUser";

const Conversation = ({ conversation, currentUser }) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    const friendId =
      conversation.sender === currentUser.id
        ? conversation.receive
        : conversation.sender;

    const getUser = async () => {
      try {
        const res = await getUserByUsername(friendId);
        if (res.statusCode === "200") {
          setUser(res.data);
        }
        // console.log("res ",res.data)
      } catch (error) {
        console.log("err", error);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <>
      {user && (
        <div className="conversation">
          <img
            className="conversationImg"
            src={
              user?.avatar
                ? user?.avatar
                : "https://i0.wp.com/researchictafrica.net/wp/wp-content/uploads/2016/10/default-profile-pic.jpg?ssl=1"
            }
            alt=""
          />

          <span className="conversationName">{user?.id}</span>
        </div>
      )}
    </>
  );
};

export default Conversation;
