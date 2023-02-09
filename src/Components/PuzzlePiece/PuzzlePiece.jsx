import React from "react";
import { Image, Group } from "react-konva";
import useImage from "use-image";
import xIcon from "../../assets/red-x-icon.svg";

const PuzzlePiece = ({ index, imageSrc, points, handleUndo }) => {
  const [image] = useImage(imageSrc);
  const [closeIcon] = useImage(xIcon);

  const undeoCancelDraw = () => {
    handleUndo("cancelDraw");
  };
  const undeoRemoveLine = () => {
    handleUndo("removeLine", index);
  };
  const undeoRemoveDBclick = () => {
    handleUndo("removeLineDbClick", index);
  };
  const clipFuncPuzzlePiece = (context) => {
    context.beginPath();
    context.moveTo(points[0], points[1]);
    for (let i = 2; i < points.length; i += 2) {
      context.lineTo(points[i], points[i + 1]);
    }
    context.closePath();
    context.strokeStyle = "red";
    context.stroke();
  };
  if (!points || points.length == 0) return;
  return (
    <Group draggable onDragEnd={undeoCancelDraw} clipFunc={clipFuncPuzzlePiece}>
      <Image
        image={image}
        width={900}
        height={500}
        onDblClick={undeoRemoveDBclick}
        onDblTap={undeoRemoveDBclick}
        globalCompositeOperation={"source-over"}
      />
      <Image
        image={closeIcon}
        x={points[0]}
        y={points[1]}
        width={14}
        height={14}
        onClick={undeoRemoveLine}
        onTap={undeoRemoveLine}
        globalCompositeOperation={"source-over"}
      />
    </Group>
  );
};

export default PuzzlePiece;
