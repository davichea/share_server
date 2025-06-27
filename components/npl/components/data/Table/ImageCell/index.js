// components/ImageCell.jsx
import React from "react";

const ImageCell = ({ src, alt = "Image", size = 48 }) => {
  return (
    <img
      src={src}
      alt={alt}
      className="object-cover rounded"
      style={{ width: size, height: size }}
    />
  );
};

export default ImageCell;
