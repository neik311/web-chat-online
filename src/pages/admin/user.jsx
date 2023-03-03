import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Topbar from "../../components/topbar/Topbar";
import { useEffect, useState, useRef, useContext } from "react";
import { NotifiContext } from "../../context/notifiContext";
import { UserContext } from "../../context/userContext";
import { getAllUser, lockUser } from "../../api/apiUser";

const columns = [
  { id: "avatar", label: "Avatar" },
  { id: "id", label: "username" },
  {
    id: "firstName",
    label: "Họ",
    // minWidth: 170,
    // align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "lastName",
    label: "Tên",
    // minWidth: 170,
    // align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "email",
    label: "Email",
    // minWidth: 170,
    // align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "lock",
    label: "Tài khoản",
    // minWidth: 170,
    // align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "status",
    label: "Trạng thái",
    // minWidth: 170,
    // align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "handle",
    label: "Thao tác",
    // minWidth: 170,
    align: "center",
    format: (value) => value.toFixed(2),
  },
];

const UserMagager = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const { setNotifi } = useContext(NotifiContext);
  const { user } = useContext(UserContext);

  const fetchData = async () => {
    const res = await getAllUser();
    if (res.statusCode === "200") {
      setRows(res.data);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleLockUser = async (email, lock) => {
    const res = await lockUser(user.id, email, lock);
    if (res.statusCode !== "200") {
      setNotifi([res.message]);
      return;
    }
    await fetchData();
    if (lock === true) {
      setNotifi(["Khóa tài khoản thành công", "success"]);
      return;
    }
    setNotifi(["Mở khóa tài khoản thành công", "success"]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <>
      <Topbar setConversations={null} />
      <Paper
        sx={{
          width: "98%",
          marginTop: "20px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <TableContainer sx={{ maxHeight: 540 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={2}>
                  Quản lý người dùng
                </TableCell>
                <TableCell align="center" colSpan={3}></TableCell>
              </TableRow>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ top: 57, minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        if (column.id === "avatar") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <Avatar alt="avatar" src={value} />
                            </TableCell>
                          );
                        }
                        if (column.id === "lock") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {value === false ? "Chưa khóa" : "Bị khóa"}
                            </TableCell>
                          );
                        }
                        if (column.id === "status") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {value === true ? (
                                <p style={{ color: "#013ADF" }}>
                                  Đang hoạt động
                                </p>
                              ) : (
                                <p style={{ color: "#424242" }}>Ngoại tuyến</p>
                              )}
                            </TableCell>
                          );
                        }
                        if (column.id === "handle") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {row["lock"] === false ? (
                                <Button
                                  variant="contained"
                                  sx={{ backgroundColor: "red" }}
                                  onClick={() => {
                                    handleLockUser(row["email"], true);
                                  }}
                                >
                                  Khóa
                                </Button>
                              ) : (
                                <Button
                                  variant="contained"
                                  onClick={() => {
                                    handleLockUser(row["email"], false);
                                  }}
                                >
                                  Hủy khóa
                                </Button>
                              )}
                            </TableCell>
                          );
                        }
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};

export default UserMagager;
