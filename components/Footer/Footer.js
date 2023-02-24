import React from "react";

export default function Footer() {
  return (
    <div className="lg:h-72 h-80 container mx-auto bg-slate-800 text-white">
      <div className="flex flex-row flex-wrap gap-4 justify-center p-20">
        <div>
          <button
            type=""
            className="fa-brands fa-facebook-f p-2 border border-white rounded-full m-2 hover:bg-slate-500 hover:text-white"
          ></button>
        </div>
        <div>
          <button
            type=""
            className="fa-brands fa-twitter p-2 border border-white rounded-full m-2 hover:bg-slate-500 hover:text-white"
          ></button>
        </div>
        <div>
          <button
            type=""
            className="fa-brands fa-github p-2 border border-white rounded-full m-2 hover:bg-slate-500 hover:text-white"
          ></button>
        </div>
        <div></div>
      </div>
      <div className="text-sm p-7">
        &copy; Blog Synapsis. All Right Reserved
      </div>
    </div>
  );
}
