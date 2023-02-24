import { ACCESS_TOKEN, API_URL } from "@/pages/api/constant";
import {
  Avatar,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Comment({ data, handleClose, ...props }) {
  const [listComment, setlistComment] = useState([]);
  const fetchItem = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      };
      let res = await axios.get(API_URL + `public/v2/comments`, config);
      setlistComment(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchItem();
  }, []);
  return (
    <>
      <div className="bg-blue\">
        <List sx={{ width: "100%", background: "white" }}>
          {listComment.map((comment, i) => {
            return (
              <>
                {comment.post_id === data ? (
                  <>
                    <ListItem>
                      <ListItemButton
                        key={i}
                        className="shadow-xl lg:flex lg:flex-row lg:text-left text-center flex flex-col"
                      >
                        <ListItemAvatar>
                          <Avatar src={"/image/avatar.jpg"} />
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
                                    {comment.name}
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
                                {comment.body}
                              </Typography>
                            </React.Fragment>
                          }
                        />
                      </ListItemButton>
                    </ListItem>
                  </>
                ) : (
                  ""
                )}
              </>
            );
          })}
        </List>
      </div>
      <div>
        <div className="flex flex-row">
          <textarea
            className="h-28 w-full appearance-none block border border-slate-600 rounded-lg py-4 px-3 focus:outline-none"
            placeholder="Comments"
          ></textarea>
          <div>
            <button
              type=""
              className="fa fa-paper-plane p-2 border border-black rounded-full m-2 hover:bg-black hover:text-white"
            ></button>
          </div>
        </div>
      </div>
      <div className="text-right mt-10">
        <Button
          style={{
            margin: "5px",
            color: "black",
            border: "1px solid",
            borderRadius: "5px",
          }}
          onClick={handleClose}
        >
          Close
        </Button>
      </div>
    </>
  );
}
