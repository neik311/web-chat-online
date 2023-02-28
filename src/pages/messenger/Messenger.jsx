import "./messenger.css";
import send from "../../assets/send.png";
import CircularProgress from "@mui/material/CircularProgress";
import image from "../../assets/image.png";
import TextField from "@mui/material/TextField";
import Topbar from "../../components/topbar/Topbar";
import Conversation from "../../components/conversations/Conversation";
import MessageText from "../../components/message/messageText";
import MessageImage from "../../components/message/messageImage";
import ChatOnline from "../../components/chatOnline/chatOnline";
import InfoUser from "../../components/infoUser/infoUser";
import { useEffect, useState, useRef, useContext } from "react";
import { io } from "socket.io-client";
import { apiURL } from "../../config/config";
import { getGroupByUser } from "../../api/apiGroup";
import { getUserByUsername } from "../../api/apiUser";
import { getMessagesInGroup, createMessages } from "../../api/apiMessages";
import { uploadImage } from "../../ultis/uploadFile";
import { NotifiContext } from "../../context/notifiContext";

const socket = io(apiURL);

const Messenger = ({ user, setUser }) => {
  const MAX_SIZE = useRef(2097000); // 2mb
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [oppositeUser, setOppositeUser] = useState({});
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [image, setImage] = useState();
  const [base64image, setBase64image] = useState("");
  const [loading, setLoading] = useState(false);
  const { setNotifi } = useContext(NotifiContext);
  // console.log(conversations);
  const inputFile = useRef(null);
  console.log(image);

  useEffect(() => {
    //console.log("current chat ",currentChat)
    socket.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        messages: data.text,
        type: data.type,
        createAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      (arrivalMessage.sender === currentChat?.sender ||
        arrivalMessage.sender === currentChat.receive) &&
      setMessages((messages) => [...messages, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.emit("addUser", { id: user?.id, avatar: user?.avatar });
  }, []);

  useEffect(() => {
    socket.on("getUsers", (users) => {
      setOnlineUsers(users);
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getGroupByUser(user?.id);
      if (res.statusCode === "200") {
        setConversations(res.data || []);
      }
    };
    fetchData();
  }, [user?.id]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getMessagesInGroup(currentChat?.id);
      if (res.statusCode === "200") {
        setMessages(res.data);
      }
    };
    fetchData();
  }, [currentChat]);

  const onChangeFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = function (event) {
      setBase64image(event.target.result.toString());
    };
    reader.readAsDataURL(file);
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let sendMessage = newMessage;
    if (sendMessage === "" && !image) {
      return;
    }
    const receiverId =
      currentChat.sender === user.id ? currentChat.receive : currentChat.sender;
    let type = "text";
    if (image) {
      if (image.size > MAX_SIZE.current) {
        setNotifi(["Ảnh phải nhỏ hơn 2 mb"]);
        return;
      }
      setLoading(true);
      type = "image";
      sendMessage = await uploadImage(image);
    }

    socket.emit("sendMessage", {
      senderId: user.id,
      receiverId: receiverId,
      text: sendMessage,
      type: type,
    });

    try {
      const res = await createMessages(
        currentChat.id,
        sendMessage,
        user.id,
        type
      );
      if (res.statusCode === "200") {
        setMessages([...messages, res.data]);
      }
      setNewMessage("");
      setImage(null);
      setBase64image("");
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCurrentChat = (c) => {
    const fetchUser = async () => {
      let oppositeId = c.sender === user.id ? c.receive : c.sender;
      const res = await getUserByUsername(oppositeId);
      if (res.statusCode === "200") {
        setOppositeUser(res.data);
      }
    };
    fetchUser();
    setCurrentChat(c);
  };

  return (
    <>
      {user && (
        <>
          <Topbar
            setConversations={setConversations}
            user={user}
            setUser={setUser}
          />
          <div className="messenger">
            <div className="chatMenu">
              <div className="chatMenuWrapper">
                <ChatOnline onlineUsers={onlineUsers} currentId={user.id} />
                <h3>Tất cả kết nối</h3>
                <input
                  placeholder="Search for friends"
                  className="chatMenuInput"
                />
                {conversations.map((c, index) => (
                  <div
                    onClick={() => {
                      handleCurrentChat(c);
                    }}
                    key={index}
                  >
                    <Conversation conversation={c} currentUser={user} />
                  </div>
                ))}
              </div>
            </div>
            <div className="chatBox">
              <div className="chatBoxWrapper">
                {currentChat ? (
                  <>
                    <div className="chatBoxTop">
                      {oppositeUser.id &&
                        messages.map((m, index) => {
                          return (
                            <>
                              {m.type === "text" ? (
                                <MessageText
                                  message={m}
                                  own={m.sender === user.id}
                                  messages={messages}
                                  profilePicture={
                                    m.sender === user.id
                                      ? user.avatar
                                      : oppositeUser.avatar
                                  }
                                  index={index}
                                  key={index}
                                />
                              ) : (
                                <MessageImage
                                  message={m}
                                  own={m.sender === user.id}
                                  messages={messages}
                                  profilePicture={
                                    m.sender === user.id
                                      ? user.avatar
                                      : oppositeUser.avatar
                                  }
                                  index={index}
                                  key={index}
                                />
                              )}
                            </>
                          );
                        })}
                    </div>
                    <div className="chatBoxBottom">
                      <form style={{ width: "100%" }} onSubmit={handleSubmit}>
                        <input
                          type="file"
                          id="file"
                          ref={inputFile}
                          style={{ display: "none" }}
                          onChange={onChangeFile}
                        />
                        <img
                          src="https://img.icons8.com/fluency/48/null/image.png"
                          style={{
                            ...styles.icon,
                            marginLeft: "5px",
                            marginRight: "15px",
                          }}
                          onClick={() => {
                            inputFile.current.click();
                          }}
                        />
                        {loading === true ? (
                          <CircularProgress />
                        ) : !image ? (
                          <TextField
                            label="fullWidth"
                            id="fullWidth"
                            sx={{ width: "80%" }}
                            value={newMessage}
                            onChange={(e) => {
                              setNewMessage(e.target.value);
                            }}
                          />
                        ) : (
                          <>
                            <img
                              style={{
                                width: "auto",
                                height: "120px",
                                marginLeft: "20px",
                              }}
                              src={base64image}
                            />
                            <img
                              src="https://img.icons8.com/color/48/null/delete-forever.png"
                              style={{ ...styles.icon, marginLeft: "50px" }}
                              onClick={() => {
                                setImage(null);
                                setBase64image("");
                              }}
                            />
                          </>
                        )}

                        <img
                          src={send}
                          style={{ ...styles.icon, marginLeft: "3%" }}
                          onClick={handleSubmit}
                        />
                      </form>
                    </div>
                  </>
                ) : (
                  <span className="noCoverSactionText">
                    Nhấn vào người dùng để bắt đầu nhắn tin
                  </span>
                )}
              </div>
            </div>
            <div className="chatOnline">
              <div className="chatOnlineWrapper">
                <InfoUser
                  oppositeUser={oppositeUser}
                  user={user}
                  setUser={setUser}
                  setConversations={setConversations}
                  setOppositeUser={setOppositeUser}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Messenger;

let styles = {
  icon: {
    marginTop: "10px",
    width: "40px",
    height: "40px",
    cursor: "pointer",
  },
};
