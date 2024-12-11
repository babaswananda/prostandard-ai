import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import Sidebar from '@/components/Sidebar';
import ChatHeader from '@/components/ChatHeader';
import ChatInput from '@/components/ChatInput';
import ActionButtons from '@/components/ActionButtons';
import MessageList from '@/components/MessageList';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

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
      { role: 'assistant', content: assistantMessage }
    ]);
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

    setIsLoading(true);

    try {
      const newMessages = [
        ...messages,
        { role: 'user', content } as const
      ];
      
      setMessages(newMessages);

      // Generate response based on user input
      const assistantMessage: Message = {
        role: 'assistant',
        content: generateResponse(content)
      };

      setMessages([...newMessages, assistantMessage]);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong",
        variant: "destructive",
        className: "bg-black/80 text-white border-none",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generateResponse = (content: string) => {
    const lowerContent = content.toLowerCase();
    
    // Team-specific responses
    if (lowerContent.includes('brooklyn') || lowerContent.includes('nets')) {
      return "Pro Standard's Brooklyn collection is one of our most popular lines. Current bestsellers:\n\n1. Brooklyn Nets Heritage Jacket\n- Black/White colorway\n- Premium leather patches\n- Sizes S-3XL\n- $225.00\n\n2. Nets Court Collection Hoodie\n- Premium cotton blend\n- Embroidered logos\n- $145.00\n\nWould you like to see more items or get sizing information?";
    }
    
    if (lowerContent.includes('atlanta') || lowerContent.includes('hawks')) {
      return "Our Atlanta Hawks collection features premium streetwear with authentic team designs:\n\n1. Hawks Signature Varsity Jacket\n- Red/Gold premium wool blend\n- Leather sleeves\n- $275.00\n\n2. ATL Court Culture Hoodie\n- Limited edition design\n- Premium cotton blend\n- $165.00\n\nWould you like to see more from the Atlanta collection?";
    }
    
    if (lowerContent.includes('tampa') || lowerContent.includes('buccaneers')) {
      return "Tampa Bay collection highlights:\n\n1. Buccaneers Premium Varsity Jacket\n- Pewter/Red colorway\n- Custom embroidery\n- $245.00\n\n2. Tampa Bay Limited Edition Cap\n- New Era collaboration\n- Exclusive design\n- $75.00\n\nWould you like details on sizing or other items?";
    }

    // Size and fit responses
    if (lowerContent.includes('size') || lowerContent.includes('fit')) {
      return "Pro Standard sizing guide:\n\nOur luxury athletic wear typically runs true to size with a slightly relaxed fit. For the best fit:\n\n- Jerseys: Order your normal size for a relaxed fit, size down for a closer fit\n- Hoodies: True to size with room for layering\n- Jackets: Size up if you plan to wear heavy layers underneath\n\nWould you like specific measurements for any item?";
    }

    // Color matching responses
    if (lowerContent.includes('color') || lowerContent.includes('match')) {
      return "Pro Standard color matching guide:\n\n1. For Brooklyn Nets gear:\n- Air Jordan 1 High 'Shadow'\n- Nike Dunk Low 'Black/White'\n\n2. For Hawks gear:\n- Air Jordan 1 'Bred'\n- Nike Dunk High 'Varsity Red'\n\nWould you like more color combination suggestions?";
    }

    // Default welcome message
    return "Welcome to Pro Standard! I'm your luxury athletic wear specialist. I can help you with:\n\n- Team collections\n- Size and fit guidance\n- Color matching\n- Limited editions\n\nWhat would you like to explore?";
  };

  return (
    <div className="flex h-screen">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        onApiKeyChange={() => {}} 
      />
      
      <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <ChatHeader isSidebarOpen={isSidebarOpen} />
        
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