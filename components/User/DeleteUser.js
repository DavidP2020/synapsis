import React from "react";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import swal from "sweetalert";
import { ACCESS_TOKEN, API_URL } from "@/pages/api/constant";
import axios from "axios";

export default function DeleteUser({
  data,
  handleClose,
  fetchItem,
  todo,
  ...props
}) {
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      };

      await axios.delete(API_URL + `public/v2/users/${data.id}`, config);
      fetchItem();
      swal({
        title: "Success Delete User!",
        text: "Success Delete User " + data.name,
        icon: "success",
        button: false,
        timer: 1500,
      });
      handleClose();
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <div>
      <Box
        sx={{
          "& .MuiTextField-root": { m: 1, width: "36ch" },
        }}
        component={"div"}
      >
        <div className="mb-6">
          Are you sure want to delete this Username : <b>{data.name}</b> ? your
          action can't be reverted
        </div>
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
            style={{ background: "red" }}
            variant="contained"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </Box>
    </div>
  );
}
