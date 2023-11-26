"use client";
import { useCanvas } from "@/hooks/useCanvas";
import React from "react";

export default function CanvasWithUndoRedo() {
  const {
    canvasRef,
    strokes,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    undo,
    redo,
  } = useCanvas();

  return (
    <div className="bg-black text-4xl text-white">
      <canvas
        className="bg-slate-100"
        ref={canvasRef}
        width={500}
        height={500}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      />
      <button onClick={undo}>Undo</button>
      <button onClick={redo}>Redo</button>
    </div>
  );
}
