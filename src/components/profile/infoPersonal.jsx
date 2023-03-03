import * as React from "react";
import { useEffect, useState, useContext, useRef } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { updateUser } from "../../api/apiUser";
import { NotifiContext } from "../../context/notifiContext";
import { uploadFile } from "../../ultis/uploadFile";

export default function InfoPersonal({ user, setUser }) {
  const MAX_SIZE = useRef(5242880); // 5mb
  const { setNotifi } = useContext(NotifiContext);
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [describe, setDescribe] = useState("");
  const [avatar, setAvatar] = useState();
  useEffect(() => {
    console.log("reset ");
    setId(user?.id || "");
    setEmail(user?.email || "");
    setFirstName(user?.firstName);
    setLastName(user?.lastName);
    setDescribe(user?.describe);
  }, [user]);

  const handleUpdateUser = async () => {
    if (avatar?.size > MAX_SIZE.current) {
      setNotifi(["Ảnh phải nhỏ hơn 5 mb"]);
      return;
    }
    let url = null;
    if (avatar) {
      url = await uploadFile(avatar);
    }
    let newUser = {
      id: user.id,
      firstName: firstName,
      lastName: lastName,
      describe: describe,
      avatar: url,
    };
    const res = await updateUser(newUser);
    if (res.statusCode === "200") {
      setNotifi(["Cập nhật dữ liệu thành công", "success"]);
      newUser = user;
      newUser.firstName = firstName || user.firstName;
      newUser.lastName = lastName || user.lastName;
      newUser.describe = describe || user.describe;
      newUser.avatar = url || user.avatar;
      setUser(newUser);
      return;
    }
    setNotifi([res?.message]);
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField disabled id="outlined-required" label="Id" value={id} />
        <TextField
          disabled
          id="outlined-disabled"
          label="Email"
          value={email}
        />
      </div>
      <div>
        <TextField
          required
          id="outlined-read-only-input"
          label="First name"
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
        <TextField
          required
          id="outlined-read-only-input"
          label="Last name"
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />
      </div>
      <TextField
        label="Describe"
        multiline
        rows={2}
        maxRows={6}
        value={describe}
        onChange={(e) => {
          setDescribe(e.target.value);
        }}
        sx={{ width: "52ch !important" }}
      />

      <TextField
        id="outlined-basic-7"
        label="Ảnh đại diện"
        variant="outlined"
        type="file"
        required
        onChange={(e) => {
          setAvatar(e.target.files[0]);
        }}
        sx={{ paddingLeft: "150px", width: "35ch !important" }}
      />
      <div style={{ marginLeft: "60%", marginTop: "10px" }}>
        <Button variant="contained" onClick={handleUpdateUser}>
          Lưu thay đổi
        </Button>
      </div>
    </Box>
  );
}
