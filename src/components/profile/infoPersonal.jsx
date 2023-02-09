import * as React from "react";
import { useEffect, useState, useRef } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";

export default function InfoPersonal({ user, setUser }) {
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [describe, setDescribe] = useState("");
  useEffect(() => {
    console.log("reset ");
    setId(user?.id || "");
    setEmail(user?.email || "");
    setFirstName(user?.firstName);
    setLastName(user?.lastName);
    setDescribe(user?.describe);
  }, [user]);
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
      <div>
        <TextField
          label="Describe"
          multiline
          rows={2}
          maxRows={6}
          value={describe}
          onChange={(e) => {
            setDescribe(e.target.value);
          }}
        />
      </div>
      <div style={{ marginLeft: "15px" }}>
        <label>Avatar </label>
        <Input type="file" />
      </div>
      <div style={{ marginLeft: "60%", marginTop: "10px" }}>
        <Button variant="contained">Lưu thay đổi</Button>
      </div>
    </Box>
  );
}
