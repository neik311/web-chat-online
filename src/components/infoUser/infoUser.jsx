import "./infoUser.css";
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { NotifiContext } from "../../context/notifiContext";
import { UserContext } from "../../context/userContext";
import { deleteGroup, getGroupByUser } from "../../api/apiGroup";
import { createBlockUser } from "../../api/apiBlock";

const InfoUser = ({ oppositeUser, setConversations, setOppositeUser }) => {
  const { user, setUser, socket } = useContext(UserContext);
  const { setNotifi } = useContext(NotifiContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.setItem("accessToken", "");
    localStorage.setItem("refreshToken", "");
    setUser("");
    socket.disconnect();
    navigate("/login");
    setNotifi(["Đăng xuất thành công", "acccess"]);
  };

  const handleCancelConnect = async () => {
    const res = await deleteGroup(user?.id, oppositeUser?.id);
    if (res.statusCode === "200") {
      setConversations((await getGroupByUser(user?.id)).data);
      setOppositeUser({});
      setNotifi([`Hủy kết nối ${oppositeUser?.id} thành công`, "success"]);
      return;
    }
    setNotifi([res?.message]);
    return;
  };

  const handleBlockUser = async () => {
    const res = await createBlockUser(user?.id, oppositeUser?.id);
    if (res.statusCode === "200") {
      setConversations((await getGroupByUser(user?.id)).data);
      setOppositeUser({});
      setNotifi([`Chặn ${oppositeUser?.id} thành công`, "success"]);
      return;
    }
    setNotifi([res?.message]);
    return;
  };
  return (
    <>
      {oppositeUser.id ? (
        <div className="opposite" style={{ backgroundColor: "#EFFBFB" }}>
          <div className="oppositeAvatar">
            <img
              src={
                oppositeUser.avatar
                  ? oppositeUser.avatar
                  : "http://hethongxephangtudong.net/public/client/images/no-avatar.png"
              }
              alt=""
            />
          </div>
          <p>{oppositeUser.id}</p>
          <p>{oppositeUser.firstName + " " + oppositeUser.lastName}</p>
          <div className="btn-user">
            <button onClick={handleCancelConnect}> Huỷ kết nối </button>
            <button onClick={handleBlockUser}> Chặn kết nối </button>
          </div>
        </div>
      ) : (
        <div className="opposite" style={{ backgroundColor: "#EFFBFB" }}>
          <div className="oppositeAvatar">
            <img
              src={
                user.avatar
                  ? user.avatar
                  : "http://hethongxephangtudong.net/public/client/images/no-avatar.png"
              }
              alt=""
            />
          </div>
          <p> {user.id} </p>
          <p> {user.firstName + " " + user.lastName} </p>
          <p> {user.email} </p>
          <div className="btn-user">
            <button onClick={handleLogout}> Đăng xuất </button>
            <button
              onClick={() => {
                navigate("/profile");
              }}
            >
              Trang cá nhân
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default memo(InfoUser);
