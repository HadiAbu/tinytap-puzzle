import React from "react";
import useImage from "use-image";
import { Image, Group } from "react-konva";

const PuzzlePiece = ({ imageSrc, points }) => {
  const [image] = useImage(imageSrc);
  if (!points || points.length == 0) return;
  return (
    <Group
      draggable
      clipFunc={(context) => {
        context.beginPath();
        context.moveTo(points[0], points[1]);
        for (let i = 2; i < points.length; i += 2) {
          context.lineTo(points[i], points[i + 1]);
        }
        context.closePath();
        context.stroke();
      }}
    >
      <Image image={image} width={800} height={500} />
    </Group>
  );
};
const PuzzlePieceGrayBack = ({ points }) => {
  if (!points || points.length == 0) return;
  return (
    <Group
      clipFunc={(context) => {
        context.beginPath();
        context.moveTo(points[0], points[1]);
        for (let i = 2; i < points.length; i += 2) {
          context.lineTo(points[i], points[i + 1]);
        }
        context.closePath();
        context.fill();
      }}
    ></Group>
  );
};
export default PuzzlePiece;
export { PuzzlePieceGrayBack };
