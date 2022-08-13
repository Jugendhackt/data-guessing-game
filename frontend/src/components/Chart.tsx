import React, { useEffect, useState, useRef } from "react";
import styled from "@emotion/styled";
import { Answer } from "../types";

type Props = {datapoints: Answer}

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
`;

export const Chart: React.FC<Props> = ({ datapoints }) => {
  const canvasRef = useRef(null);

  const [guess, setGuess] = useState([]);
  const [n, setN] = useState(0);

  const margin = 50;

  function draw (e: React.MouseEvent<HTMLCanvasElement, MouseEvent> | React.TouchEvent<HTMLCanvasElement>) {
    let clientX = 0;
    let clientY = 0;

    if (isTouches(e)) {
      clientX = e.touches[0].pageX;
      clientY = e.touches[0].pageY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const minYear = Math.min(...datapoints.map(d => d.year));
    const maxYear = Math.max(...datapoints.map(d => d.year));
    const minValue = Math.min(...datapoints.map(d => d.value));
    const maxValue = Math.max(...datapoints.map(d => d.value));
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const year = ((x - margin) / (rect.width - margin * 2)) * (maxYear - minYear) + minYear;
    const value = (((rect.height - (y + margin)) / (rect.height - margin * 2)) * (maxValue - minValue) + minValue);
    const newPoint = { year, value };
    console.log("draw()");
    console.log(newPoint);
    setN(n + 1);
    console.log(n);
    setGuess(oldGuess => [...oldGuess, newPoint]);
    console.log(guess);
  }

  const [mouseIsDown, setMouseIsDown] = useState(false);

  const isTouches = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent> | React.TouchEvent<HTMLCanvasElement>): e is React.TouchEvent<HTMLCanvasElement> => ("touches" in e);

  function mouseDown (e: React.MouseEvent<HTMLCanvasElement, MouseEvent> | React.TouchEvent<HTMLCanvasElement>) {
    console.log("mouseDown");
    draw(e);
    setMouseIsDown(true);
  }

  function mouseMove (e: React.MouseEvent<HTMLCanvasElement, MouseEvent> | React.TouchEvent<HTMLCanvasElement>) {
    if (mouseIsDown) {
      draw(e);
    }
  }

  function mouseUp (_: React.MouseEvent<HTMLCanvasElement, MouseEvent> | React.TouchEvent<HTMLCanvasElement>) {
    setMouseIsDown(false);
  }

  useEffect(() => {
    console.log(guess);
    if (canvasRef === null) {
      return;
    }
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);

    const minYear = Math.min(...datapoints.map(d => d.year));
    const maxYear = Math.max(...datapoints.map(d => d.year));
    const minValue = Math.min(...datapoints.map(d => d.value));
    const maxValue = Math.max(...datapoints.map(d => d.value));

    // Array.from({ length: maxYear - minYear + 1 }, (_, i) => {
    //   const year = minYear + i;
    //   // guess.push({year, value: 20});
    // });
    console.log(guess);

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

    prevX = prevY = null;
    context.strokeStyle = "blue";
    context.fillStyle = "blue";
    console.log(guess.length);
    guess.forEach(({ year, value }) => {
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
  }, [canvasRef, guess, datapoints]);

  return (
          <>
              <Canvas ref={canvasRef} onMouseDown={mouseDown} onMouseMove={mouseMove} onMouseUp={mouseUp} onTouchStart={mouseDown} onTouchMove={mouseMove} onTouchEnd={mouseUp} height="400"></Canvas>
          </>
  );
};
