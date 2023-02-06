import React from "react";

const ImageUploader = ({ setImage, firstMessage = true }) => {
  function handleImage(e) {
    var reader = new FileReader();
    reader.onloadend = function (event) {
      var img = new Image();
      img.src = event.target.result;
      setImage(img.src);
    };
    reader.readAsDataURL(e.target.files[0]);
  }

  return (
    <div style={{ color: "palevioletred" }}>
      {firstMessage ? (
        <>
          <h1>Helllllloooo</h1>
          <h3>Let's start with uploading an image File..</h3>
          <br />
        </>
      ) : (
        <>
          <br />
          <label style={{ display: "flex" }}>Upload more images: </label>
        </>
      )}
      <input style={{ display: "flex" }} type="file" onChange={handleImage} />
    </div>
  );
};

export default ImageUploader;
