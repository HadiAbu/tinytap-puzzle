import React from "react";

const ImageUploader = React.forwardRef(({ setImage }, canvasRef) => {
  function handleImage(e) {
    var reader = new FileReader();
    reader.onload = function (event) {
      var img = new Image();
      img.onload = function () {
        // changing canvas width and height
        // canvasRef.current.width = img.width;
        // canvasRef.current.height = img.height;
        // // changing canvas content
        // canvasRef.current.getContext("2d").drawImage(img, 0, 0);
      };
      img.src = event.target.result;
      setImage(img.src);
    };
    reader.readAsDataURL(e.target.files[0]);
  }
  return (
    <div>
      <label>Image File:</label>
      <input type="file" onChange={handleImage} />
    </div>
  );
});

export default ImageUploader;
