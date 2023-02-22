import { useEffect, useState, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { NotifiContext } from "../../context/notifiContext";
import { getBlockUser, deleteBlockUser } from "../../api/apiBlock";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ListBlock({ user }) {
  const [blocks, setBlocks] = useState([]);
  const { notifi, setNotifi } = useContext(NotifiContext);
  useEffect(() => {
    const fetchData = async () => {
      const res = await getBlockUser(user?.id, "");
      if (res.statusCode === "200") {
        setBlocks(res.data);
      }
    };
    fetchData();
  }, []);
  const handleDeleteBlock = async (idBlocked) => {
    console.log(idBlocked);
    setNotifi(["Hủy chặn thành công", "success"]);
    const res = await deleteBlockUser(user?.id, idBlocked);
    if (res.statusCode === "200") {
      let newBlocks = blocks.filter((block) => block?.blocked !== idBlocked);
      setBlocks(newBlocks);
      return;
    }
    setNotifi([res.message]);
  };

  return (
    // <div>
    //   <ul className="block-list">
    //     {blocks.map((block) => (
    //       <li style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}>
    //         <div className="user-block-list">
    //           <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
    //           <h3>{block?.blocked}</h3>
    //           <Button
    //             variant="contained"
    //             style={{ background: "red" }}
    //             onClick={() => {
    //               handleDeleteBlock(block?.blocked);
    //             }}
    //           >
    //             Hủy chặn
    //           </Button>
    //         </div>
    //       </li>
    //     ))}
    //   </ul>
    // </div>
    <Box
      sx={{
        width: "300px",
        marginLeft: "auto",
        marginRight: "auto",
        bgcolor: "background.paper",
      }}
    >
      <nav aria-label="main mailbox folders">
        <List>
          {blocks.map((block) => (
            <ListItem
              disablePadding
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => {
                    handleDeleteBlock(block?.blocked);
                  }}
                >
                  <DeleteIcon style={{ color: "#FE2E2E" }} />
                </IconButton>
              }
            >
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar
                    alt="Remy Sharp"
                    src="https://www.invert.vn/media/downloads/221203T1347_669.jpg"
                  />
                </ListItemAvatar>
                <ListItemText primary={block?.blocked} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </nav>
    </Box>
  );
}
