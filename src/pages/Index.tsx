import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import Sidebar from '@/components/Sidebar';
import ChatHeader from '@/components/ChatHeader';
import ChatInput from '@/components/ChatInput';
import ActionButtons from '@/components/ActionButtons';
import MessageList from '@/components/MessageList';
import { Message } from '@/types/message';
import { v4 as uuidv4 } from 'uuid';

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = async (content: string) => {
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

    // Simulate a delay for a more natural feel
    await new Promise(resolve => setTimeout(resolve, 1000));

    let response = "Welcome to Pro Standard! I'd be happy to help you with our luxury athletic collection. ";
    
    // Simple keyword matching for demo purposes
    if (content.toLowerCase().includes('wingspan')) {
      response = "The new WINGSPAN hoodie collection is a premium Philadelphia design, available as a limited holiday release within 72 hours. Would you like to see the available styles and sizes?";
    } else if (content.toLowerCase().includes('sneaker')) {
      response = "Our Sneaker Tie Backs are perfect gift options that pair well with December shoe releases. You can view the full collection at brandboom.com/app/a/9B78CADB770. Would you like to know more about specific styles?";
    } else if (content.toLowerCase().includes('team')) {
      response = "We offer premium collections for various teams, including exclusive partnerships with Brooklyn, Atlanta, and Tampa. Which team's collection would you like to explore?";
    } else if (content.toLowerCase().includes('holiday')) {
      response = "Our holiday collection features the new WINGSPAN hoodie, Sneaker Tie Backs, and PENNANTS collection. Each piece is crafted with premium materials and exclusive designs. Would you like to see specific items?";
    }

    const assistantMessage: Message = {
      id: uuidv4(),
      role: 'assistant',
      content: response
    };

    setMessages(prev => [...prev, assistantMessage]);
    setIsLoading(false);
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

  return (
    <div className="flex h-screen">
      <div className="fixed left-0 top-0 z-50 h-full">
        <Sidebar 
          isOpen={isSidebarOpen} 
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          onApiKeyChange={() => {}} 
          onNewChat={handleNewChat}
          onChatResponse={handleSendMessage}
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