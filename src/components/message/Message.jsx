import "./message.css";
import { format } from "timeago.js";
import { useEffect, useRef } from "react";

const Message = ({ message, own, messages, profilePicture }) => {
  const scrollref = useRef();
  useEffect(() => {
    scrollref.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <div className={own ? "message own" : "message"} ref={scrollref}>
      <div className="messageTop">
        <img
          className="messageImg"
          src={
            profilePicture
              ? profilePicture
              : "http://hethongxephangtudong.net/public/client/images/no-avatar.png"
          }
          alt=""
        />
        <p className="messageText">{message.messages}</p>
      </div>
      <div className="messageBottom">{format(message.createAt)}</div>
    </div>
  );
};

export default Message;
