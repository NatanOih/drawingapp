import React from "react";
import "react-color-palette/css";
import { ColorPicker } from "react-color-palette";
import { useCanvasContextProvider } from "@/contextProviders/useCanvasProvider";

export default function DrawManu() {
  const {
    strokes,
    undo,
    redo,
    redoStack,
    clearCanvas,
    currentColor,
    setCurrentColor,
  } = useCanvasContextProvider();

  return (
    <article className="flex flex-row justify-center items-center text-center gap-4 select-none">
      {/* <ColorPicker
        height={100}
        hideInput={["rgb", "hsv"]}
        color={currentColor}
        onChange={setCurrentColor}
      /> */}
      {/* <div className="flex flex-col gap-2 justify-center items-center"> */}
      <button
        type="button"
        className="p-2 rounded-md border w-fit h-10 border-black bg-slate-200 hover:bg-slate-400 transition-all hover:scale-105 active:scale-95"
        onClick={() => clearCanvas(true)}
      >
        Clear canvas
      </button>

      <p className="text-white"> Strokes Counter: {strokes.length}</p>
      <p className="text-white"> Redo Stack: {redoStack.length}</p>
      <div className="flex justify-center gap-2">
        <button
          onClick={undo}
          className="p-2 rounded-md border w-16 border-black bg-slate-200 hover:bg-slate-400 h-10 transition-all hover:scale-105 active:scale-95"
        >
          Undo
        </button>
        <button
          onClick={redo}
          className="p-2 rounded-md border w-16 border-black bg-slate-200 hover:bg-slate-400 h-10 transition-all hover:scale-105 active:scale-95"
        >
          Redo
        </button>
      </div>
      {/* </div> */}
    </article>
  );
}
