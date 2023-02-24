import { ACCESS_TOKEN, API_URL } from "@/pages/api/constant";
import {
  Avatar,
  Box,
  Fade,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Modal,
  Toolbar,
  Typography,
} from "@mui/material";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Description from "../Description/Description";

export default function Author({ data, ...props }) {
  const [user, setUser] = useState("");
  const [open, setOpen] = useState(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "white",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const fetchItem = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    };
    try {
      let res = await axios.get(
        API_URL + `public/v2/users/${data.user_id}`,
        config
      );
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchItem();
  }, []);
  return (
    <div className="flex flex-wrap">
      <div className="left-side w-3/4">
        <ListItemButton className="-ml-4">
          <ListItemAvatar>
            <Avatar src={"/image/avatar.jpg"} />
          </ListItemAvatar>
          <ListItemText
            primary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                >
                  <div className="flex flex-wrap">
                    <div className="text-sm -ml-2">
                      {user ? user.name : "Lorem Ipsum"}
                    </div>
                  </div>
                </Typography>
              </React.Fragment>
            }
          />
        </ListItemButton>
      </div>
      <div className="right-side w-1/4 flex flex-wrap">
        <Image
          src={"/image/love.svg"}
          alt="header-splash"
          width={25}
          height={25}
          priority
          className="opacity-50 m-2"
        />

        <Image
          src={"/image/eye.svg"}
          alt="header-splash"
          width={25}
          height={25}
          priority
          className="opacity-50"
          onClick={() => handleOpen()}
        />
      </div>
      {/* Pop Up */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <Box
            sx={style}
            style={{ background: "white" }}
            component={"div"}
            className="w-3/4 overflow-auto max-h-full"
          >
            <Toolbar style={{ marginLeft: "-1rem" }}>
              <Typography component="div" sx={{ flexGrow: 2 }}>
                <b className="text-xl">Detail</b>
              </Typography>
              <i
                className="icon fa fa-times"
                aria-hidden="true"
                onClick={handleClose}
              ></i>
            </Toolbar>
            <Typography
              id="transition-modal-description"
              sx={{ mt: 2 }}
              component={"div"}
            >
              {/* Isi Pop Up */}
              <Description
                data={data}
                handleClose={handleClose}
                fetchItem={fetchItem}
              />
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
