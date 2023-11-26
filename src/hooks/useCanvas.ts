import { computePointInCanvas, drawLine } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { useColor } from "react-color-palette";

interface Point {
  x: number;
  y: number;
}

export interface Stroke {
  color: string;
  lineWidth: number;
  points: Point[];
}

const BUFFER_SIZE = 1;

export function useCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [redoStack, setRedoStack] = useState<Stroke[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentStroke, setCurrentStroke] = useState<Stroke | null>(null);
  const [currentLineWidth, setCurrentLineWidth] = useState(2);
  const [selectedStroke, setSelectedStroke] = useState<Stroke | null>(null);
  const [currentColor, setCurrentColor] = useColor("#000");
  const prevPoint = useRef<null | Point>(null);
  const context = canvasRef.current && canvasRef.current.getContext("2d");

  const clearCanvas = (reset: boolean = false) => {
    if (context) {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    }

    if (reset) {
      setRedoStack([]);
      setStrokes([]);
      setCurrentStroke(null);
      setSelectedStroke(null);
    }
  };

  useEffect(() => {
    drawStrokes(strokes);

    return () => {
      clearCanvas();
    };
  }, [selectedStroke]);

  const undo = () => {
    if (strokes.length > 0) {
      const lastStroke = strokes[strokes.length - 1];
      const newStrokes = strokes.slice(0, strokes.length - 1);
      setRedoStack([...redoStack, lastStroke]);
      setStrokes(newStrokes);
      drawStrokes(newStrokes);
    }
  };

  const redo = () => {
    if (redoStack.length > 0) {
      const nextStroke = redoStack[redoStack.length - 1];
      const newRedoStack = redoStack.slice(0, redoStack.length - 1);
      setStrokes([...strokes, nextStroke]);
      setRedoStack(newRedoStack);
      drawStrokes([...strokes, nextStroke]);
    }
  };

  const setNewCanvas = (newStrokes: Stroke[]) => {
    clearCanvas();
    setRedoStack([]);
    setStrokes(newStrokes);
    setCurrentStroke(null);
    setSelectedStroke(null);
    drawStrokes(newStrokes);
  };

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDrawing(true);

    const currentPoint = computePointInCanvas(e, canvasRef);
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx || !currentPoint) return;
    const x = currentPoint?.x;
    const y = currentPoint?.y;
    prevPoint.current = currentPoint;
    setCurrentStroke({
      color: currentColor.hex,
      lineWidth: currentLineWidth,
      points: [{ x, y }],
    });
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing) {
      const x = e.nativeEvent.offsetX;
      const y = e.nativeEvent.offsetY;
      const hoveredStroke = findClickedStroke(x, y);

      if (hoveredStroke) {
        canvasRef.current!.style.cursor = "pointer";
      } else {
        canvasRef.current!.style.cursor = "auto";
      }
      return;
    }

    const currentPoint = computePointInCanvas(e, canvasRef);
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx || !currentPoint) return;

    const x = currentPoint?.x;
    const y = currentPoint?.y;

    drawLine({ ctx, currentPoint, prevPoint: prevPoint.current, currentColor });
    prevPoint.current = currentPoint;
    setCurrentStroke((prevStroke) => ({
      ...prevStroke!,
      points: [...prevStroke!.points, { x, y }],
    }));
  };

  const onMouseUp = (e: React.MouseEvent) => {
    setIsDrawing(false);
    e.preventDefault();
    e.stopPropagation();

    prevPoint.current = null;
    if (
      context &&
      currentStroke &&
      currentStroke.points.length > 0 &&
      currentStroke.points.length < 2
    ) {
      return;
    }
    if (context && currentStroke && currentStroke.points.length > 0) {
      setStrokes([...strokes, currentStroke]);
      setCurrentStroke(null);
      setRedoStack([]);
      drawStrokes([...strokes, currentStroke]);
    }
  };

  const drawStrokes = (strokesToDraw: Stroke[]) => {
    if (!context) return;

    clearCanvas();
    strokesToDraw.forEach((stroke) => {
      context.strokeStyle = stroke.color;
      context.lineWidth = stroke.lineWidth;
      context.lineJoin = "round";
      context.lineCap = "round";
      context.beginPath();

      for (let i = 0; i < stroke.points.length; i++) {
        const { x, y } = stroke.points[i];
        if (i === 0) {
          context.moveTo(x, y);
        } else {
          context.lineTo(x, y);
        }
      }
      context.stroke();

      if (stroke === selectedStroke) {
        // Highlight the selected stroke (e.g., draw a border around it)
        context.lineWidth = stroke.lineWidth + 2;
        context.strokeStyle = "blue";
        context.stroke();
      }
    });
  };

  const findClickedStroke = (clickX: number, clickY: number): Stroke | null => {
    for (let i = strokes.length - 1; i >= 0; i--) {
      const stroke = strokes[i];
      for (let j = 0; j < stroke.points.length - 1; j++) {
        const start = stroke.points[j];
        const end = stroke.points[j + 1];

        // Calculate the bounding box of the line segment
        const minX = Math.min(start.x, end.x) - BUFFER_SIZE;
        const minY = Math.min(start.y, end.y) - BUFFER_SIZE;
        const maxX = Math.max(start.x, end.x) + BUFFER_SIZE;
        const maxY = Math.max(start.y, end.y) + BUFFER_SIZE;

        // Check if the click point is within the bounding box
        if (
          clickX >= minX &&
          clickX <= maxX &&
          clickY >= minY &&
          clickY <= maxY
        ) {
          return stroke;
        }
      }
    }

    return null;
  };

  const onMouseClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isDrawing) {
      console.log("still draeing");
      return;
    }

    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    const clickedStroke = findClickedStroke(x, y);

    if (selectedStroke != null) {
      setSelectedStroke(null);
    }

    if (clickedStroke != null) {
      setSelectedStroke(clickedStroke);
    }
  };

  return {
    canvasRef,
    strokes,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    undo,
    redo,
    redoStack,
    clearCanvas,
    currentColor,
    currentLineWidth,
    setCurrentLineWidth,
    setCurrentColor,
    onMouseClick,
    setNewCanvas,
  };
}
