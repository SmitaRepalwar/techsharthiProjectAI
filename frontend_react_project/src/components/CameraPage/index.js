import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import jsPDF from 'jspdf';

function CameraCapture({ onCapture, onSendImageAsPDF }) {
  const [capturing, setCapturing] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const webcamRef = useRef(null);

  const handleCapture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);
    setCapturing(false);
    onCapture(imageSrc);
  };

  const handleSendImageAsPDF = () => {
    if (imageSrc) {
      const doc = new jsPDF();
      doc.addImage(imageSrc, 'JPEG', 10, 10, 180, 160);
      const pdfBlob = doc.output('blob');
      onSendImageAsPDF(pdfBlob);
    }
  };

  return (
    <div id="camera-container">
      {capturing ? (
        <>
          <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
          <button onClick={handleCapture}>Capture</button>
        </>
      ) : (
        <button onClick={() => setCapturing(true)}>Open Camera</button>
      )}
      {imageSrc && (
        <>
          <img src={imageSrc} alt="Captured" style={{ maxWidth: '100%' }} />
          <button onClick={handleSendImageAsPDF}>Send as PDF</button>
        </>
      )}
    </div>
  );
}

export default CameraCapture;
