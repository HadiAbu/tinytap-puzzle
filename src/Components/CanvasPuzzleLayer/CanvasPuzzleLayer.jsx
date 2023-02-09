import React from "react";
import { Group, Layer, Line } from "react-konva";
import ControlButtons from "../Controls/ControlButtons";
import PuzzleImage from "../PuzzlePiece/PuzzleImage";
import PuzzlePiece from "../PuzzlePiece/PuzzlePiece";
import PuzzlePieceGrayFiller from "../PuzzlePiece/PuzzlePieceGrayFiller";

const CanvasPuzzleLayer = ({
  image,
  handleUndo,
  handleReset,
  handleUndoDialog,
  lines,
}) => {
  const handleUndoLast = () => handleUndo("undoLast");

  return (
    <Layer>
      {/* Uploaded image */}
      <PuzzleImage imageSrc={image} />
      {/* PuzzlePieceGrayFiller  */}
      {Array.isArray(lines) &&
        lines.length != 0 &&
        lines.map((line, i) => (
          <PuzzlePieceGrayFiller key={i} points={line.points} />
        ))}
      {/* Draggable puzzle piece */}
      {Array.isArray(lines) &&
        lines.length != 0 &&
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
        handleUndoLast={handleUndoLast}
        handleReset={handleReset}
      />
      {/* tracing a path that will turn into a puzzle piece */}
      {Array.isArray(lines) &&
        lines.map((line, i) => (
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
  );
};

export default CanvasPuzzleLayer;
