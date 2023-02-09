import React from "react";
import Canvas from "../Canvas/Canvas";
import Header from "./Header";
import ImageSelector from "../ImageSelector/ImageSelector";

const HeaderCanvasSelector = ({ images, selectedImage, setSelectedImage }) => {
  return (
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
  );
};

export default HeaderCanvasSelector;
