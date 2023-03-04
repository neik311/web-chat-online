import { useState, useEffect } from "react";
import "./chatOnline.css";

const ChatOnline = ({ onlineUsers, currentId }) => {
  return (
    <>
      <h3>Người dùng trực tuyến</h3>
      <div className="chatOnline">
        {onlineUsers.map(
          (value, index) =>
            value.id !== currentId && (
              <div className="chatOnlineFriend" key={index}>
                <div className="chatOnlineImgContainer">
                  <img
                    className="chatOnlineImg"
                    src={
                      value.avatar
                        ? value.avatar
                        : "http://hethongxephangtudong.net/public/client/images/no-avatar.png"
                    }
                    alt=""
                  />
                </div>
                <span className="chatOnlineName">{value.id || "noname"}</span>
              </div>
            )
        )}
      </div>
    </>
  );
};

export default ChatOnline;
