import moment from "moment";
import { useEffect, useRef, useState, useContext } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { NotifiContext } from "../../context/notifiContext";
import Line from "./Line";
import "./message.css";
import { deleteMessagesInGroup } from "../../api/apiMessages";

const Message = ({
  own,
  messages,
  profilePicture,
  index,
  userId,
  setMessages,
  socket,
  currentChat,
}) => {
  const message = messages[index];
  const { setNotifi } = useContext(NotifiContext);
  const scrollref = useRef();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [openDialog, setOpenDialog] = useState(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
    handleClose();
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    scrollref.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleDeleteMessage = async () => {
    const res = await deleteMessagesInGroup(userId, message.id);
    if (res.statusCode === "200") {
      const newMessages = messages.filter((m) => m.id !== message.id);
      socket.emit("deleteMessage", {
        receiverId:
          currentChat.receive === userId
            ? currentChat.sender
            : currentChat.receive,
      });
      setMessages(newMessages);
      setNotifi(["Xóa tin nhắn thành công", "success"]);
    }
    handleCloseDialog();
  };

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
                onClick={handleClick}
              >
                <p style={styles.messageText}>{message.messages}</p>
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
                <MenuItem onClick={handleClickOpenDialog}>Xóa</MenuItem>
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
              <div
                className="messageText"
                style={{ backgroundColor: "#E6E6E6" }}
              >
                <p style={{ paddingRight: "15px" }}>{message.messages}</p>
                <p style={styles.messageTimeReceive}>
                  {moment(message.createAt).format("hh:mm")}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Xác nhận xóa tin nhắn"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Hủy</Button>
          <Button onClick={handleDeleteMessage} autoFocus>
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
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
};
