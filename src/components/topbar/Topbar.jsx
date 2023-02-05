import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { createGroup } from "../../api/apiCall";
import AlertDialogSlide from "../modalUser/popupUser";

export default function Topbar({ setConversations, userId }) {
  const user = {};
  const [textSearch, setTextSearch] = useState("");
  const [popupUser, setPopupUser] = useState(false);
  const handleSubmit = async (e) => {
    console.log(textSearch);
    e.preventDefault();
    setPopupUser(true);
    // const newUser = await getUserByUsername(textSearch);
    // await createConversations(userId, newUser._id);
    // setConversations(await getConversations(userId));
  };
  return (
    <>
      <div className="topbarContainer">
        <div className="topbarLeft">
          <Link
            to="/"
            style={{ textDecoration: "none" }}
            onClick={() => {
              window.location.reload();
            }}
          >
            <span className="logo">Messenger</span>
          </Link>
        </div>
        <div className="topbarCenter">
          <div className="searchbar">
            <Search className="searchIcon" />
            <form onSubmit={handleSubmit}>
              <input
                placeholder="connect to new users by username"
                className="searchInput"
                onChange={(e) => {
                  setTextSearch(e.target.value);
                }}
                value={textSearch}
              />
            </form>
          </div>
        </div>
        <div className="topbarRight">
          <div className="topbarIcons">
            <div className="topbarIconItem">
              <Person />
            </div>
            <div className="topbarIconItem">
              <Chat />
            </div>
            <div className="topbarIconItem">
              <Notifications />
            </div>
          </div>
          <Link
            to="/"
            onClick={() => {
              window.location.reload();
            }}
          >
            <img
              src={
                user.profilePicture
                  ? user.profilePicture
                  : "http://hethongxephangtudong.net/public/client/images/no-avatar.png"
              }
              alt=""
              className="topbarImg"
            />
          </Link>
        </div>
      </div>
      {popupUser && (
        <AlertDialogSlide
          textSearch={textSearch}
          popupUser={popupUser}
          setPopupUser={setPopupUser}
          userId={userId}
        />
      )}
      {/* <AlertDialogSlide
        textSearch={textSearch}
        popupUser={popupUser}
        setPopupUser={setPopupUser}
      /> */}
    </>
  );
}
