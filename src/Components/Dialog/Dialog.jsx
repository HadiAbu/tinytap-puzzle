import React from "react";
import "./Dialog.css";

const Dialog = ({ open, title, content, onConfirm, onCancel }) => {
  if (!open) return null;
  return (
    <div className="dialog">
      <h3 style={{ borderBottom: "1px black solid", paddingBottom: "10px" }}>
        {title}
      </h3>
      <div style={{ textAlign: "left", padding: "10px" }}>{content}</div>
      <div className="dialog-footer">
        <input
          className="button"
          type={"button"}
          value="Cancel"
          onClick={onCancel}
        />
        <input
          className="button"
          type={"button"}
          value="Delete"
          onClick={onConfirm}
        />
      </div>
    </div>
  );
};

export default Dialog;
