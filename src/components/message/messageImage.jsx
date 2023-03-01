import "./message.css";
import Line from "./Line";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { deleteMessagesInGroup } from "../../api/apiMessages";

const Message = ({
  message,
  own,
  messages,
  profilePicture,
  index,
  userId,
  setMessages,
}) => {
  const scrollref = useRef();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDeleteMessage = async () => {
    const res = await deleteMessagesInGroup(userId, message.id);
    const newMessages = messages.filter((m) => m.id !== message.id);
    setMessages(newMessages);
  };
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
                style={{ marginRight: "10px", backgroundColor: "white" }}
              >
                <img
                  src={message.messages}
                  alt=""
                  style={styles.messageImage}
                  onClick={handleClick}
                />
                <p style={styles.messageTimeSender}>
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
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleDeleteMessage}>Xóa</MenuItem>
              </Menu>
            </div>
          </div>
        </>
      ) : (
        <>
          <div ref={scrollref} style={{ marginLeft: "5px" }}>
            <div className="messageTop">
              <img
                className="messageImg"
                src={
                  profilePicture ||
                  "http://hethongxephangtudong.net/public/client/images/no-avatar.png"
                }
                alt=""
              />
              <div className="messageText" style={{ backgroundColor: "white" }}>
                <img
                  src={message.messages}
                  alt=""
                  style={styles.messageImage}
                />
                <p style={styles.messageTimeReceive}>
                  {moment(message.createAt).format("hh:mm")}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Message;

let styles = {
  messageText: {
    color: "white",
    paddingRight: "15px",
  },
  messageTimeSender: {
    fontSize: "10px",
    color: "#0431B4",
    width: "30px",
    marginLeft: "auto",
    marginRight: "5px",
  },
  messageTimeReceive: {
    fontSize: "10px",
    color: "#424242",
    width: "30px",
    marginLeft: "auto",
    marginRight: "5px",
  },
  messageImage: {
    with: "auto",
    height: "150px",
    borderRadius: "20px",
  },
};
