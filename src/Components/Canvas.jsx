import React, { useState } from "react";
import PuzzleImage from "./PuzzleImage";
import { Stage, Layer, Text, Line, Rect, Group, Shape } from "react-konva";
import PuzzlePiece from "./PuzzlePiece";

const Canvas = ({ image }) => {
  if (!image || image == "") return;

  const [drawing, setDrawing] = useState(false);
  const [lines, setLines] = useState([]);
  // const [startCoord, setStartCoord] = useState({});

  const handleUndo = () => {
    console.log("undo");
    let tempLines = [...lines];
    // // remove last two point that make a line
    tempLines.pop();
    tempLines.pop();
    setLines(() => [...tempLines]);
  };

  const startDraw = (e) => {
    setDrawing(true);
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { points: [pos.x.toFixed(2), pos.y.toFixed(2)] }]);
  };
  const stopDraw = (e) => {
    // if (drag) return;
    setDrawing(false);
  };
  const draw = (e) => {
    // if (drag) return;
    if (!drawing) return;
    console.log("draw");

    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    // replace last line
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  return (
    <Stage
      width={800}
      height={500}
      onMouseDown={startDraw}
      onMouseUp={stopDraw}
      // onMouseLeave={stopDraw}
      onMouseMove={draw}
    >
      <Layer>
        <Rect
          width={window.innerWidth}
          height={window.innerHeight}
          fill="grey"
        />
      </Layer>
      <Layer></Layer>
      <Layer>
        <PuzzleImage imageSrc={image} />
        {lines.length != 0 &&
          lines.map((line, i) => (
            <PuzzlePiece key={i} imageSrc={image} points={line.points} />
          ))}
        {/* {lines.length != 0 &&
          lines.map((line, i) => (
            <PuzzlePieceGrayBack key={i} points={line.points} />
          ))} */}
        <Text
          text="UNDO"
          fill="black"
          x={5}
          y={5}
          fontSize={20}
          fillStyle="white"
          onClick={handleUndo}
        />
        {/* <PuzzlePiece imageSrc={image} points={[1, 2]} /> */}

        {lines.map((line, i) => (
          <Group key={i}>
            <Line
              points={line.points}
              // stroke="#df4b26"
              // strokeWidth={5}
              // closed
              tension={0.5}
              lineCap="round"
              lineJoin="round"
              globalCompositeOperation={"source-over"}
            />
          </Group>
        ))}
      </Layer>
    </Stage>
  );
};

export default Canvas;
