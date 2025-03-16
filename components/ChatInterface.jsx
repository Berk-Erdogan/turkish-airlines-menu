import { useState, useRef, useEffect } from 'react';
import LanguageSelector from './LanguageSelector';
import { answerMenuQuestion, detectLanguage } from '@/lib/gemini';

// Message Type Enum
const MessageType = {
  USER: 'user',
  BOT: 'bot'
};


const getWelcomeMessage = (language) => {
  const welcomeMessages = {
    en: "Hello! I'm your virtual assistant for Turkish Airlines in-flight menu. Feel free to ask me any questions about the menu items, dietary options, or ingredients.",
    tr: "Merhaba! Türk Hava Yolları uçak içi menüsü için sanal asistanınızım. Menü öğeleri, diyet seçenekleri veya içerikler hakkında bana istediğiniz soruyu sorabilirsiniz.",
    de: "Hallo! Ich bin Ihr virtueller Assistent für das Bordmenü von Turkish Airlines. Sie können mir gerne Fragen zu Menüpunkten, Ernährungsoptionen oder Zutaten stellen.",
    fr: "Bonjour! Je suis votre assistant virtuel pour le menu à bord de Turkish Airlines. N'hésitez pas à me poser des questions sur les plats, les options diététiques ou les ingrédients.",
    es: "¡Hola! Soy su asistente virtual para el menú a bordo de Turkish Airlines. No dude en hacerme cualquier pregunta sobre los platos, opciones dietéticas o ingredientes.",
    ru: "Здравствуйте! Я ваш виртуальный помощник по меню на борту Turkish Airlines. Не стесняйтесь задавать мне любые вопросы о блюдах, диетических опциях или ингредиентах.",
    ar: "مرحبًا! أنا مساعدك الافتراضي لقائمة الطعام على متن الخطوط الجوية التركية. لا تتردد في طرح أي أسئلة حول عناصر القائمة أو الخيارات الغذائية أو المكونات.",
    zh: "你好！我是土耳其航空机上餐单的虚拟助手。随时向我询问有关菜单项，饮食选择或成分的任何问题。",
    ja: "こんにちは！私はトルコ航空機内メニューのバーチャルアシスタントです。メニュー項目、食事オプション、または成分について、お気軽にご質問ください。",
  };
  
  return welcomeMessages[language] || welcomeMessages.en;
};


const getSampleQuestions = (language) => {
  const questions = {
    en: [
      "What vegetarian options are available?",
      "Does the menu have any gluten-free items?",
      "Tell me about the desserts on the menu.",
      "What drinks are served?",
    ],
    tr: [
      "Hangi vejetaryen seçenekler var?",
      "Menüde glutensiz öğeler var mı?",
      "Menüdeki tatlılar hakkında bilgi ver.",
      "Hangi içecekler servis ediliyor?",
    ],
    de: [
      "Welche vegetarischen Optionen gibt es?",
      "Gibt es glutenfreie Gerichte im Menü?",
      "Erzählen Sie mir über die Desserts im Menü.",
      "Welche Getränke werden serviert?",
    ],
    fr: [
      "Quelles options végétariennes sont disponibles?",
      "Le menu propose-t-il des plats sans gluten?",
      "Parlez-moi des desserts du menu.",
      "Quelles boissons sont servies?",
    ],
    es: [
      "¿Qué opciones vegetarianas están disponibles?",
      "¿El menú tiene algún plato sin gluten?",
      "Háblame de los postres en el menú.",
      "¿Qué bebidas se sirven?",
    ],
    ru: [
      "Какие вегетарианские блюда доступны?",
      "Есть ли в меню безглютеновые блюда?",
      "Расскажите о десертах в меню.",
      "Какие напитки подаются?",
    ],
    ar: [
      "ما هي الخيارات النباتية المتاحة؟",
      "هل تحتوي القائمة على أي عناصر خالية من الغلوتين؟",
      "أخبرني عن الحلويات في القائمة.",
      "ما هي المشروبات التي يتم تقديمها؟",
    ],
    zh: [
      "有哪些素食选择？",
      "菜单上有无麸质的食物吗？",
      "告诉我菜单上的甜点。",
      "供应哪些饮料？",
    ],
    ja: [
      "どのようなベジタリアンオプションがありますか？",
      "メニューにグルテンフリーの項目はありますか？",
      "メニューのデザートについて教えてください。",
      "どのような飲み物が提供されますか？",
    ],
  };
  
  return questions[language] || questions.en;
};

