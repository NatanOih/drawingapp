"use client";
import { useCanvasContextProvider } from "@/contextProviders/useCanvasProvider";
import { drawing } from "@/lib/types";
import Image from "next/image";
import React from "react";

type ImageClientComponentProps = {
  drawing: drawing;
};

export default function ImageClientComponent({
  drawing: { base64, name, strokes },
}: ImageClientComponentProps) {
  const { setNewCanvas } = useCanvasContextProvider();
  return (
    <Image
      onClick={() => setNewCanvas(strokes)}
      className="bg-white hover:scale-110 hover:cursor-pointer transition-all active:scale-95"
      src={base64}
      width={80}
      height={80}
      alt={name}
    />
  );
}
