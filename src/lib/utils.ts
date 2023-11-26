import { Draw } from "@/lib/types";

export function drawLine({ prevPoint, currentPoint, ctx, currentColor }: Draw) {
  const { x: currX, y: currY } = currentPoint;

  const lineColor = currentColor.hex;
  const lineWidth = 2;

  let startPoint = prevPoint ?? currentPoint;
  ctx.beginPath();
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = lineColor;
  ctx.moveTo(startPoint.x, startPoint.y);
  ctx.lineTo(currX, currY);
  ctx.stroke();

  ctx.fillStyle = lineColor;
  ctx.beginPath();
  ctx.arc(startPoint.x, startPoint.y, 1, 0, 1 * Math.PI);
  ctx.fill();
}

export const computePointInCanvas = (e: React.MouseEvent, canvasRef: any) => {
  const canvas = canvasRef.current;
  if (!canvas) return;

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  return { x, y };
};
