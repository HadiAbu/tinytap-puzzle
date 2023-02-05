import React from "react";
import { Image, Group } from "react-konva";
import useImage from "use-image";
import xIcon from "../assets/red-x-icon.svg";

const PuzzlePiece = ({ index, imageSrc, points, handleUndo }) => {
  const [image] = useImage(imageSrc);
  const [closeIcon] = useImage(xIcon);

  if (!points || points.length == 0) return;
  return (
    <Group
      draggable
      onDragEnd={() => handleUndo("cancelDraw")}
      clipFunc={(context) => {
        context.beginPath();
        context.moveTo(points[0], points[1]);
        for (let i = 2; i < points.length; i += 2) {
          context.lineTo(points[i], points[i + 1]);
        }
        context.closePath();
        context.strokeStyle = "red";
        context.stroke();
      }}
    >
      <Image
        image={image}
        width={900}
        height={500}
        onDblClick={() => {
          handleUndo("removeLineDbClick", index);
        }}
      />
      <Image
        image={closeIcon}
        x={points[0]}
        y={points[1]}
        width={14}
        height={14}
        onClick={() => {
          handleUndo("removeLine", index);
        }}
        globalCompositeOperation={"source-over"}
      />
    </Group>
  );
};
const PuzzlePieceGrayFiller = ({ points }) => {
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
        context.fillStyle = "#a9c3d0";
        context.strokeStyle = "red";
        context.fill();
        context.stroke();
      }}
      globalCompositeOperation={"source-over"}
    ></Group>
  );
};
export default PuzzlePiece;
export { PuzzlePieceGrayFiller };
