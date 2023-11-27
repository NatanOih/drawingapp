import React from "react";
import ImageClientComponent from "./ImageClientComponent";
import { drawing } from "@/lib/types";

export default function ImageHistoryConatiner({
  userData,
}: {
  userData: drawing[];
}) {
  return (
    <div className="text-slate-50 flex flex-row bg-red-400/90 w-fit gap-4 rounded-md py-1 px-1">
      {userData?.map((drawing: drawing, index: number) => (
        <div
          className="flex flex-col w-fit justify-start items-center text-center p-1 gap-2 "
          key={index}
        >
          <p className=" underline text-xl flex-grow "> {drawing.name} </p>
          {/* <p> id: {drawing.id} </p> */}
          <ImageClientComponent drawing={{ ...drawing }} />
        </div>
      ))}
    </div>
  );
}
