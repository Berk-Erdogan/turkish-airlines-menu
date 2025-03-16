/** @type {import('next').NextConfig} */
const nextConfig = {
  // Kamera özellikleri için tanım
  experimental: {
    serverActions: true,
  },
  
  // Resimleri optimize etmek için uzak alan adlarını izin ver
  images: {
    domains: ['dummyimage.com', 'turkishairlines.com'],
  },
  
  // React Strict Mode
  reactStrictMode: true,
  
  // Gereksiz JavaScript'i azaltmak için sunucu bileşenlerini kullan
  serverComponents: true,
  
  // env değişkenlerini istemci tarafında kullanılabilir yap
  publicRuntimeConfig: {
    NEXT_PUBLIC_GEMINI_API_KEY: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
    NEXT_PUBLIC_DEFAULT_LANGUAGE: process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE,
  },
};

module.exports = nextConfig;