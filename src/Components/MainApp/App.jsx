import React, { useState, useEffect } from "react";
import HeaderCanvasSelector from "../HeaderCanvasSelector/HeaderCanvasSelector";
import ImageUploader from "../ImageHandler/ImageUploader";
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

  const nonEmptyImagesArray = Array.isArray(images) && images.length != 0;

  return (
    <div className="App">
      {nonEmptyImagesArray && (
        <HeaderCanvasSelector
          images={images}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
      )}
      <ImageUploader
        firstMessage={images.length === 0}
        setImage={setSelectedImage}
      />
    </div>
  );
}

export default App;
