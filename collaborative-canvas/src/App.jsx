import React, { useRef, useEffect, useState } from "react";
import io from "socket.io-client";

// Update the socket connection URL
const socket = io("http://localhost:3000"); // Replace with your server's public URL for deployment

const App = () => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState("#000000"); // Default color is black
  const [brushSize, setBrushSize] = useState(3); // Default size

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushSize;
    ctxRef.current = ctx;

    // Handle socket events
    socket.on("initializeCanvas", (data) => {
      data.forEach((action) => drawFromSocket(action));
    });

    socket.on("draw", (data) => drawFromSocket(data));

    socket.on("clearCanvas", () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    return () => {
      socket.off("initializeCanvas");
      socket.off("draw");
      socket.off("clearCanvas");
    };
  }, []);

  const drawFromSocket = (data) => {
    const { x, y, prevX, prevY, color, size } = data;
    if (ctxRef.current) {
      ctxRef.current.strokeStyle = color;
      ctxRef.current.lineWidth = size;
      ctxRef.current.beginPath();
      ctxRef.current.moveTo(prevX, prevY);
      ctxRef.current.lineTo(x, y);
      ctxRef.current.stroke();
    }
  };

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    setIsDrawing(true);
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(offsetX, offsetY);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;

    const { offsetX, offsetY } = nativeEvent;
    const prevX = ctxRef.current.currentX || offsetX;
    const prevY = ctxRef.current.currentY || offsetY;

    ctxRef.current.strokeStyle = brushColor;
    ctxRef.current.lineWidth = brushSize;
    ctxRef.current.lineTo(offsetX, offsetY);
    ctxRef.current.stroke();

    // Emit draw event
    socket.emit("draw", { x: offsetX, y: offsetY, prevX, prevY, color: brushColor, size: brushSize });

    ctxRef.current.currentX = offsetX;
    ctxRef.current.currentY = offsetY;
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    ctxRef.current.beginPath();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    ctxRef.current.clearRect(0, 0, canvas.width, canvas.height);
    socket.emit("clearCanvas");
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        style={{ border: "1px solid black", display: "block" }}
      ></canvas>

      {/* Controls */}
      <div style={{ position: "absolute", top: 10, left: 10, display: "flex", gap: "10px" }}>
        {/* Color Picker */}
        <input
          type="color"
          value={brushColor}
          onChange={(e) => setBrushColor(e.target.value)}
          title="Choose Brush Color"
        />

        {/* Brush Size */}
        <input
          type="range"
          min="1"
          max="20"
          value={brushSize}
          onChange={(e) => setBrushSize(Number(e.target.value))}
          title="Brush Size"
        />
        <span>{brushSize}px</span>

        {/* Clear Button */}
        <button onClick={clearCanvas}>Clear Canvas</button>
      </div>
    </div>
  );
};

export default App;
