import React from "react";

const ImageSelector = ({ images, selectedImage, setSelected }) => {
  return (
    <>
      <h4 style={{ display: "flex", color: "palevioletred" }}>
        Choose your picture:{" "}
      </h4>
      <div style={{ display: "flex", marginBottom: "25px 0" }}>
        {images.map((image, i) => {
          return (
            <div
              style={{
                border: selectedImage === image ? "red 1px solid" : "none",
              }}
              key={image}
            >
              <img
                style={{ margin: "8px" }}
                src={image}
                alt={image}
                width={40}
                height={30}
                onClick={() => setSelected(image)}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ImageSelector;
