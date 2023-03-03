import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Avatar from "@mui/material/Avatar";
import InfoPersonal from "../../components/profile/infoPersonal";
import ListBlock from "../../components/profile/listBlock";
import back from "../../assets/go-back.png";
import "./profile.css";
import { UserContext } from "../../context/userContext";

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const [value, setValue] = useState("1");
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <div className="top">
        <img
          src={back}
          style={{
            marginLeft: "20px",
            marginTop: "10px",
            width: "60px",
            height: "60px",
            cursor: "pointer",
          }}
          onClick={() => {
            navigate("/messenger");
          }}
        />
        <Avatar
          sx={{
            width: 180,
            height: 180,
            top: "180px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
          alt="Remy Sharp"
          src={
            user?.avatar
              ? user.avatar
              : "http://hethongxephangtudong.net/public/client/images/no-avatar.png"
          }
        />
      </div>
      <h2
        style={{
          textAlign: "center",
          marginTop: "40px",
        }}
      >
        {user?.id}
      </h2>
      <Box
        sx={{
          width: "600px",
          typography: "body1",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider", with: "220px" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab
                label="Thông tin"
                value="1"
                sx={{ marginLeft: "auto", marginRight: "auto" }}
              />
              <Tab
                label="Đã chặn"
                value="2"
                sx={{ marginLeft: "auto", marginRight: "auto" }}
              />
            </TabList>
          </Box>
          <TabPanel value="1">
            <InfoPersonal user={user} setUser={setUser} />
          </TabPanel>
          <TabPanel value="2">
            <ListBlock user={user} />
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};
export default Profile;
