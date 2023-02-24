import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Avatar,
  Box,
  Fade,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Modal,
  Pagination,
  Toolbar,
  Typography,
} from "@mui/material";
import axios from "axios";
import { ACCESS_TOKEN, API_URL } from "@/pages/api/constant";
import Description from "../Description/Description";

export default function Trending() {
  return (
    <div>
      <section className="section-container md:py-20">
        <h1 className="title-text text-black">Trending</h1>

        <div className="flex flex-col justify-items-center items-center gap-10 justify-center mt-10">
          {Topic()}
        </div>
      </section>
    </div>
  );
}

function Topic() {
  const [listPost, setListPost] = useState([]);
  const itemsPerPage = 4;
  const [page, setPage] = useState(1);
  const [id, setId] = useState();
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
  const handleOpen = (id) => {
    setId(id);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleChange = (event, value) => {
    setPage(value);
  };
  const [noOfPages, setPages] = useState();

  const fetchItem = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      };
      let res = await axios.get(API_URL + "public/v2/posts", config);
      setListPost(res.data);
      setPages(Math.ceil(res.data.length / itemsPerPage));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchItem();
  }, []);

  return (
    <>
      <List sx={{ width: "80%", background: "white" }}>
        {listPost
          .slice((page - 1) * itemsPerPage, page * itemsPerPage)
          .map((data, i) => {
            return (
              <>
                <ListItem key={i}>
                  <ListItemButton
                    className="shadow-xl lg:flex lg:flex-row lg:text-left text-center flex flex-col"
                    onClick={() => handleOpen(data)}
                  >
                    <ListItemAvatar>
                      <Image
                        src={"/image/images2.jpg"}
                        alt="images"
                        width={350}
                        height={350}
                      ></Image>
                    </ListItemAvatar>
                    <ListItemText
                      className="lg:ml-8"
                      primary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            <div className="flex flex-wrap mb-2">
                              <div className="lg:text-xl md:text-lg text-sm font-bold">
                                {data.title}
                              </div>
                            </div>
                          </Typography>
                        </React.Fragment>
                      }
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            className="lg:text-sm text-xs"
                            color="text.primary"
                          >
                            {data.body}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItemButton>
                </ListItem>
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
                      style={{ background: "white", width: "80%" }}
                      component={"div"}
                      className="overflow-auto max-h-full"
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
                        <Description data={id} handleClose={handleClose} />
                      </Typography>
                    </Box>
                  </Fade>
                </Modal>
              </>
            );
          })}
      </List>
      <Box component="span">
        <Pagination
          count={noOfPages}
          page={page}
          onChange={handleChange}
          defaultPage={1}
          color="primary"
          size="large"
          showFirstButton
          showLastButton
        />
      </Box>
    </>
  );
}
