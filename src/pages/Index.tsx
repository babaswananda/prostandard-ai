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
        assistantMessage = "I'd be happy to help you explore our team gear collection. We have exclusive partnerships with major sports teams and offer premium quality merchandise. What specific team are you interested in?";
        break;
      case "Size Finder":
        assistantMessage = "Let me help you find the perfect size. Our luxury athletic wear is designed for optimal fit. Could you tell me your usual size and preferred fit (regular, slim, or relaxed)?";
        break;
      case "New Releases":
        assistantMessage = "Here are our latest drops:\n\n1. Los Angeles Dodgers Sublimated Satin Jacket\n- Premium satin finish\n- Exclusive design\n- Limited quantities\n\n2. New York Yankees Heritage Collection\n- Authentic materials\n- Vintage-inspired\n\nWould you like to learn more about any of these items?";
        break;
      case "Color Match":
        assistantMessage = "I can help you create the perfect color-coordinated outfit. Our collections are designed with complementary color schemes. What's the main piece or color you'd like to build around?";
        break;
      case "Limited Editions":
        assistantMessage = "You're in luck! We just released these exclusive items:\n\n1. Brooklyn Nets x Pro Standard Gold Series\n2. LA Lakers Championship Collection\n3. Miami Heat Special Edition\n\nWhich collection interests you?";
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
        title: "Error",
        description: "Please enter a message",
        variant: "destructive"
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

      const assistantMessage: Message = {
        role: 'assistant',
        content: generateResponse(content)
      };

      setMessages([...newMessages, assistantMessage]);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generateResponse = (content: string) => {
    if (content.toLowerCase().includes('what teams are hot') || content.toLowerCase().includes('hot teams')) {
      return "Right now, we're seeing huge demand for these hot items:\n\n" +
        "1. Los Angeles Dodgers Sublimated Satin Jacket\n" +
        "- Style ID: LLD6314753\n" +
        "- Premium satin finish with stunning sublimated design\n" +
        "- Features classic Dodgers logo with crossed bats\n" +
        "- Available in sizes S-3XL\n" +
        "- Retail price: $175.00\n\n" +
        "2. Air Jordan 12 'White/Game Royal'\n" +
        "- Style #: CT8013-140\n" +
        "- Release Date: December 18, 2024\n" +
        "- Price: $210\n" +
        "- Perfect match for Dodgers gear with its white/black/game royal colorway\n\n" +
        "Would you like to know more about sizing or see other team matches?";
    }
    if (content.toLowerCase().includes('best selling teams in brooklyn')) {
      return "In Brooklyn, the Nets dominate sales at Pro Standard, with their black and white colorways being particularly popular. The retro Brooklyn Dodgers merchandise also maintains strong sales due to the historic connection. For sneakers that complement these teams:\n\n1. Brooklyn Nets:\n- Nike Kyrie Irving signature line in black/white\n- Air Jordan 1 High 'Brooklyn Nets'\n- Nike KD series in Nets colorways\n\nThe vintage Brooklyn Dodgers blue pairs well with:\n- Nike Air Force 1 '07 in royal blue/white\n- New Balance 990v5 in navy";
    }
    if (content.toLowerCase().includes('best selling teams in atlanta')) {
      return "In Atlanta, the Hawks and Braves lead Pro Standard sales. The Hawks' red and yellow colorway and the Braves' navy and red are particularly strong sellers. Popular sneaker matches include:\n\n1. Atlanta Hawks:\n- Air Jordan 1 'Bred' or 'Chicago'\n- Nike Trae Young signature line\n- Adidas Dame series in Hawks colors\n\n2. Atlanta Braves:\n- New Balance 990v5 in navy/red\n- Nike Air Max 90 in navy/red combinations";
    }
    if (content.toLowerCase().includes('tampa florida')) {
      return "In Tampa, the Buccaneers and Lightning dominate Pro Standard sales. Key sneaker matches:\n\n1. Tampa Bay Buccaneers:\n- Nike Air Max 90 in pewter/red\n- Air Jordan 1 'Bred' colorway\n- Under Armour Curry line in team colors\n\n2. Tampa Bay Lightning:\n- Nike Air Force 1 in blue/white\n- Adidas Forum Low in royal blue\n- New Balance 550 in white/blue";
    }
    return "Welcome to ProStandardGPT! I'm your luxury athletic and streetwear specialist, trained on Pro Standard's premium licensed sports collections. How can I help you find the perfect team gear or sneaker matches today?";
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
              <ActionButtons onAction={(title) => handleActionMessage(title)} />
            </div>
          ) : (
            <>
              <MessageList messages={messages} />
              <div className="w-full max-w-3xl mx-auto px-4 py-2">
                <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
              </div>
              <div className="text-xs text-center text-gray-500 py-2">
                ProStandardGPT - Your Luxury Athletic Collection Assistant
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;