import React from "react";
import useImage from "use-image";
import { Image } from "react-konva";

const PuzzleImage = ({ imageSrc }) => {
  const [image] = useImage(imageSrc);
  return <Image image={image} width={900} height={500} />;
};

export default PuzzleImage;
