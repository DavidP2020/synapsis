import { Button } from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import React from "react";
import Comment from "./Comment";

export default function Description({ data, handleClose, ...props }) {
  return (
    <>
      <div>
        <Box
          sx={{
            "& .MuiTextField-root": { m: 1, width: "100%" },
          }}
          component={"div"}
          className="overflow-auto"
        >
          <div className="flex lg:flex-row flex-col flex-wrap mb-10">
            {/* Left Side */}
            <div className="lg:left-side lg:w-1/2 w-full">
              <Image
                src={"/image/images2.jpg"}
                alt="images"
                width={1000}
                height={1000}
              ></Image>
            </div>

            {/* Right Side */}
            <div className="lg:right-side lg:w-1/2 w-full">
              <div className="lg:text-xl text-sm text-center mb-4 font-bold items-center justify-center w-11/12 m-2">
                {data.title}
              </div>

              {/* Description */}
              <div className="pt-3 ">
                <span className="lg:text-lg text-sm text-gray-700 leading-6 p-2 font-bold m-2">
                  Description
                </span>
                <p className="lg:text-sm text-xs text-gray-700 pl-2 lg:text-left text-center items-center justify-center w-11/12 m-2">
                  {data.body}
                </p>
              </div>
            </div>
          </div>
        </Box>
      </div>

      <div>
        <div>
          <span className="lg:text-lg text-sm text-gray-700 leading-6 p-2 font-bold m-2">
            Comment
          </span>
          <div>
            <Comment data={data.id} handleClose={handleClose} />
          </div>
        </div>
      </div>
    </>
  );
}
