import React from "react";
import { Rect, Text } from "react-konva";

const ControlButtons = ({ handleUndo, handleReset }) => {
  return (
    <>
      <Rect
        x={5}
        y={5}
        width={55}
        height={20}
        fill="white"
        shadowBlur={10}
        cornerRadius={3}
      />
      <Text
        text="UNDO"
        fill="black"
        x={12}
        y={8}
        fontSize={20}
        fontFamily={"Shadows Into Light"}
        fillStyle="white"
        onClick={() => handleUndo("undoLast")}
        onTap={() => handleUndo("undoLast")}
      />
      <Rect
        x={70}
        y={5}
        width={52}
        height={20}
        fill="white"
        shadowBlur={10}
        cornerRadius={3}
      />
      <Text
        text="Reset"
        fill="black"
        x={75}
        y={8}
        fontSize={20}
        fontFamily={"Shadows Into Light"}
        fillStyle="white"
        onClick={handleReset}
        onTap={handleReset}
      />
      <Text
        text="You can drag and drop your puzzle pieces here"
        fill="black"
        x={250}
        y={520}
        fontSize={20}
        fontFamily={"Shadows Into Light"}
        fillStyle="white"
      />
    </>
  );
};

export default ControlButtons;
