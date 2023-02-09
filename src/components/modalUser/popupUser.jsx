import * as React from "react";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Slide from "@mui/material/Slide";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { getUser } from "../../api/apiUser";
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
}) {
  const [error, setError] = useState("");
  const [foundUser, setFoundUser] = useState();
  const [statusButton, setStatusButton] = useState([true, true]);
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
    if (statusButton[0] === true) {
      const res = await createGroup(userId, foundUser.id);
      if (res.statusCode === "401") {
        setError("bạn đã chặn người dùng này");
        return;
      }
      if (res.statusCode === "402") {
        setError("Người dùng này đã chặn bạn");
        return;
      }
      if (res.statusCode === "403") {
        setError("người dùng này đã được kết nối");
        return;
      }
      if (res.statusCode === "200") {
        setError("Tạo kết nối thành công");
        setStatusButton([false, statusButton[1]]);
        setConversations((await getGroupByUser(userId)).data);
      }
      return;
    }
    const res = await deleteGroup(userId, foundUser.id);
    if (res.statusCode === "200") {
      setError("Hủy kết nối thành công");
      setStatusButton([true, statusButton[1]]);
      setConversations((await getGroupByUser(userId)).data);
      return;
    }
    setError("Đã xảy ra lỗi");
  };

  const handleBlock = async () => {
    if (statusButton[1] === true) {
      const res = await createBlockUser(userId, foundUser.id);
      if (res.statusCode === "400") {
        setError("Đã xảy ra lỗi");
        return;
      }
      if (res.statusCode === "200") {
        setError("Chặn thành công");
        setStatusButton([true, false]);
        setConversations((await getGroupByUser(userId)).data);
      }
      return;
    }
    const res = await deleteBlockUser(userId, foundUser.id);
    if (res.statusCode === "200") {
      setError("Hủy chặn thành công");
      setStatusButton([statusButton[0], false]);
      return;
    }
    setError("Đã xảy ra lỗi");
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
          {foundUser && (
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
        <p style={{ marginLeft: "auto", marginRight: "auto", color: "red" }}>
          {error}
        </p>
      </Dialog>
    </div>
  );
}
