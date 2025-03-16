import { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import Image from 'next/image';

export default function CameraCapture({ onImageCapture, isLoading }) {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const webcamRef = useRef(null);
  
  // Camera Open/Close
  const toggleCamera = () => {
    if (!isLoading) {
      setIsCameraActive(!isCameraActive);
      setCapturedImage(null);
    }
  };
  
  // Image Capture
  const captureImage = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImage(imageSrc);
      
      // Convert Base64 image to File object
      const byteString = atob(imageSrc.split(',')[1]);
      const mimeString = imageSrc.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      
      const blob = new Blob([ab], { type: mimeString });
      const file = new File([blob], "camera-capture.jpg", { type: mimeString });
      
      onImageCapture(file);
    }
  };
  
  // Retake Photo
  const retakePhoto = () => {
    if (!isLoading) {
      setCapturedImage(null);
    }
  };
  
  return (
    <div className="space-y-4">
      {!isCameraActive && !capturedImage && (
        <div className="text-center p-6 border-2 border-dashed border-gray-300 rounded-lg">
          <svg 
            className="mx-auto h-12 w-12 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" 
            />
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" 
            />
          </svg>
          <button
            onClick={toggleCamera}
            disabled={isLoading}
            className={`
              mt-4 px-4 py-2 bg-red-600 text-white rounded-md
              ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-700'}
            `}
          >
            Open Camera
          </button>
        </div>
      )}
      
      {isCameraActive && !capturedImage && (
        <div className="relative">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{
              facingMode: "user"
            }}
            className="w-full rounded-lg"
          />
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
            <button
              onClick={toggleCamera}
              disabled={isLoading}
              className="p-2 bg-white text-red-600 rounded-full shadow-md"
              title="Kamerayı Kapat"
            >
              <svg 
                className="h-6 w-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M6 18L18 6M6 6l12 12" 
                />
              </svg>
            </button>
            <button
              onClick={captureImage}
              disabled={isLoading}
              className="p-3 bg-red-600 text-white rounded-full shadow-md"
              title="Fotoğraf Çek"
            >
              <svg 
                className="h-8 w-8" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M12 15a3 3 0 100-6 3 3 0 000 6z" 
                />
              </svg>
            </button>
          </div>
        </div>
      )}
      
      {capturedImage && (
        <div className="relative">
          <div className="relative w-full h-64">
            <Image 
              src={capturedImage} 
              alt="Çekilen Fotoğraf" 
              fill
              className="object-contain rounded-lg"
            />
          </div>
          
          {!isLoading && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
              <button
                onClick={retakePhoto}
                className="px-4 py-2 bg-gray-600 text-white rounded-md"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      )}
      
      {isLoading && (
        <div className="text-center py-2">
          <p className="text-sm text-gray-500">Processing...</p>
        </div>
      )}
    </div>
  );
}