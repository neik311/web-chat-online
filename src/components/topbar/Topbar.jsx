import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useContext, useState } from "react";
import "./topbar.css";
import AlertDialogSlide from "../modalUser/popupUser";
import { UserContext } from "../../context/userContext";

export default function Topbar({ setConversations, socket }) {
  const { user, setUser } = useContext(UserContext);
  const [textSearch, setTextSearch] = useState("");
  const [popupUser, setPopupUser] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleLogout = () => {
    localStorage.setItem("accessToken", "");
    localStorage.setItem("refreshToken", "");
    socket.disconnect();
    setUser("");
    navigate("/login");
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
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
            // onClick={() => {
            //   window.location.reload();
            // }}
          >
            <span className="logo">Nhắn tin online</span>
          </Link>
        </div>
        <div className="topbarCenter">
          <div className="searchbar">
            <Search className="searchIcon" />
            <form onSubmit={handleSubmit}>
              <input
                placeholder="nhập username hoặc email"
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
            <div className="topbarIconItem">{/* <Person /> */}</div>
            <div className="topbarIconItem">{/* <Chat /> */}</div>
            <div className="topbarIconItem">{/* <Notifications /> */}</div>
          </div>
          <img
            onClick={handleClick}
            src={
              user?.avatar
                ? user.avatar
                : "http://hethongxephangtudong.net/public/client/images/no-avatar.png"
            }
            alt=""
            className="topbarImg"
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
            <MenuItem
              onClick={() => {
                navigate("/profile");
              }}
            >
              Trang cá nhân
            </MenuItem>
            <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
            {user?.role === "admin" && (
              <MenuItem
                onClick={() => {
                  navigate("/admin/user-manager");
                }}
              >
                Quản lý
              </MenuItem>
            )}
          </Menu>
        </div>
      </div>
      {popupUser && (
        <AlertDialogSlide
          textSearch={textSearch}
          popupUser={popupUser}
          setPopupUser={setPopupUser}
          userId={user.id}
          setConversations={setConversations}
          socket={socket}
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
