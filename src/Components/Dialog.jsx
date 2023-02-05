import React from "react";
import "../App.css";

const Dialog = ({ title, content, onConfirm, onCancel }) => {
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
