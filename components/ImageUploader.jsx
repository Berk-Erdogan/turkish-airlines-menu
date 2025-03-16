import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';

export default function ImageUploader({ onImageUpload, isLoading }) {
  const [preview, setPreview] = useState(null);
  
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      
      // Set preview URL
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      
      // Send Image to the parent component for processing
      onImageUpload(file);
      
      // When the component unmounts, clear the URL
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [onImageUpload]);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/jpg': []
    },
    maxFiles: 1,
    disabled: isLoading
  });
  
  return (
    <div className="space-y-4">
      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-red-400'}
          ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <input {...getInputProps()} />
        <div className="space-y-2">
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
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          
          {isLoading ? (
            <p className="text-sm text-gray-500">Processing...</p>
          ) : (
            <>
              <p className="text-sm text-gray-500">
                <span className="font-medium text-red-600">Click Here</span> or drag a Menu
              </p>
              <p className="text-xs text-gray-400">
                PNG, JPG, JPEG (maks. 10MB)
              </p>
            </>
          )}
        </div>
      </div>
      
      {/* Image Preview */}
      {preview && (
        <div className="mt-4 relative">
          <div className="relative w-full h-64">
            <Image 
              src={preview} 
              alt="Preview Menu" 
              fill
              className="object-contain rounded-lg"
            />
          </div>
          {!isLoading && (
            <button
              onClick={() => setPreview(null)}
              className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1"
              title="Resmi kaldır"
            >
              <svg 
                className="h-5 w-5" 
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
          )}
        </div>
      )}
    </div>
  );
}