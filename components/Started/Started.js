import React from "react";
import Image from "next/image";
import LatestPost from "../Post/LatestPost";
import Trending from "../Post/Trending";

export default function Started() {
  return (
    <section className="section-container">
      <div className="lg:h-72 h-80 container mx-auto bg-slate-800 text-white">
        <h1 className="title-text">Getting Started</h1>
        <div className="started-desc">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </p>
        </div>
        <div className="started-body">{Slide()}</div>
        <Trending></Trending>
        <LatestPost></LatestPost>
      </div>
    </section>
  );
}

function Slide() {
  return (
    <div className="grid md:grid-cols-2">
      <div>
        <Image
          src={"/image/images1.jpg"}
          alt="images"
          width={1000}
          height={1000}
          className="rounded-l-2xl"
        ></Image>
      </div>
      <div className="started-body-card">
        <div className="started-body-subTitle">
          <p className="xl:text-lg lg:text-sm xs:text-xs text-center font-bold">
            Country Name
          </p>
        </div>
        <div className="started-body-title">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
        </div>
        <p className="started-body-desc">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged.
        </p>
      </div>
    </div>
  );
}
