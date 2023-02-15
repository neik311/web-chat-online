import { useEffect, useState } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Avatar from "@mui/material/Avatar";
import InfoPersonal from "../../components/profile/infoPersonal";
import "./profile.css";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';




const Profile = ({ user, setUser }) => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <div className="top">
        <Avatar
          sx={{
            width: 180,
            height: 180,
            top: "250px",
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
        nvkien
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
            <ul className="block-list">
              <li className="user-block">
                <div className="user-block-list">
                  <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg"  />
                  <h3>nameeee</h3>
                  <Button variant="contained" style={{background:"red"}} >Contained</Button>
                  </div> 
              </li>
              <li className="user-block">
                <div className="user-block-list">
                  <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg"  />
                  <h3>nameeee</h3>
                  <Button variant="contained" style={{background:"red"}} >Contained</Button>
                  </div> 
              </li><li className="user-block">
                <div className="user-block-list">
                  <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg"  />
                  <h3>nameeeoidjoaijoqijie</h3>
                  <Button variant="contained" style={{background:"red"}} >Contained</Button>
                  </div> 
              </li><li className="user-block">
                <div className="user-block-list">
                  <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg"  />
                  <h3>nee</h3>
                  <Button variant="contained" style={{background:"red"}} >Contained</Button>
                  </div> 
              </li>
            </ul>
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};
export default Profile;
