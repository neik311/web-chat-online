import { useEffect, useState, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { NotifiContext } from "../../context/notifiContext";
import { getBlockUser, deleteBlockUser } from "../../api/apiBlock";

export default function ListBlock({ user }) {
  const [blocks, setBlocks] = useState([]);
  const { setNotifi } = useContext(NotifiContext);
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
                  <Avatar alt="Remy Sharp" src={block.avatar} />
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
