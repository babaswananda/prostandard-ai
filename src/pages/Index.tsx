import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import Sidebar from '@/components/Sidebar';
import ChatHeader from '@/components/ChatHeader';
import ChatInput from '@/components/ChatInput';
import ActionButtons from '@/components/ActionButtons';
import MessageList from '@/components/MessageList';
import ApiKeyInput from '@/components/ApiKeyInput';
import { Message } from '@/types/message';
import { v4 as uuidv4 } from 'uuid';

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [ollamaUrl, setOllamaUrl] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const storedUrl = localStorage.getItem('ollama_url');
    if (storedUrl) {
      setOllamaUrl(storedUrl);
    }
  }, []);

  const handleSendMessage = async (content: string) => {
    if (!ollamaUrl) {
      toast({
        title: "Server URL Required",
        description: "Please set your Ollama server URL first",
        className: "bg-black/80 text-white border-none",
      });
      return;
    }

    if (!content.trim()) {
      toast({
        title: "Message Required",
        description: "Please enter a message to continue",
        className: "bg-black/80 text-white border-none",
      });
      return;
    }

    const userMessage: Message = {
      id: uuidv4(),
      role: 'user',
      content
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch(`${ollamaUrl}/api/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama2:3.3',
          prompt: content,
          stream: false
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from Ollama');
      }

      const data = await response.json();
      
      const assistantMessage: Message = {
        id: uuidv4(),
        role: 'assistant',
        content: data.response || 'Sorry, I could not generate a response.'
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get response from Ollama. Please check your server URL and ensure Ollama is running.",
        variant: "destructive",
        className: "bg-black/80 text-white border-none",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleActionMessage = (title: string) => {
    let assistantMessage = "";
    switch (title) {
      case "Team Gear":
        assistantMessage = "Welcome to Pro Standard's exclusive team collection! We specialize in premium athletic wear and accessories. Which team's collection would you like to explore? We have exclusive partnerships with major teams in Brooklyn, Atlanta, Tampa, and more.";
        break;
      case "Size Finder":
        assistantMessage = "Let me help you find your perfect size in our luxury athletic wear. Our sizing is designed for optimal fit and comfort. Could you tell me:\n\n1. Your usual size in athletic wear\n2. Your preferred fit (regular, slim, or relaxed)\n3. The specific item you're interested in?";
        break;
      case "New Releases":
        assistantMessage = "Here are our latest exclusive drops:\n\n1. Los Angeles Dodgers Sublimated Satin Jacket\n- Premium satin finish\n- Exclusive design\n- Limited quantities\n\n2. Brooklyn Nets Heritage Collection\n- Authentic materials\n- Vintage-inspired\n\n3. Atlanta Hawks Signature Series\n- Custom embroidery\n- Premium materials\n\nWhich collection would you like to learn more about?";
        break;
      case "Color Match":
        assistantMessage = "I'll help you create the perfect color-coordinated outfit. Our collections are designed with complementary color schemes. Let's start with:\n\n1. What team gear are you looking to match?\n2. Do you prefer bold or subtle coordination?\n3. Any specific sneakers you'd like to match with?";
        break;
      case "Limited Editions":
        assistantMessage = "You've accessed our exclusive Limited Editions section! Currently available:\n\n1. Brooklyn Nets x Pro Standard Gold Series\n- Only 100 pieces worldwide\n- Numbered editions\n- Certificate of authenticity\n\n2. LA Dodgers Championship Collection\n- Commemorative design\n- Premium materials\n- Exclusive colorway\n\nWhich exclusive piece interests you?";
        break;
    }

    setMessages(prev => [
      ...prev,
      {
        id: uuidv4(),
        role: 'assistant',
        content: assistantMessage
      }
    ]);
  };

  const handleNewChat = () => {
    setMessages([]);
    toast({
      title: "Chat Cleared",
      description: "Started a new conversation",
      className: "bg-black/80 text-white border-none",
    });
  };

  if (!ollamaUrl) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900">
        <ApiKeyInput onApiKeySet={setOllamaUrl} />
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <div className="fixed left-0 top-0 z-50 h-full">
        <Sidebar 
          isOpen={isSidebarOpen} 
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          onApiKeyChange={() => {}} 
          onNewChat={handleNewChat}
          onChatResponse={() => {}}
        />
      </div>
      
      <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <div className="fixed top-0 left-0 right-0 z-40">
          <ChatHeader isSidebarOpen={isSidebarOpen} />
        </div>
        
        <div className={`flex h-full flex-col ${messages.length === 0 ? 'items-center justify-center' : 'justify-between'} pt-[60px] pb-4`}>
          {messages.length === 0 ? (
            <div className="w-full max-w-3xl px-4 space-y-4">
              <div>
                <h1 className="mb-8 text-4xl font-semibold text-center gold-gradient">Find Your Perfect Team Gear Match</h1>
                <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
              </div>
              <ActionButtons onAction={handleActionMessage} />
            </div>
          ) : (
            <>
              <MessageList messages={messages} />
              <div className="w-full max-w-3xl mx-auto px-4 py-2">
                <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
              </div>
              <div className="text-xs text-center text-gray-500 py-2">
                ProStandard AI - Your Luxury Athletic Collection Assistant
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;