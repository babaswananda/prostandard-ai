import { useState, useCallback } from 'react';
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

  const streamResponse = async (response: string, setContent: (content: string) => void) => {
    let currentText = '';
    const words = response.split(' ');
    
    for (let i = 0; i < words.length; i++) {
      currentText += words[i] + ' ';
      setContent(currentText.trim());
      await new Promise(resolve => setTimeout(resolve, 30)); // Adjust speed as needed
    }
  };

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

    let response = "Welcome to Pro Standard! I'm delighted to introduce you to our luxury athletic collection. What particular piece catches your interest today?";
    
    const contentLower = content.toLowerCase();
    
    if (contentLower.includes('wingspan')) {
      response = "Ah, you've got excellent taste! Our new WINGSPAN hoodie is truly a masterpiece of Philadelphia-inspired luxury streetwear. It's a limited holiday release, crafted with premium materials and attention to detail that Pro Standard is known for. Available within 72 hours, you can explore the collection at www.brandboom.com/app/a/E309C507924. Would you like me to walk you through the unique features and styling options?";
    } else if (contentLower.includes('sneaker') || contentLower.includes('tie back')) {
      response = "Perfect timing! Our Sneaker Tie Backs are the ultimate accessory for the discerning collector. They're designed to complement this December's most anticipated shoe releases. View our curated selection at www.brandboom.com/app/a/9B78CADB770. May I suggest some exclusive styling combinations that are particularly popular this season?";
    } else if (contentLower.includes('columbia') || contentLower.includes('grizzlies')) {
      response = "The Jordan Columbias are a perfect match for the Memphis Grizzlies gear! Check out this stunning piece from our collection: https://teamprostandard.com/cdn/shop/files/BMG6515705-UWH_1.png?crop=center&height=1000&v=1700085164&width=1000. The clean, crisp colorway aligns perfectly with the Grizzlies' aesthetic. Would you like to see our complete Memphis Grizzlies collection?";
    } else if (contentLower.includes('royal 12') || contentLower.includes('dodgers') || contentLower.includes('knicks')) {
      response = "The Jordan Royal 12s are versatile! Check out this perfect match from our collection: https://teamprostandard.com/cdn/shop/products/LLD632060-DBL_1.png?crop=center&height=800&v=1680267497&width=800. They pair perfectly with both LA Dodgers and NY Knicks gear. The royal blue colorway matches both teams' signature colors beautifully. Would you like to see our premium collections for either team?";
    } else if (contentLower.includes('nfl') && contentLower.includes('team')) {
      response = "You're just in time for Week 14's finest selections! I'm excited to share our Best in Division pieces at www.brandboom.com/app/a/81598162307. Each piece is a testament to luxury sports fashion. For our complete NFL collection, visit www.brandboom.com/app/a/9F416FC9538. Which division's style interests you most?";
    } else if (contentLower.includes('college')) {
      response = "Ah, you'll love our latest College collection! We've just added some exceptional Colorado pieces that are causing quite a stir. The entire collegiate collection showcases our commitment to premium athletic wear. Browse the full range at www.brandboom.com/app/a/AC4A7D8952C. Shall I highlight some of our bestselling university designs?";
    } else if (contentLower.includes('mash up') || contentLower.includes('classic')) {
      response = "The MASH UP classics are truly special - they're the cornerstone of our luxury athletic heritage. Each piece in this collection at www.brandboom.com/app/a/1EB1F5270F7 combines timeless design with premium materials and authentic team logos. Would you like to see how our most distinguished clients are styling these pieces?";
    } else if (contentLower.includes('pennant')) {
      response = "Our new PENNANTS Holiday Collection is causing quite a sensation! Each piece is a celebration of athletic luxury, available at www.brandboom.com/app/a/28D699E1686. The attention to detail and premium materials make these perfect for the discerning collector. Would you like to see our most sought-after designs?";
    }

    const assistantMessage: Message = {
      id: uuidv4(),
      role: 'assistant',
      content: ''
    };

    setMessages(prev => [...prev, assistantMessage]);

    await streamResponse(response, (streamedContent) => {
      setMessages(prev => prev.map(msg => 
        msg.id === assistantMessage.id 
          ? { ...msg, content: streamedContent }
          : msg
      ));
    });

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

    const message: Message = {
      id: uuidv4(),
      role: 'assistant',
      content: ''
    };

    setMessages(prev => [...prev, message]);

    streamResponse(assistantMessage, (streamedContent) => {
      setMessages(prev => prev.map(msg => 
        msg.id === message.id 
          ? { ...msg, content: streamedContent }
          : msg
      ));
    });
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