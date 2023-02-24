import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { Box, Pagination } from "@mui/material";
import { ACCESS_TOKEN, API_URL } from "@/pages/api/constant";
import Author from "../Author/Author";
import Footer from "../Footer/Footer";

export default function LatestPost() {
  return (
    <div>
      <section className="section-container md:py-20">
        <h1 className="title-text text-black">Latest Post</h1>

        <div className="flex flex-col flex-wrap justify-center justify-items-center items-center">
          {Post()}
        </div>
      </section>
      <Footer></Footer>
    </div>
  );
}

function Post() {
  const [listPost, setlistPost] = useState([]);
  const itemsPerPage = 3;
  const [page, setPage] = useState(1);

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
      console.log(res);
      setlistPost(res.data);
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
      <div className="flex lg:flex-row flex-wrap flex-col m-12 justify-center justify-items-center items-center gap-10 border">
        {/* Mapping Data Product yang didapatkan dari fetchItem */}
        {listPost
          .slice((page - 1) * itemsPerPage, page * itemsPerPage)
          .map((data, i) => {
            return (
              <div className="card" key={i}>
                <Image
                  src={"/image/images3.jpg"}
                  alt="images"
                  width={350}
                  height={350}
                ></Image>
                <div className="p-5 flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <span className="badge">Category</span>
                    <span className="badge">Genre</span>
                  </div>

                  <h2 className="product-title">{data.title}</h2>
                  <Author data={data} />
                </div>
              </div>
            );
          })}
      </div>
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
