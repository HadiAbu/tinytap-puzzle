import React from "react";

const Header = () => (
  <div style={{ color: "palevioletred", margin: "10px 0" }}>
    <span>Please draw a path to create a puzzle piece</span>
    <br />
    <span>
      (You can <span style={{ color: "red" }}>double click </span>
      on a puzzle piece to <span style={{ color: "red" }}>cancel </span> it or
      click the <span style={{ color: "red" }}>close icon </span>)
    </span>
  </div>
);
export default Header;
