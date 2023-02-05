import React, { useState } from "react";
import { Stage, Layer, Line, Group } from "react-konva";
import PuzzleImage from "./PuzzleImage";
import PuzzlePiece, { PuzzlePieceGrayFiller } from "./PuzzlePiece";
import ControlButtons from "./ControlButtons";
import Dialog from "./Dialog";

const Canvas = ({ image, visible }) => {
  if (!image || image == "") return;

  const [drawing, setDrawing] = useState(false);
  const [lines, setLines] = useState([]);

  // Some state vars to handle the undo dialog
  const [openDialog, setOpenDialog] = useState(false);
  const [undoType, setUndoType] = useState("");
  const [undoLineIndex, setUndoLineIndex] = useState(0);

  const handleUndoDialog = (type, i) => {
    if (type === "cancelDraw" || type === "undoLast") {
      handleUndo(type);
    } else {
      // need to the undo 'type' and puzzle piece 'index' before we open the dialog
      setUndoType(type);
      setUndoLineIndex(i);
      setOpenDialog(true);
    }
  };

  const handleUndo = (type, i) => {
    let tempLines = [...lines];
    switch (type) {
      case "undoLast":
        // remove last two points that created a new line
        // one of them is the last point which is a click on the undo text button
        tempLines.pop();
        tempLines.pop();
        break;
      case "cancelDraw":
        // remove last point that created a new line
        tempLines.pop();
        break;
      case "removeLine":
        // remove last point that created a new line and remove specific line
        tempLines.pop();
        tempLines.splice(i, 1);
        break;
      case "removeLineDbClick":
        // remove two last points that created a new line and remove specific line
        tempLines.pop();
        tempLines.pop();
        tempLines.splice(i, 1);
        break;
    }
    setLines(() => [...tempLines]);
  };
  const startDraw = (e) => {
    setDrawing(true);
    // add new object with points (which is the new line)
    setLines(() => [...lines, { points: [] }]);
  };
  const draw = (e) => {
    const point = e.target.getStage().getPointerPosition();
    if (!drawing || point.y > 500) return;

    let lastLine = lines[lines.length - 1];
    // add point to last line
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    // replace last line
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(() => lines.concat());
  };

  return (
    <>
      <Stage
        width={900}
        height={750}
        style={{ background: "#a9c3d0" }}
        onMouseDown={startDraw}
        onMouseMove={draw}
        onMouseUp={() => setDrawing(false)}
        visible={visible}
      >
        <Layer>
          {/* Uploaded image */}
          <PuzzleImage imageSrc={image} />
          {/* PuzzlePieceGrayFiller  */}
          {lines.length != 0 &&
            lines.map((line, i) => (
              <PuzzlePieceGrayFiller key={i} points={line.points} />
            ))}
          {/* Draggable puzzle piece */}
          {lines.length != 0 &&
            lines.map((line, i) => (
              <PuzzlePiece
                key={i}
                index={i}
                imageSrc={image}
                points={line.points}
                handleUndo={handleUndoDialog}
              />
            ))}
          {/* Undo and Reset buttons */}
          <ControlButtons
            handleUndo={handleUndo}
            handleReset={() => {
              setOpenDialog(false);
              setLines([]);
            }}
          />
          {/* tracing a path that will turn into a puzzle piece */}
          {lines.map((line, i) => (
            <Group key={i}>
              <Line
                points={line.points}
                tension={0.5}
                lineCap="round"
                lineJoin="round"
                stroke="red"
                globalCompositeOperation={"source-over"}
              />
            </Group>
          ))}
        </Layer>
      </Stage>
      {/* The undo dialog */}
      {openDialog && (
        <Dialog
          title={"Delete Puzzle Piece"}
          content={"Are you sure you want to delete this piece?"}
          onCancel={() => {
            setOpenDialog(false);
            undoType == "removeLine"
              ? handleUndo("cancelDraw") // cancel dispatched "removeLine" type
              : handleUndo("undoLast"); // cancel dispatched "removeLineDbClick" type
          }}
          onConfirm={() => {
            handleUndo(undoType, undoLineIndex);
            setOpenDialog(false);
          }}
        />
      )}
    </>
  );
};

export default Canvas;
