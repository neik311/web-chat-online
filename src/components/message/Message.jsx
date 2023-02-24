import "./message.css";
import Line from "./Line";
import moment from "moment";
import { useEffect, useRef, useState } from "react";

const Message = ({ message, own, messages, profilePicture, index, key }) => {
  const scrollref = useRef();
  useEffect(() => {
    scrollref.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <>
      {(index === 0 ||
        moment(messages[index]?.createAt).format("DD/MM/YYYY") !==
          moment(messages[index - 1]?.createAt).format("DD/MM/YYYY")) && (
        <Line time={message.createAt} />
      )}
      {own ? (
        <>
          <div
            ref={scrollref}
            style={{
              marginLeft: "auto",
              marginRight: "5px",
              // backgroundColor: "#417DC6",
            }}
          >
            <div className="messageTop">
              <div
                className="messageText"
                style={{ backgroundColor: "#417DC6", marginRight: "10px" }}
              >
                <p style={{ color: "white", paddingRight: "15px" }}>
                  {message.messages}
                </p>
                <p
                  style={{
                    fontSize: "10px",
                    color: "#0431B4",
                    width: "30px",
                    marginLeft: "auto",
                    marginRight: "5px",
                  }}
                >
                  {moment(message.createAt).format("hh:mm")}
                </p>
              </div>
              <img
                className="messageImg"
                src={
                  profilePicture
                    ? profilePicture
                    : "http://hethongxephangtudong.net/public/client/images/no-avatar.png"
                }
                alt=""
              />
            </div>
            {/* <div className="messageBottom">{format(message.createAt)}</div> */}
          </div>
        </>
      ) : (
        <>
          <div
            ref={scrollref}
            style={{
              marginLeft: "5px",
              // backgroundColor: "#417DC6",
            }}
          >
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
              <div
                className="messageText"
                style={{ backgroundColor: "#E6E6E6" }}
              >
                <p style={{ paddingRight: "15px" }}>{message.messages}</p>
                <p
                  style={{
                    fontSize: "10px",
                    color: "#424242",
                    width: "30px",
                    marginLeft: "auto",
                    marginRight: "5px",
                  }}
                >
                  {moment(message.createAt).format("hh:mm")}
                </p>
              </div>
            </div>
            {/* <div className="messageBottom">{format(message.createAt)}</div> */}
          </div>
        </>
      )}
      {/* { <div className={own ? "message own" : "message"} ref={scrollref}>
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
    </div>} */}
    </>
  );
};

export default Message;
