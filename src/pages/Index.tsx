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

    await new Promise(resolve => setTimeout(resolve, 1000));

    let response = "Welcome to Pro Standard! I'd be happy to help you with our luxury athletic collection. ";
    
    const contentLower = content.toLowerCase();
    
    if (contentLower.includes('wingspan')) {
      response = "The new WINGSPAN hoodie collection is a premium Philadelphia design, available as a limited holiday release within 72 hours. You can view the collection at brandboom.com/app/a/E309C507924. Would you like to see the available styles and sizes?";
    } else if (contentLower.includes('sneaker') || contentLower.includes('tie back')) {
      response = "Our Sneaker Tie Backs are perfect gift options that pair well with December shoe releases. You can view the full collection at brandboom.com/app/a/9B78CADB770. Would you like to know more about specific styles?";
    } else if (contentLower.includes('pennant')) {
      response = "Check out our new PENNANTS Holiday Collection at brandboom.com/app/a/28D699E1686. Each piece features premium design and materials. Would you like to see specific items?";
    } else if (contentLower.includes('nfl')) {
      response = "For Week 14 of the NFL season, explore our Best in Division selections at brandboom.com/app/a/81598162307, or view all NFL teams at brandboom.com/app/a/9F416FC9538. Which team interests you?";
    } else if (contentLower.includes('nba')) {
      response = "Discover our NBA collection featuring exclusive team designs and premium materials at brandboom.com/app/a/37C6DC6066D. Would you like to see specific team gear?";
    } else if (contentLower.includes('mlb')) {
      response = "Browse our MLB collection with authentic team gear and limited editions at brandboom.com/app/a/D2DD62A764D. Which team's collection would you like to explore?";
    } else if (contentLower.includes('college')) {
      response = "Our College collection, including the new Colorado items, is available at brandboom.com/app/a/AC4A7D8952C. Would you like to see specific university gear?";
    } else if (contentLower.includes('mash up') || contentLower.includes('classic')) {
      response = "Explore our classic MASH UP collection featuring timeless designs and authentic team logos at brandboom.com/app/a/1EB1F5270F7. Would you like to see our classic pieces?";
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
        assistantMessage = "Welcome to Pro Standard's exclusive team collection! We have the latest from all major leagues:\n\n1. NFL (Week 14) - brandboom.com/app/a/9F416FC9538\n2. NBA - brandboom.com/app/a/37C6DC6066D\n3. MLB - brandboom.com/app/a/D2DD62A764D\n4. College - brandboom.com/app/a/AC4A7D8952C\n\nWhich league's collection would you like to explore?";
        break;
      case "Size Finder":
        assistantMessage = "Let me help you find your perfect size in our luxury athletic wear. Our sizing is designed for optimal fit and comfort. Could you tell me:\n\n1. Your usual size in athletic wear\n2. Your preferred fit (regular, slim, or relaxed)\n3. The specific item you're interested in?";
        break;
      case "New Releases":
        assistantMessage = "Here are our latest holiday releases:\n\n1. WINGSPAN Hoodie\n- Premium Philadelphia design\n- Available within 72 hours\n- View at: brandboom.com/app/a/E309C507924\n\n2. PENNANTS Collection\n- New holiday release\n- View at: brandboom.com/app/a/28D699E1686\n\n3. Sneaker Tie Backs\n- Perfect for December releases\n- View at: brandboom.com/app/a/9B78CADB770\n\nWhich collection would you like to explore?";
        break;
      case "Color Match":
        assistantMessage = "I'll help you create the perfect color-coordinated outfit. Our collections are designed with complementary color schemes. Let's start with:\n\n1. What team gear are you looking to match?\n2. Do you prefer bold or subtle coordination?\n3. Any specific sneakers you'd like to match with?";
        break;
      case "Limited Editions":
        assistantMessage = "Explore our exclusive collections:\n\n1. NFL Best in Division\n- Week 14 selections\n- View at: brandboom.com/app/a/81598162307\n\n2. WINGSPAN Holiday Release\n- Limited availability\n- View at: brandboom.com/app/a/E309C507924\n\nWhich exclusive piece interests you?";
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