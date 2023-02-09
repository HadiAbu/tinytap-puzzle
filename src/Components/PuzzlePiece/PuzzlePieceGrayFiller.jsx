import React from "react";
import { Group } from "react-konva";

const PuzzlePieceGrayFiller = ({ points }) => {
  const clipPuzzlePiece = (context) => {
    context.beginPath();
    context.moveTo(points[0], points[1]);
    for (let i = 2; i < points.length; i += 2) {
      context.lineTo(points[i], points[i + 1]);
    }
    context.closePath();
    context.fillStyle = "#a9c3d0";
    context.strokeStyle = "red";
    context.fill();
    context.stroke();
  };

  if (!points || points.length == 0) return;
  return (
    <Group
      clipFunc={clipPuzzlePiece}
      globalCompositeOperation={"source-over"}
    />
  );
};
export default PuzzlePieceGrayFiller;
