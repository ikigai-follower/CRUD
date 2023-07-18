import React, { useState, useEffect } from "react";
import {
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Button,  Table } from "@mui/joy";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Axios from "axios";

import {
  Box,
  Divider,
  Grid,
  Modal,
  ModalClose,
  ModalDialog,
  Sheet,
  Typography,
} from "@mui/joy";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import { v4 as uuidv4 } from "uuid";
import './Table.css';

function Tables() {
  const [data, setdata] = useState([]);
  const [id, setid] = useState();
  const [userName, setuserName] = useState("");
  const [email, setemail] = useState("");
  const [age, setage] = useState("");
  const [deleteopen, setDeleteOpen] = useState("");
  const [upd, setUpd] = useState(false);
  const [del, setDel] = useState("");
  const [delname, setDelName] = useState("");
  const [openlanguage, setOpenLanguage] = useState(false);


  useEffect(() => {
    loaddata();
  }, []);

  const loaddata = async () => {
    const response = await Axios.get("http://localhost:3031/users");
    console.log(response.data);
    setdata(response.data);
  };

  const Adduser = (e) => {
    e.preventDefault();
    const newPostId = uuidv4();
    setid(newPostId);

    Axios.post(`http://localhost:3031/users`, {
      id,
      username: userName,
      email,
      age,
    })
      .then(() => {
      
        setOpenLanguage(false);
      })
      .catch((err) => {
        console.log(err);
      });
    setTimeout(() => {
      loaddata();
    }, 500);
  };
  const deleteoperation = (id) => {
    console.log(id);
    Axios.delete(`http://localhost:3031/users/${id}`);
    setDeleteOpen(false);
    setTimeout(() => {
      loaddata();
    }, 500);
  };

  const updateoperation = () => {
    Axios.put(`http://localhost:3031/users/${id}`, {
      id: id,
      username: userName,
      email: email,
      age: age,
    });
    setOpenLanguage(false);
    setTimeout(() => {
      loaddata();
    }, 500);
  };

const clrscr =()=>{
  setid("");
  setuserName("");
  setemail("");
  setage("");
}
  return (
    <div>
      <h1 style={{padding:'20px',textAlign:'center'}}>User Details</h1>
      <Paper
        sx={{
          width: "100%",
          overflow: "hidden",
          boxShadow: "none",
        }}
      >
        <TableContainer sx={{ maxHeight: 600}}>
          <Table stickyHeader className="tablesize">
            <TableHead>
              <TableRow>
                <TableCell>S.NO</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Email</TableCell>

                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((res, index) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{res.username}</TableCell>
                  <TableCell>{res.age}</TableCell>
                  <TableCell>{res.email}</TableCell>

                  <TableCell>
                    {" "}
                    <div>
                      <EditOutlinedIcon
                        onClick={() => {
                          setUpd(true);
                          setOpenLanguage(true);
                          const filteredData = data.filter(
                            (obj) => obj.id === res.id
                          );
                          console.log(filteredData, res.id, data);
                          filteredData.map((data) => {
                            setid(data.id)
                            setuserName(data.username);
                            setemail(data.email);
                            setage(data.age);
                          });
                        }}
                      />

                      <DeleteOutlineOutlinedIcon
                        onClick={() => {
                          setDeleteOpen(true);
                          setDel(res.id);
                          setDelName(res.username);
                        }}
                      />
                    </div>
                  </TableCell>
                 
                </TableRow>
              ))}
                 <div className="dflexend">
              <Button
                className="coloredbtn"
               
                onClick={() => {
                  setOpenLanguage(true);
                  setUpd(false);
                  clrscr()
                }}
              >
                Add New user
              </Button></div>
            </TableBody>

            <Modal
              open={deleteopen}
              onClose={() => {
                setDeleteOpen(false);
              }}
            >
              <ModalDialog
                variant="outlined"
                role="alertdialog"
                aria-labelledby="alert-dialog-modal-title"
                aria-describedby="alert-dialog-modal-description"
              >
                <Typography
                  id="alert-dialog-modal-title"
                  component="h2"
                  startDecorator={<WarningRoundedIcon />}
                >
                  Confirmation
                </Typography>
                <Divider />
                <Typography
                  id="alert-dialog-modal-description"
                  textColor="text.tertiary"
                >
                  Are you sure you want to Delete {delname}?
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    justifyContent: "flex-end",
                    pt: 2,
                  }}
                >
                  <Button
                    variant="plain"
                    color="neutral"
                    onClick={() => setDeleteOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="solid"
                    color="danger"
                    onClick={() => deleteoperation(del)}
                  >
                    Submit
                  </Button>
                </Box>
              </ModalDialog>
            </Modal>

            <Modal
              aria-labelledby="modal-title"
              aria-describedby="modal-desc"
              open={openlanguage}
              onClose={() => {
                setOpenLanguage(false);
              }}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Sheet
                variant="outlined"
                sx={{
                  width: 1000,
                  maxWidth: 6500,
                  borderRadius: "md",
                  p: 3,
                  boxShadow: "lg",
                }}
              >
                <ModalClose
                  variant="outlined"
                  sx={{
                    top: "calc(-1/4 * var(--IconButton-size))",
                    right: "calc(-1/4 * var(--IconButton-size))",
                    boxShadow: "0 2px 12px 0 rgba(0 0 0 / 0.2)",
                    borderRadius: "50%",
                    bgcolor: "background.body",
                  }}
                />

                <div style={{ marginBottom: "20px" }}>
                  {upd===false?<h1>Add User</h1>:<h1> Edit User</h1>}
                </div>
                <Grid container spacing={2}>
                  <Grid item lg={6} xs={12} md={6} sm={6}>
                    <label>Name</label>
                    <input
                     
                      placeholder="Name"
                      type="text"
                      value={userName}
                      onChange={(e) => {
                        setuserName(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12} md={6} sm={6}>
                    <label>Age</label>
                    <input
                      size="lg"
                      placeholder="Age"
                      type="text"
                      value={age}
                      onChange={(e) => {
                        setage(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item lg={6} xs={12} md={6} sm={6}>
                    <label>Email</label>
                    <input
                      size="lg"
                      placeholder="email"
                      type="text"
                      value={email}
                      onChange={(e) => {
                        setemail(e.target.value);
                      }}
                    />
                  </Grid>
                </Grid>
                <div className="dflexx">
                  {upd === true ? (
                    <Button variant="outlined" onClick={updateoperation}>
                      Submit
                    </Button>
                  ) : (
                    <Button variant="outlined" onClick={Adduser}>
                      Save
                    </Button>
                  )}
                </div>
              </Sheet>
            </Modal>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}

export default Tables;
