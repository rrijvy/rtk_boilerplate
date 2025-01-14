import { useState, useEffect, useRef } from 'react';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  name?: string;
}

export default function StoryBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: input,
      name: 'User',
    };

    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setIsLoading(true);

    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: 'I understand your curiosity! Would you like to learn more about this topic?',
        name: 'Bot',
      };
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="flex flex-col w-full max-w-2xl mx-auto bg-white shadow-xl rounded-lg">
        
        <div className="flex items-center justify-between p-4 border-b">
          <div className="text-xl font-semibold">Story Bot</div>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <i className="fa-solid fa-share w-5 h-5"></i>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
            <i className="fa-solid fa-volume-high"></i>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 max-w-[80%] ${message.sender === 'user' ? "ml-auto flex-row-reverse" : ""}`}
            >
              <div
                className={`rounded-2xl p-4 ${message.sender === 'user' ? "bg-purple-500 text-white" : "bg-gray-100 text-gray-900"}`}
              >
                <div className="font-medium mb-1">{message.name}</div>
                <div>{message.text}</div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3">
              <div className="bg-gray-100 rounded-2xl p-4">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        <div className="p-4 border-t">
          <div className="flex gap-2">
            <button className="p-2 text-yellow-500 hover:bg-gray-100 rounded-full">
              <i className="fa-solid fa-microphone w-5 h-5"></i>
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
            >
              <i className="fa-solid fa-paper-plane w-5 h-5"></i>
            </button>
          </div>
        </div>

        <div className="flex justify-around p-4 border-t">
          <button className="flex flex-col items-center p-2 hover:bg-gray-100 rounded-full">
            <i className="fa-solid fa-house w-5 h-5 mb-1"></i>
            <span className="text-xs">Home</span>
          </button>
          <button className="flex flex-col items-center p-2 hover:bg-gray-100 rounded-full">
            <i className="fa-solid fa-star w-5 h-5 mb-1"></i>
            <span className="text-xs">Chat</span>
          </button>
          <button className="flex flex-col items-center p-2 hover:bg-gray-100 rounded-full">
            <i className="fa-solid fa-history w-5 h-5 mb-1"></i>
            <span className="text-xs">History</span>
          </button>
        </div>
      </div>
    </div>
  );
}
