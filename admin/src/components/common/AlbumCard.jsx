import React from "react";
import { FaFolderOpen } from "react-icons/fa6";

function AlbumCard({ name = "", onClick }) {
  return (
    <div
      className="items-red-500 text-primary flex w-full transform-gpu cursor-pointer flex-col items-center transition delay-140 hover:scale-110 hover:text-amber-600"
      onClick={onClick}
    >
      <FaFolderOpen fontSize={"80px"} />
      <h1 className="text-md max-w-full text-center">{name}</h1>
    </div>
  );
}

export default AlbumCard;
