"use client";
import { useState } from "react";

// import { ChromePicker } from "react-color";
import { useDraw } from "./hooks/useDraw";
import { Draw } from "./types/types";

export default function Page() {
  const [color, setColor] = useState<string>("#000");
  const { canvasRef, onMouseDown, clear } = useDraw(drawLine);
  const [imageData, setImageData] = useState("");

  function drawLine({ prevPoint, currentPoint, ctx }: Draw) {
    const { x: currX, y: currY } = currentPoint;
    const lineColor = color;
    const lineWidth = 5;

    let startPoint = prevPoint ?? currentPoint;
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = lineColor;
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(currX, currY);
    ctx.stroke();

    ctx.fillStyle = lineColor;
    ctx.beginPath();
    ctx.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI);
    ctx.fill();
  }

  const saveToLocal = () => {
    if (!canvasRef.current) {
      return;
    }
    let image = canvasRef.current.toDataURL("image/jpg");
    let data = { image: image, date: Date.now() };
    let string = JSON.stringify(data);
    setImageData(image);
    let file = new Blob([string], {
      type: "application/json",
    });
  };

  return (
    <div className="w-screen h-screen bg-white flex flex-col gap-10 justify-center items-center">
      <div className="flex flex-col gap-10 pr-10">
        {/* <ChromePicker color={color} onChange={(e) => setColor(e.hex)} /> */}
        <button
          type="button"
          className="p-2 rounded-md border border-black"
          onClick={clear}
        >
          Clear canvas
        </button>
      </div>
      <canvas
        ref={canvasRef}
        onMouseDown={onMouseDown}
        width={550}
        height={550}
        className="border border-black rounded-md"
      />

      <button
        onClick={saveToLocal}
        className="text-black border-2 rounded-sm border-black"
      >
        Downdload?
      </button>

      {imageData.length > 0 && <p> {imageData}</p>}
    </div>
  );
}
