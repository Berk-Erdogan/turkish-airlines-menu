/** @type {import('next').NextConfig} */
const nextConfig = {
  
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000'] 
    },
    
  },
  
  // Allow remote domains for image optimization
  images: {
    domains: ['dummyimage.com', 'turkishairlines.com'],
  },
  
  // React Strict Mode
  reactStrictMode: true,
  
  
  // Make env variables available on the client side
  publicRuntimeConfig: {
    NEXT_PUBLIC_GEMINI_API_KEY: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
    NEXT_PUBLIC_DEFAULT_LANGUAGE: process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE,
  },
};

module.exports = nextConfig;