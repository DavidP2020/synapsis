import { ACCESS_TOKEN, API_URL } from "@/pages/api/constant";
import { Box, Button, MenuItem, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import swal from "sweetalert";

export default function CreateUser({ handleClose, fetchItem, ...props }) {
  const [state, setState] = useState({
    name: "",
    email: "",
    gender: "female",
    status: "inactive",
  });
  const [error, setError] = useState();

  const setGender = [
    {
      value: "female",
      label: "female",
    },
    {
      value: "male",
      label: "male",
    },
  ];

  const setStatus = [
    {
      value: "inactive",
      label: "inactive",
    },
    {
      value: "active",
      label: "active",
    },
  ];
  const { name, email, gender, status } = state;
  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !gender || !status) {
      setError("Please Input All Input");
    } else {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
        };
        axios.post(API_URL + "public/v2/users", state, config).then((res) => {
          fetchItem();
          swal({
            title: "Success Create User!",
            text: "Success Create User " + state.name,
            icon: "success",
            button: false,
            timer: 1500,
          });
          setError("");
          handleClose();
        });
      } catch (err) {
        alert(err.message);
      }
    }
  };
  return (
    <div>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "100%" },
        }}
        noValidate
        autoComplete="off"
      >
        {error && <h3 style={{ color: "red" }}>{error}</h3>}
        <TextField
          label="Name"
          variant="outlined"
          name="name"
          type="text"
          onChange={handleInputChange}
        />
        <br />
        <TextField
          label="Email"
          name="email"
          variant="outlined"
          type="email"
          onChange={handleInputChange}
        />
        <br />
        <TextField
          select
          label="Gender"
          name="gender"
          variant="outlined"
          onChange={handleInputChange}
        >
          {setGender.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <br />
        <TextField
          select
          label="Status"
          name="status"
          variant="outlined"
          onChange={handleInputChange}
        >
          {setStatus.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <br />
        <div style={{ textAlign: "right" }}>
          <Button
            style={{
              margin: "5px",
              color: "black",
              border: "1px solid",
              borderRadius: "5px",
            }}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            style={{ background: "green" }}
            variant="contained"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </Box>
    </div>
  );
}
