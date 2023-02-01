import React, { useState, useRef } from "react";
import ImageUploader from "./Components/ImageUploader";
import Canvas from "./Components/Canvas";
import "./App.css";

function App() {
  const [image, setImage] = useState("");
  return (
    <div className="App">
      <ImageUploader setImage={setImage}></ImageUploader>
      <Canvas image={image} />
    </div>
  );
}

export default App;
