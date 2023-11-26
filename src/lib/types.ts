import { Stroke } from "@/hooks/useCanvas";
import { IColor } from "react-color-palette";

export type Draw = {
  ctx: CanvasRenderingContext2D;
  currentPoint: Point;
  prevPoint: Point | null;
  currentColor: IColor;
};

export type Point = { x: number; y: number };

export type drawing = {
  base64: string;
  name: string;
  strokes: Stroke[];
  id: string;
};
