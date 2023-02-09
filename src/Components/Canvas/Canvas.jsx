import React, { useState } from "react";
import { Stage } from "react-konva";
import Dialog from "../Dialog/Dialog";
import CanvasPuzzleLayer from "../CanvasPuzzleLayer/CanvasPuzzleLayer";
import { handleUndo } from "../../Logic/undo";

const Canvas = ({ image, visible }) => {
  if (!image || image == "") return;

  const [drawing, setDrawing] = useState(false);
  const [lines, setLines] = useState([]);

  // Some state vars to handle the undo dialog
  const [openDialog, setOpenDialog] = useState(false);
  const [undoType, setUndoType] = useState("");
  const [undoLineIndex, setUndoLineIndex] = useState(0);

  const handleUndoLocal = (type, i) => {
    let tempLines = handleUndo(lines, type, i);
    setLines(() => [...tempLines]);
  };
  const startDraw = (e) => {
    setDrawing(true);
    // add new object with points (which is the new line)
    setLines(() => [...lines, { points: [] }]);
  };
  const stopDraw = (e) => {
    setDrawing(false);
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
  const handleReset = () => {
    setOpenDialog(false);
    setLines([]);
  };
  const onCancelDialog = () => {
    setOpenDialog(false);
    undoType == "removeLine"
      ? handleUndoLocal("cancelDraw") // cancel dispatched "removeLine" type
      : handleUndoLocal("undoLast"); // cancel dispatched "removeLineDbClick" type
  };
  const onConfirmDialog = () => {
    handleUndoLocal(undoType, undoLineIndex);
    setOpenDialog(false);
  };
  const handleUndoDialog = (type, i) => {
    if (type === "cancelDraw" || type === "undoLast") {
      handleUndoLocal(type, null);
    } else {
      // need to the undo 'type' and puzzle piece 'index' before we open the dialog
      setUndoType(type);
      setUndoLineIndex(i);
      setOpenDialog(true);
    }
  };

  return (
    <>
      <Stage
        width={900}
        height={750}
        style={{ background: "#a9c3d0" }}
        onMouseDown={startDraw}
        onMouseMove={draw}
        onMouseUp={stopDraw}
        onTouchStart={startDraw}
        onTouchEnd={stopDraw}
        onTouchMove={draw}
        visible={visible}
      >
        <CanvasPuzzleLayer
          image={image}
          handleReset={handleReset}
          handleUndo={handleUndoLocal}
          handleUndoDialog={handleUndoDialog}
          lines={lines}
        />
      </Stage>
      {/* The undo dialog */}
      <Dialog
        open={openDialog}
        title={"Delete Puzzle Piece"}
        content={"Are you sure you want to delete this piece?"}
        onCancel={onCancelDialog}
        onConfirm={onConfirmDialog}
      />
    </>
  );
};

export default Canvas;
