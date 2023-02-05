import * as React from "react";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { getUser, createGroup } from "../../api/apiCall";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({
  textSearch,
  popupUser,
  setPopupUser,
  userId,
}) {
  const [openLoading, setOpenLoading] = useState(false);
  const [error, setError] = useState("");
  const [foundUser, setFoundUser] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const res = await getUser(textSearch);
      if ((res.statusCode = "200")) {
        setFoundUser(res.data);
        return;
      }
      setFoundUser(null);
    };
    fetchData();
  }, []);
  console.log(foundUser);

  const handleClosePopup = () => {
    setPopupUser(false);
  };
  const handleCreateGroup = async () => {
    setOpenLoading(true);
    const res = await createGroup(userId, foundUser.id);
    setOpenLoading(false);
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
    }
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
        {/* <DialogTitle
          sx={{ marginLeft: "auto", marginRight: "auto", fontSize: "25px" }}
        >
          {foundUser?.id || "user not found"}
        </DialogTitle> */}
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
        {!openLoading ? (
          <DialogActions sx={{ minWidth: "230px" }}>
            {foundUser && (
              <>
                <Button
                  onClick={handleCreateGroup}
                  sx={{ marginLeft: "auto", marginRight: "auto" }}
                >
                  Kết nối
                </Button>
                <Button
                  onClick={handleCreateGroup}
                  sx={{ marginLeft: "auto", marginRight: "auto" }}
                >
                  Chặn
                </Button>{" "}
              </>
            )}
          </DialogActions>
        ) : (
          <Box
            sx={{
              width: "100%",
              height: "30px",
              minWidth: "250px",
              marginBottom: "10px",
            }}
          >
            <LinearProgress />
          </Box>
        )}
        <p
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            color: "red",
            fontSize: "15px",
          }}
        >
          {error}
        </p>
      </Dialog>
    </div>
  );
}
