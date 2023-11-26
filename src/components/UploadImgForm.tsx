"use client";

import { useCanvasContextProvider } from "@/contextProviders/useCanvasProvider";
import { handleRedis } from "@/server/actions";

import React from "react";

export default function UploadImgForm() {
  const { canvasRef, strokes } = useCanvasContextProvider();
  return (
    <form
      action={async (FormData) => {
        let image = "";
        if (canvasRef.current) {
          image = canvasRef.current.toDataURL("image/png");
        }
        await handleRedis(FormData, image, strokes);
      }}
      className="flex flex-col rounded-md  bg-slate-500/70 h-fit w-fit p-5 gap-6"
    >
      <label htmlFor="imgName">Enter Image name</label>
      <input type="text" id="imgName" name="name" />
      <button className="text-black border-2 p-1 bg-gray-300 rounded-md hover:bg-gray-900 hover:text-gray-300 transition-all border-black">
        Save Image
      </button>
    </form>
  );
}
