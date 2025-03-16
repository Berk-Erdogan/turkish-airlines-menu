'use client';

import { useState } from 'react';
import ImageUploader from '@/components/ImageUploader';
import CameraCapture from '@/components/CameraCapture';
import MenuDisplay from '@/components/MenuDisplay';
import ChatInterface from '@/components/ChatInterface';
import { extractMenuFromImage } from '@/lib/gemini';

export default function Home() {
  const [activeTab, setActiveTab] = useState('upload'); 
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [extractionComplete, setExtractionComplete] = useState(false);

  
  const handleImageProcessing = async (imageFile) => {
    setIsLoading(true);
    setError(null);
    setExtractionComplete(false);
    
    try {
      const extractedMenu = await extractMenuFromImage(imageFile);
      setMenuItems(extractedMenu);
      setExtractionComplete(true);
    } catch (err) {
      console.error('Menu Extraction Error:', err);
      setError('Menu item extraction failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col space-y-8">
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Turkish Airlines On-Board Flight Menu Assistant
        </h1>
        <p className="text-gray-600 mb-6">
          Upload a photo or use your camera to get started while you enjoy your flight!
        </p>
        
        {/* Tab Buttons */}
        <div className="flex space-x-2 mb-6">
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-4 py-2 rounded ${
              activeTab === 'upload'
                ? 'bg-red-600 text-white'
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            Upload Menu
          </button>
          <button
            onClick={() => setActiveTab('camera')}
            className={`px-4 py-2 rounded ${
              activeTab === 'camera'
                ? 'bg-red-600 text-white'
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            Use Camera
          </button>
        </div>
        
        {/* Image Upload or Camera Capture Components */}
        <div className="bg-gray-100 p-4 rounded-lg">
          {activeTab === 'upload' ? (
            <ImageUploader onImageUpload={handleImageProcessing} isLoading={isLoading} />
          ) : (
            <CameraCapture onImageCapture={handleImageProcessing} isLoading={isLoading} />
          )}
        </div>
      </section>
      
      {/* "Loading Indicator" */}
      {isLoading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Analyzing the Menu...</p>
        </div>
      )}
      
      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
          <p>{error}</p>
        </div>
      )}
      
      {/*Menu and Chat Sections*/}
      {extractionComplete && menuItems.length > 0 && (
        <div className="grid md:grid-cols-2 gap-8">
          <MenuDisplay menuItems={menuItems} />
          <ChatInterface menuItems={menuItems} />
        </div>
      )}
    </div>
  );
}