export default function ChatInterface({ menuItems }) {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState('en');
  
  const messagesEndRef = useRef(null);
  
  // Add Welcome message when components added
  useEffect(() => {
    setMessages([
      {
        type: MessageType.BOT,
        text: getWelcomeMessage(language)
      }
    ]);
  }, [language]);
  
  // smooth scroll to bottom when new message added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Send Message Function
  const sendMessage = async () => {
    if (!inputText.trim() || isLoading) return;
    
    const userMessage = {
      type: MessageType.USER,
      text: inputText
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputText('');
    setIsLoading(true);
    
    try {
      // Detect the language of the input text
      const detectedLanguage = await detectLanguage(inputText);
      
      // if detected language is different than the current language, change the language
      if (detectedLanguage !== language) {
        setLanguage(detectedLanguage);
      }
      
      // answer the question
      const answer = await answerMenuQuestion(menuItems, inputText, detectedLanguage);
      
      // add the answer to the messages
      setMessages(prevMessages => [
        ...prevMessages, 
        {
          type: MessageType.BOT,
          text: answer
        }
      ]);
    } catch (error) {
      console.error('Mesaj gönderme hatası:', error);
      
      // previev messages and add error message
      setMessages(prevMessages => [
        ...prevMessages, 
        {
          type: MessageType.BOT,
          text: "I'm sorry, there is an error occured while answering your question. Please try again."
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Select Sample Question
  const selectSampleQuestion = (question) => {
    setInputText(question);
  };
  
  // Language Change
  const handleLanguageChange = (langCode) => {
    setLanguage(langCode);
    
    // Add Welcome message when language changed
    setMessages([
      {
        type: MessageType.BOT,
        text: getWelcomeMessage(langCode)
      }
    ]);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md flex flex-col h-full">
      {/* Chat Header */}
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Menü Asistanı</h2>
        <div className="w-32">
          <LanguageSelector 
            selectedLanguage={language} 
            onLanguageChange={handleLanguageChange} 
          />
        </div>
      </div>
      
      {/* Chat Space */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50 max-h-96">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.type === MessageType.USER ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-xs md:max-w-md lg:max-w-lg rounded-lg px-4 py-2 ${
                  message.type === MessageType.USER
                    ? 'bg-red-600 text-white rounded-br-none'
                    : 'bg-gray-200 text-gray-800 rounded-bl-none'
                }`}
              >
                <p className="text-sm">{message.text}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Example Questions */}
      <div className="px-4 py-2 border-t border-b bg-gray-50">
        <p className="text-xs text-gray-500 mb-2">Example Questions:</p>
        <div className="flex flex-wrap gap-2">
          {getSampleQuestions(language).map((question, index) => (
            <button
              key={index}
              onClick={() => selectSampleQuestion(question)}
              className="text-xs bg-gray-200 hover:bg-gray-300 text-gray-700 px-2 py-1 rounded-full truncate max-w-[200px]"
            >
              {question}
            </button>
          ))}
        </div>
      </div>
      
      {/* Message Input */}
      <div className="p-4 border-t">
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className="flex items-center space-x-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={language === 'tr' ? "Menü hakkında bir soru sorun..." : "Ask a question about the menu..."}
            className="flex-1 rounded-full border-gray-300 focus:border-red-500 focus:ring focus:ring-red-200 px-4 py-2"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !inputText.trim()}
            className={`rounded-full p-2 ${
              isLoading || !inputText.trim()
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-red-600 text-white hover:bg-red-700'
            }`}
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            ) : (
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
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}