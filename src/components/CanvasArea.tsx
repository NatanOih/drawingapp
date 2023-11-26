"use client";
import React from "react";
import DrawManu from "./DrawManu";

import { useCanvasContextProvider } from "@/contextProviders/useCanvasProvider";

export default function CanvasArea() {
  const { canvasRef, onMouseDown, onMouseMove, onMouseUp, onMouseClick } =
    useCanvasContextProvider();

  return (
    <section className="flex flex-col justify-center items-center w-[350px] text-center px-2 gap-4 select-none">
      <div>
        <canvas
          ref={canvasRef}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onClick={onMouseClick}
          width={350}
          height={350}
          className=" bg-gray-100 border-black border-2 rounded-md"
        />
      </div>
      <DrawManu />
    </section>
  );
}
