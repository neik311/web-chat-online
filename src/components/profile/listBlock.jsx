import { useEffect, useState, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { NotifiContext } from "../../context/notifiContext";
import { getBlockUser, deleteBlockUser } from "../../api/apiBlock";

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
    <div>
      <ul className="block-list">
        {blocks.map((block) => (
          <li style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}>
            <div className="user-block-list">
              <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
              <h3>{block?.blocked}</h3>
              <Button
                variant="contained"
                style={{ background: "red" }}
                onClick={() => {
                  handleDeleteBlock(block?.blocked);
                }}
              >
                Hủy chặn
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
