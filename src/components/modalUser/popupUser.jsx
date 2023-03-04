import * as React from "react";
import { useEffect, useState, useContext } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Slide from "@mui/material/Slide";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { getUser } from "../../api/apiUser";
import { NotifiContext } from "../../context/notifiContext";
import {
  createGroup,
  getGroup,
  deleteGroup,
  getGroupByUser,
} from "../../api/apiGroup";
import {
  getBlockUser,
  createBlockUser,
  deleteBlockUser,
} from "../../api/apiBlock";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({
  textSearch,
  popupUser,
  setPopupUser,
  userId,
  setConversations,
  socket,
}) {
  const [foundUser, setFoundUser] = useState();
  const [statusButton, setStatusButton] = useState([true, true]);
  const { setNotifi } = useContext(NotifiContext);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getUser(textSearch);
      if (res.statusCode !== "200") {
        setFoundUser(null);
        return;
      }
      // console.log(userId, " ", res.data.id);
      const group = await getGroup(userId, res.data.id);
      const blockUser = await getBlockUser(userId, res.data.id);
      let newStatus = [true, true];
      if (group.data) {
        newStatus[0] = false;
      }
      if (blockUser.data) {
        newStatus[1] = false;
      }
      setFoundUser(res.data);
      setStatusButton(newStatus);
    };
    fetchData();
  }, []);
  // console.log(foundUser);

  const handleClosePopup = () => {
    setPopupUser(false);
  };
  const handleGroup = async () => {
    //tạo kết nối
    if (statusButton[0] === true) {
      const res = await createGroup(userId, foundUser.id);
      if (res.statusCode === "200") {
        setStatusButton([false, statusButton[1]]);
        setConversations((await getGroupByUser(userId)).data);
        setNotifi([res?.message, "success"]);
        handleConversations();
        return;
      }
      setNotifi([res?.message]);
      return;
    }
    // hủy kết nối
    const res = await deleteGroup(userId, foundUser.id);
    if (res.statusCode === "200") {
      setNotifi(["Hủy kết nối thành công", "success"]);
      setStatusButton([true, statusButton[1]]);
      setConversations((await getGroupByUser(userId)).data);
      handleConversations();
      return;
    }
    setNotifi(["Đã xảy ra lỗi"]);
  };

  const handleBlock = async () => {
    // chặn
    if (statusButton[1] === true) {
      const res = await createBlockUser(userId, foundUser.id);
      if (res.statusCode === "200") {
        setNotifi([`Chặn ${foundUser?.id} thành công`, "success"]);
        setStatusButton([true, false]);
        setConversations((await getGroupByUser(userId)).data);
        handleConversations();
        return;
      }
      setNotifi([res?.message]);
      return;
    }
    // hủy chặn
    const res = await deleteBlockUser(userId, foundUser.id);
    if (res.statusCode === "200") {
      setNotifi([`Hủy Chặn ${foundUser?.id} thành công`, "success"]);
      setStatusButton([statusButton[0], true]);
      return;
    }
    setNotifi([res?.message]);
  };

  const handleConversations = () => {
    socket.emit("sendConversations", {
      senderId: userId,
      receiveId: foundUser.id,
    });
  };

  return (
    <div>
      <Dialog
        open={popupUser}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClosePopup}
        aria-describedby="alert-dialog-slide-description"
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{ marginLeft: "auto", marginRight: "auto" }}
        >
          <Avatar
            sx={{
              width: 70,
              height: 70,
              marginTop: "10px",
              marginBottom: "10px",
            }}
            alt="Remy Sharp"
            src={
              foundUser
                ? foundUser.avatar
                : "http://hethongxephangtudong.net/public/client/images/no-avatar.png"
            }
          />
        </Stack>
        <p
          style={{ marginLeft: "auto", marginRight: "auto", fontSize: "25px" }}
        >
          {foundUser?.id || "user not found"}
        </p>
        <p
          style={{ marginLeft: "auto", marginRight: "auto", fontSize: "20px" }}
        >
          {foundUser?.firstName + " " + foundUser?.lastName}
        </p>
        <DialogContent sx={{ marginLeft: "auto", marginRight: "auto" }}>
          <DialogContentText id="alert-dialog-slide-description">
            {foundUser?.describe}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ minWidth: "230px" }}>
          {foundUser && foundUser?.id !== userId && (
            <>
              <Button
                onClick={handleGroup}
                sx={{ marginLeft: "auto", marginRight: "auto" }}
              >
                {statusButton[0] === true ? "Kết nối" : "Huỷ kết nối"}
              </Button>
              <Button
                onClick={handleBlock}
                sx={{ marginLeft: "auto", marginRight: "auto" }}
              >
                {statusButton[1] === true ? "Chặn" : "Hủy chặn"}
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
