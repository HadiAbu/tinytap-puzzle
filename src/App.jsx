import React, { useState, useEffect } from "react";
import Canvas from "./Components/Canvas";
import ImageUploader from "./Components/ImageUploader";
import ImageSelector from "./Components/ImageSelector";
import "./App.css";

function App() {
  const [selectedImage, setSelectedImage] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    // update the images array when we have a new selectedImage (either by upload or click on thumbnail)
    let index = images.findIndex((img) => img === selectedImage);
    if (index == -1 && selectedImage != "") {
      setImages((images) => [...images, selectedImage]);
    }
  }, [selectedImage]);

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
  return (
    <div className="App">
      {Array.isArray(images) && images.length != 0 && (
        <>
          <Header />
          {images.map((image) => (
            <Canvas
              key={image}
              image={selectedImage}
              visible={selectedImage === image}
            />
          ))}
          <ImageSelector
            images={images}
            selectedImage={selectedImage}
            setSelected={setSelectedImage}
          />
        </>
      )}
      <ImageUploader
        firstMessage={images.length === 0}
        setImage={setSelectedImage}
      />
    </div>
  );
}

export default App;
