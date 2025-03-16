# Turkish Technology Digital Lab Case Developped by Berk Erdoğan

Designed and developped for Turkish Technology Digital Lab

## Features
```
Menu Upload or Take a Image
Menu Extraction and Analysis with Gemini AI
Item Filteration
Multi-Language Support
```

## Used Technologys
```
Frontend : Next.js, React, Tailwind CSS
API Integration : Google Gemini AI
Language Detection : Google Gemini AI
Image Processing :React-dropzone,react-webcam
```

## How to Setup?
```
1.Clone the project to your environment
2.install the dependencies with npm install
3.Set up a .env.local file with bellowed format

# Gemini API key
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here

# Default Lenguage
NEXT_PUBLIC_DEFAULT_LANGUAGE=en

4.type npm run dev to terminal

```

## Main Components
```
ImageUploader and CameraCapture: Image upload or capture feature
Menu Display: Display Menu by categories and filters
Chat Interface: Ask or Chat about Menu 
API Routes:Server side API's for menu extraction,chat and language detection 
```