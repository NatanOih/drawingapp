import React from "react";
import ImageClientComponent from "./ImageClientComponent";
import { drawing } from "@/lib/types";

export default function ImageHistoryConatiner({
  userData,
}: {
  userData: drawing[];
}) {
  return (
    <div className="text-slate-50 flex flex-col bg-red-400/90 rounded-md p-1">
      {userData?.map((drawing: drawing, index: number) => (
        <div
          className="flex flex-row justify-start items-center text-left p-1 gap-4 "
          key={index}
        >
          <p className="w-fit text-xl flex-grow "> {drawing.name} :</p>
          {/* <p> id: {drawing.id} </p> */}
          <ImageClientComponent drawing={{ ...drawing }} />
        </div>
      ))}
    </div>
  );
}
