import React, { useState } from "react";
import PuzzleImage from "./PuzzleImage";
import { Stage, Layer, Text, Line, Rect } from "react-konva";

const Canvas = ({ image }) => {
  const [drawing, setDrawing] = useState(false);
  // const [drag, setDrag] = useState(false);
  const [lines, setLines] = useState([]);
  const [savedLines, setSavedLines] = useState([]);
  const [startCoord, setStartCoord] = useState({});

  if (!image || image == "") return;
  const handleUndo = () => {
    console.log("undo");
    let tempLines = [...lines];
    tempLines.pop();
    tempLines.pop();
    setLines(() => [...tempLines]);
    setSavedLines(() => [...lines]);
  };
  const handleRedo = () => {
    console.log("Redo");
    let tempLines = [...savedLines];
    // tempLines.pop();
    // tempLines.pop();
    setLines(() => [...tempLines]);
  };

  const startDraw = (e) => {
    // if (drag) return;
    setDrawing(true);
    console.log("start draw");
    console.log(`x: ${e.evt.x}, y: ${e.evt.y}`);

    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { points: [pos.x, pos.y] }]);
    setStartCoord({ x: pos.x, y: pos.y });
  };
  const stopDraw = (e) => {
    // if (drag) return;
    console.log("stop draw");
    console.log(`x: ${e.evt.x}, y: ${e.evt.y}`);

    // connect first point of line to the last point
    let lastLine = lines[lines.length - 1];
    lastLine.points = lastLine.points.concat([startCoord.x, startCoord.y]);
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());

    setDrawing(false);
  };
  const draw = (e) => {
    // if (drag) return;
    if (!drawing) return;
    console.log("draw");

    // add point
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    lastLine.points = lastLine.points.concat([point.x, point.y]);
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };
  useEffect(() => {
    // document.addEventListener("keydown", handleUndo);
    document.dispatchEvent(
      new KeyboardEvent("keydown", { key: "z", ctrlKey: true })
    );

    return () => {
      document.removeEventListener("keydown");
    };
  }, [third]);

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={startDraw}
      onMouseUp={stopDraw}
      // onMouseLeave={stopDraw}
      onMouseMove={draw}
    >
      <Layer>
        <Rect width={800} height={500} fill="red" />
      </Layer>
      <Layer>
        <PuzzleImage imageSrc={image} />
      </Layer>
      <Layer>
        <Text text="undo" onClick={handleUndo} />
        <Text text="redo" x={40} onClick={handleRedo} />
        {lines.map((line, i) => (
          <Line
            key={i}
            points={line.points}
            stroke="#df4b26"
            strokeWidth={5}
            draggable
            tension={0.5}
            lineCap="round"
            lineJoin="round"
            globalCompositeOperation={"source-over"}
          />
        ))}
      </Layer>
    </Stage>
  );
};

export default Canvas;
