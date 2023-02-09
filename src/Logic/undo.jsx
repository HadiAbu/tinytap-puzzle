export const handleUndo = (lines, type, i) => {
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
  return tempLines;
};
