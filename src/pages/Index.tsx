import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import Sidebar from '@/components/Sidebar';
import ChatHeader from '@/components/ChatHeader';
import ChatInput from '@/components/ChatInput';
import ActionButtons from '@/components/ActionButtons';
import MessageList from '@/components/MessageList';
import { Message } from '@/types/message';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/integrations/supabase/client';

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

    const assistantMessage: Message = {
      id: uuidv4(),
      role: 'assistant',
      content: ''
    };

    setMessages(prev => [...prev, assistantMessage]);

    try {
      const response = await supabase.functions.invoke('chat-with-mistral', {
        body: {
          messages: messages.concat(userMessage).map(msg => ({
            role: msg.role,
            content: msg.content
          }))
        }
      });

      if (!response.data) {
        throw new Error('No response from chat function');
      }

      const reader = new Response(response.data).body?.getReader();
      if (!reader) {
        throw new Error('Failed to create stream reader');
      }

      const decoder = new TextDecoder();
      let responseText = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') continue;
            
            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices[0]?.delta?.content || '';
              responseText += content;
              
              setMessages(prev => prev.map(msg =>
                msg.id === assistantMessage.id
                  ? { ...msg, content: responseText }
                  : msg
              ));
            } catch (e) {
              console.error('Error parsing SSE message:', e);
            }
          }
        }
      }

    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
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

    let currentIndex = 0;
    const streamInterval = setInterval(() => {
      if (currentIndex < assistantMessage.length) {
        setMessages(prev => prev.map(msg =>
          msg.id === message.id
            ? { ...msg, content: assistantMessage.slice(0, currentIndex + 1) }
            : msg
        ));
        currentIndex++;
      } else {
        clearInterval(streamInterval);
      }
    }, 20);
  };

  return (
    <div className="flex h-screen">
      <div className="fixed left-0 top-0 z-50 h-full">
        <Sidebar 
          isOpen={isSidebarOpen} 
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
          onApiKeyChange={() => {}} 
          onNewChat={() => setMessages([])}
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