'use client';

export default function Home() {
  

  return (
    <div className="flex flex-col space-y-8">
      <section className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
          About Our Technology
        </h1>
      </section>
      
      <section className="bg-white p-6 rounded-lg shadow-lg transition-transform duration-300 ease-out hover:-translate-y-1 border border-gray-300">
        <p className="text-gray-600 mb-6">
        Welcome to the cutting-edge Turkish Airlines Menu Assistant, an innovative platform meticulously designed to enhance your in-flight dining experience through artificial intelligence integration. This advanced web application establishes a seamless connection with Google's Gemini AI to deliver personalized menu interaction capabilities while you travel.
        </p>
        <p className="text-gray-600 mb-6">
  Our platform enables passengers to effortlessly capture or upload images of their in-flight menu through an intuitive interface, whereupon our sophisticated AI system processes the visual data to extract comprehensive menu information. The system employs state-of-the-art computer vision and natural language processing technologies to accurately identify menu items, ingredients, nutritional information, and preparation methods.
  Once the system has processed your menu image, passengers gain access to an interactive conversational interface powered by Gemini AI.
        </p>
        <p className="text-gray-600 mb-6">
  The Turkish Airlines Menu Assistant represents our commitment to technological innovation in service delivery, providing passengers with unprecedented control over their dining choices. This system proves particularly valuable for travelers with dietary restrictions, food allergies, or specific nutritional requirements, offering them detailed insights into meal compositions without requiring flight attendant intervention.
        </p>

        <p className="text-gray-600 mb-6">
  All interactions occur in real-time, with the system continuously learning and improving through passenger engagement.
  Your privacy and data security remain paramount concerns, with all uploaded images and conversations being processed in accordance with stringent data protection protocols. This ensures that your personal information remains confidential while you benefit from this enhanced service offering.
        </p>

        <p className="text-gray-600 mb-6">
  Experience the future of in-flight dining with the Turkish Airlines Menu Assistant—where artificial intelligence meets culinary excellence at 30,000 feet.
        </p>
      </section>

      
    </div>
  );
}