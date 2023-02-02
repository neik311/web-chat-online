import "./messenger.css";
import Topbar from "../../components/topbar/Topbar";
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/chatOnline";
import InfoUser from "../../components/infoUser/infoUser";
import { useState } from "react";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { apiURL } from "../../config/config";
import {
  getGroupByUser,
  getUserByUsername,
  getMessagesInGroup,
  createMessages,
} from "../../api/apiCall";

const socket = io(apiURL);

const Messenger = ({ user, setUser }) => {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [oppositeUser, setOppositeUser] = useState({});
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  // console.log({ conversations });
  console.log({ currentChat });
  console.log({ messages });

  useEffect(() => {
    //console.log("current chat ",currentChat)
    socket.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        messages: data.text,
        createdAt: Date.now(),
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
    // console.log("add user");
    socket.emit("addUser", { id: user?.id, avatar: user?.avatar });
  }, []);

  useEffect(() => {
    socket.on("getUsers", (users) => {
      // console.log("users ", users);
      setOnlineUsers(users);
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getGroupByUser(user?.id);
      if (res.statusCode === "200") {
        setConversations(res.data);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage === "") {
      return;
    }

    const receiverId =
      currentChat.sender === user.id ? currentChat.receive : currentChat.sender;

    socket.emit("sendMessage", {
      senderId: user.id,
      receiverId: receiverId,
      text: newMessage,
    });

    try {
      const res = await createMessages(currentChat.id, newMessage, user.id);
      if ((res.statusCode = "200")) {
        setMessages([...messages, res.data]);
      }
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleCurrentChat = (c) => {
    const fetchUser = async () => {
      let oppositeId = c.sender === user.id ? c.receive : c.sender;
      const res = await getUserByUsername(oppositeId);
      if ((res.statusCode = "200")) {
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
          <Topbar setConversations={setConversations} userId={user.id} />
          <div className="messenger">
            <div className="chatMenu">
              <div className="chatMenuWrapper">
                <ChatOnline onlineUsers={onlineUsers} currentId={user.id} />
                <h3>all user</h3>
                <input
                  placeholder="Search for friends"
                  className="chatMenuInput"
                />
                {conversations.map((c) => (
                  <div
                    onClick={() => {
                      handleCurrentChat(c);
                    }}
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
                        messages.map((m) => {
                          return (
                            <Message
                              message={m}
                              own={m.sender === user.id}
                              messages={messages}
                              profilePicture={
                                m.sender === user.id
                                  ? user.profilePicture
                                  : oppositeUser.profilePicture
                              }
                            />
                          );
                        })}
                    </div>
                    <div className="chatBoxBottom">
                      <textarea
                        className="chatMessageInput"
                        placeholder="writing something ..."
                        onChange={(e) => {
                          setNewMessage(e.target.value);
                        }}
                        value={newMessage}
                      ></textarea>
                      <button
                        className="chatSubmitButton"
                        onClick={handleSubmit}
                      >
                        Send
                      </button>
                    </div>
                  </>
                ) : (
                  <span className="noCoverSactionText">
                    open a conversation to start a chat
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
