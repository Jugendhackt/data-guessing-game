import React, { useEffect, useRef } from "react";
import { Answer } from "../types";

type Props = Answer

export const Chart: React.FC<Props> = (datapoints) => {
  const canvasRef = useRef(null);
  useEffect(() => {
    if (canvasRef === null) {
      return;
    }
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);

    const margin = 50;

    const minYear = Math.min(...datapoints.map(d => d.year));
    const maxYear = Math.max(...datapoints.map(d => d.year));
    const minValue = Math.min(...datapoints.map(d => d.value));
    const maxValue = Math.max(...datapoints.map(d => d.value));

    // Axis labels
    context.font = "12px Arial";
    context.fillStyle = "black";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(minYear, margin, canvas.height - margin + margin / 2);
    context.fillText(maxYear, canvas.width - margin, canvas.height - margin + margin / 2);
    context.fillText(minValue, margin - margin / 2, canvas.height - margin);
    context.fillText(maxValue, margin - margin / 2, margin);

    // Axis lines
    context.strokeStyle = "gray";
    context.beginPath();
    context.moveTo(margin, canvas.height - margin);
    context.lineTo(margin, margin);
    context.lineTo(canvas.width - margin, margin);
    context.stroke();
    context.closePath();
    context.beginPath();
    context.moveTo(margin, canvas.height - margin);
    context.lineTo(canvas.width - margin, canvas.height - margin);
    context.stroke();
    context.closePath();
    context.beginPath();
    context.moveTo(canvas.width - margin, margin);
    context.lineTo(canvas.width - margin, canvas.height - margin);
    context.stroke();
    context.closePath();

    let prevX: number, prevY: number;

    context.strokeStyle = "black";
    datapoints.forEach(({ year, value }) => {
      const x = margin + (year - minYear) / (maxYear - minYear) * (canvas.width - 2 * margin);
      const y = canvas.height - margin - (value - minValue) / (maxValue - minValue) * (canvas.height - 2 * margin);
      context.beginPath();
      context.arc(x, y, 4, 0, 2 * Math.PI);
      context.fill();
      context.closePath();

      if (prevX) {
        context.beginPath();
        context.moveTo(prevX, prevY);
        context.lineTo(x, y);
        context.stroke();
      }
      prevX = x;
      prevY = y;
    });
  }, [canvasRef]);
  return (
          <>
              <div> Hello, I am a chart! </div>
              <canvas ref={canvasRef} width="800" height="400"></canvas>
          </>
  );
};
