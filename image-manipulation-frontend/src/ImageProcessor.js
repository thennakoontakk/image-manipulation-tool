// src/ImageProcessor.js
import React, { useState, useRef, useEffect } from 'react';
import cv from 'opencv.js';

const ImageProcessor = () => {
  const [originalImage, setOriginalImage] = useState(null);
  const [modifiedImage, setModifiedImage] = useState(null);
  const canvasRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setOriginalImage(reader.result);
        setModifiedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const drawImage = (imageSrc, canvas) => {
    const img = new Image();
    img.onload = () => {
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
    };
    img.src = imageSrc;
  };

  const convertToGrayscale = () => {
    if (!originalImage) return;

    const canvas = canvasRef.current;
    drawImage(originalImage, canvas);

    const src = cv.imread(canvas);
    const dst = new cv.Mat();

    cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY);
    cv.imshow(canvas, dst);
    src.delete();
    dst.delete();
  };

  const rotateImage = (angle) => {
    if (!originalImage) return;

    const canvas = canvasRef.current;
    drawImage(originalImage, canvas);

    const src = cv.imread(canvas);
    const dst = new cv.Mat();
    const center = new cv.Point(src.cols / 2, src.rows / 2);
    const M = cv.getRotationMatrix2D(center, angle, 1);
    cv.warpAffine(src, dst, M, new cv.Size(src.cols, src.rows));
    cv.imshow(canvas, dst);
    src.delete();
    dst.delete();
    M.delete();
  };

  const cropImage = (x, y, width, height) => {
    if (!originalImage) return;

    const canvas = canvasRef.current;
    drawImage(originalImage, canvas);

    const src = cv.imread(canvas);
    const dst = src.roi(new cv.Rect(x, y, width, height));
    cv.imshow(canvas, dst);
    src.delete();
    dst.delete();
  };

  const flipImage = () => {
    if (!originalImage) return;

    const canvas = canvasRef.current;
    drawImage(originalImage, canvas);

    const src = cv.imread(canvas);
    const dst = new cv.Mat();

    cv.flip(src, dst, 1); // Flip horizontally
    cv.imshow(canvas, dst);
    src.delete();
    dst.delete();
  };

  return (
    <div>
      <input type="file" onChange={handleImageUpload} />
      <div style={{ display: 'flex' }}>
        <canvas ref={canvasRef} />
        {originalImage && (
          <div>
            <h3>Original Image</h3>
            <img src={originalImage} alt="original" style={{ maxWidth: '300px' }} />
          </div>
        )}
      </div>
      <button onClick={convertToGrayscale}>Convert to Grayscale</button>
      <button onClick={() => rotateImage(90)}>Rotate 90°</button>
      <button onClick={() => cropImage(50, 50, 200, 200)}>Crop</button>
      <button onClick={flipImage}>Flip</button>
    </div>
  );
};

export default ImageProcessor;
