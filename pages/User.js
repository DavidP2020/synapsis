import Header from "@/components/Header/Header";
import CreateUser from "@/components/User/CreateUser";
import DeleteUser from "@/components/User/DeleteUser";
import EditUser from "@/components/User/EditUser";
import {
  Button,
  ButtonGroup,
  Fade,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ACCESS_TOKEN, API_URL } from "./api/constant";

export default function User() {
  const columns = [
    {
      id: "no",
      label: "No",
      minWidth: 170,
      align: "center",
    },
    {
      id: "id",
      label: "ID",
      minWidth: 170,
      align: "center",
    },
    {
      id: "name",
      label: "Name",
      minWidth: 100,
      align: "center",
    },
    {
      id: "email",
      label: "Email",
      minWidth: 170,
      align: "center",
    },
    {
      id: "gender",
      label: "Gender",
      minWidth: 170,
      align: "center",
    },
    {
      id: "status",
      label: "Status",
      minWidth: 170,
      align: "center",
    },
    {
      id: "action",
      label: "Action",
      minWidth: 170,
      align: "center",
    },
  ];
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "white",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [listUser, setlistUser] = useState([]);
  const [id, setId] = useState();
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [searched, setSearched] = useState();
  const [value, setValue] = useState("");

  const handleOpenCreate = () => {
    setOpen(true);
  };
  //function untuk tutup  pop up
  const handleCloseCreate = () => setOpen(false);

  const handleOpenEdit = (id) => {
    setId(id);
    setOpenEdit(true);
  };
  const handleCloseEdit = () => setOpenEdit(false);

  const handleOpenDelete = (id) => {
    setId(id);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => setOpenDelete(false);

  const fetchItem = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    };
    try {
      let res = await axios.get(API_URL + "public/v2/users", config);
      setlistUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const filterData = (e) => {
    if (e.target.value != "") {
      setValue(e.target.value);
      const filteredRows = listUser.filter((rowsPerPage) => {
        return rowsPerPage.name
          .toLowerCase()
          .includes(e.target.value.toLowerCase());
      });
      setSearched(filteredRows);
    } else {
      setValue(e.target.value);
      setlistUser([...listUser]);
    }
  };

  useEffect(() => {
    fetchItem();
  }, []);
  return (
    <>
      <div>
        <Header></Header>
      </div>
      <h2 className="font-bold text-2xl m-6">List User</h2>
      <div className="text-right mb-10 mr-10">
        <Button
          variant="contained"
          className="bg-blue-600"
          onClick={() => handleOpenCreate()}
        >
          Create User
        </Button>

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleCloseCreate}
          closeAfterTransition
        >
          <Fade in={open}>
            <Box sx={style} style={{ background: "white" }} component={"div"}>
              <Toolbar style={{ marginLeft: "-1rem" }}>
                <Typography component="div" sx={{ flexGrow: 2 }}>
                  <b className="text-xl">Create User</b>
                </Typography>
                <i
                  className="icon fa fa-times"
                  aria-hidden="true"
                  onClick={handleCloseCreate}
                ></i>
              </Toolbar>
              <Typography
                id="transition-modal-description"
                sx={{ mt: 2 }}
                component={"div"}
              >
                {/* Isi Pop Up */}
                <CreateUser
                  data={id}
                  handleClose={handleCloseCreate}
                  fetchItem={fetchItem}
                />
              </Typography>
            </Box>
          </Fade>
        </Modal>
      </div>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TextField
          label="Search"
          variant="outlined"
          type="text"
          placeholder="Search Name...."
          value={value}
          className="m-4 w-3/12"
          onChange={(e) => filterData(e)}
        />
        <TableContainer sx={{ maxHeight: 540 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {value.length > 0
                ? searched
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((userData, i) => (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={userData.id}
                      >
                        <TableCell align="center">{i + 1}</TableCell>
                        <TableCell align="center">{userData.id}</TableCell>
                        <TableCell align="center">{userData.name}</TableCell>
                        <TableCell align="center">{userData.email}</TableCell>
                        <TableCell align="center">{userData.gender}</TableCell>
                        <TableCell align="center">{userData.status}</TableCell>
                        <TableCell align="center">
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              "& > *": {
                                m: 1,
                              },
                            }}
                          >
                            <ButtonGroup
                              variant="text"
                              aria-label="text button group"
                            >
                              <Stack spacing={1} direction="row">
                                <Button
                                  variant="contained"
                                  className="bg-green-600"
                                  onClick={() => handleOpenEdit(userData)}
                                >
                                  Edit
                                </Button>
                                {/* Pop Up */}
                                <Modal
                                  aria-labelledby="transition-modal-title"
                                  aria-describedby="transition-modal-description"
                                  open={openEdit}
                                  onClose={handleCloseEdit}
                                  closeAfterTransition
                                >
                                  <Fade in={openEdit}>
                                    <Box
                                      sx={style}
                                      style={{ background: "white" }}
                                      component={"div"}
                                    >
                                      <Toolbar style={{ marginLeft: "-1rem" }}>
                                        <Typography
                                          component="div"
                                          sx={{ flexGrow: 2 }}
                                        >
                                          <b className="text-xl">Edit User</b>
                                        </Typography>
                                        <i
                                          className="icon fa fa-times"
                                          aria-hidden="true"
                                          onClick={handleCloseEdit}
                                        ></i>
                                      </Toolbar>
                                      <Typography
                                        id="transition-modal-description"
                                        sx={{ mt: 2 }}
                                        component={"div"}
                                      >
                                        <EditUser
                                          data={id}
                                          handleClose={handleCloseEdit}
                                          fetchItem={fetchItem}
                                        />
                                      </Typography>
                                    </Box>
                                  </Fade>
                                </Modal>
                                <Button
                                  variant="contained"
                                  className="bg-red-600"
                                  onClick={() => handleOpenDelete(userData)}
                                >
                                  Delete
                                </Button>
                                {/* Pop Up */}
                                <Modal
                                  aria-labelledby="transition-modal-title"
                                  aria-describedby="transition-modal-description"
                                  open={openDelete}
                                  onClose={handleCloseDelete}
                                  closeAfterTransition
                                >
                                  <Fade in={openDelete}>
                                    <Box
                                      sx={style}
                                      style={{ background: "white" }}
                                      component={"div"}
                                    >
                                      <Toolbar style={{ marginLeft: "-1rem" }}>
                                        <Typography
                                          component="div"
                                          sx={{ flexGrow: 2 }}
                                        >
                                          <b className="text-xl">Delete User</b>
                                        </Typography>
                                        <i
                                          className="icon fa fa-times"
                                          aria-hidden="true"
                                          onClick={handleCloseDelete}
                                        ></i>
                                      </Toolbar>
                                      <Typography
                                        id="transition-modal-description"
                                        sx={{ mt: 2 }}
                                        component={"div"}
                                      >
                                        <DeleteUser
                                          data={id}
                                          handleClose={handleCloseDelete}
                                          fetchItem={fetchItem}
                                        />
                                      </Typography>
                                    </Box>
                                  </Fade>
                                </Modal>
                              </Stack>
                            </ButtonGroup>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))
                : listUser
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((userData, i) => (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={userData.id}
                      >
                        <TableCell align="center">{i + 1}</TableCell>
                        <TableCell align="center">{userData.id}</TableCell>
                        <TableCell align="center">{userData.name}</TableCell>
                        <TableCell align="center">{userData.email}</TableCell>
                        <TableCell align="center">{userData.gender}</TableCell>
                        <TableCell align="center">{userData.status}</TableCell>
                        <TableCell align="center">
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              "& > *": {
                                m: 1,
                              },
                            }}
                          >
                            <ButtonGroup
                              variant="text"
                              aria-label="text button group"
                            >
                              <Stack spacing={1} direction="row">
                                <Button
                                  variant="contained"
                                  className="bg-green-600"
                                  onClick={() => handleOpenEdit(userData)}
                                >
                                  Edit
                                </Button>

                                <Modal
                                  aria-labelledby="transition-modal-title"
                                  aria-describedby="transition-modal-description"
                                  open={openEdit}
                                  onClose={handleCloseEdit}
                                  closeAfterTransition
                                >
                                  <Fade in={openEdit}>
                                    <Box
                                      sx={style}
                                      style={{ background: "white" }}
                                      component={"div"}
                                    >
                                      <Toolbar style={{ marginLeft: "-1rem" }}>
                                        <Typography
                                          component="div"
                                          sx={{ flexGrow: 2 }}
                                        >
                                          <b className="text-xl">Edit User</b>
                                        </Typography>
                                        <i
                                          className="icon fa fa-times"
                                          aria-hidden="true"
                                          onClick={handleCloseEdit}
                                        ></i>
                                      </Toolbar>
                                      <Typography
                                        id="transition-modal-description"
                                        sx={{ mt: 2 }}
                                        component={"div"}
                                      >
                                        <EditUser
                                          data={id}
                                          handleClose={handleCloseEdit}
                                          fetchItem={fetchItem}
                                        />
                                      </Typography>
                                    </Box>
                                  </Fade>
                                </Modal>
                                <Button
                                  variant="contained"
                                  className="bg-red-600"
                                  onClick={() => handleOpenDelete(userData)}
                                >
                                  Delete
                                </Button>
                                <Modal
                                  aria-labelledby="transition-modal-title"
                                  aria-describedby="transition-modal-description"
                                  open={openDelete}
                                  onClose={handleCloseDelete}
                                  closeAfterTransition
                                >
                                  <Fade in={openDelete}>
                                    <Box
                                      sx={style}
                                      style={{ background: "white" }}
                                      component={"div"}
                                    >
                                      <Toolbar style={{ marginLeft: "-1rem" }}>
                                        <Typography
                                          component="div"
                                          sx={{ flexGrow: 2 }}
                                        >
                                          <b className="text-xl">Delete User</b>
                                        </Typography>
                                        <i
                                          className="icon fa fa-times"
                                          aria-hidden="true"
                                          onClick={handleCloseDelete}
                                        ></i>
                                      </Toolbar>
                                      <Typography
                                        id="transition-modal-description"
                                        sx={{ mt: 2 }}
                                        component={"div"}
                                      >
                                        <DeleteUser
                                          data={id}
                                          handleClose={handleCloseDelete}
                                          fetchItem={fetchItem}
                                        />
                                      </Typography>
                                    </Box>
                                  </Fade>
                                </Modal>
                              </Stack>
                            </ButtonGroup>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={listUser.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
