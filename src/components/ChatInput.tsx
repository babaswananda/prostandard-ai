import { useState } from "react";
import { ArrowUp, Loader2 } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading?: boolean;
}

const PROMPT_SUGGESTIONS = [
  "What are the best-selling teams in Brooklyn?",
  "Show me Tampa Florida's popular collections",
  "What teams are hot in Atlanta?",
  "Help me find the perfect size for team jerseys",
  "What sneakers match with Dodgers gear?"
];

const ChatInput = ({ onSend, isLoading = false }: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSubmit = () => {
    if (message.trim() && !isLoading) {
      onSend(message);
      setMessage("");
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setMessage(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="relative flex w-full flex-col items-center">
      {showSuggestions && message.length === 0 && (
        <div className="absolute bottom-full mb-2 w-full bg-black/60 backdrop-blur-sm rounded-lg p-2 space-y-1">
          {PROMPT_SUGGESTIONS.map((suggestion) => (
            <div
              key={suggestion}
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-3 py-2 hover:bg-white/10 rounded-md cursor-pointer text-sm text-white transition-colors"
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
      <div className="relative w-full">
        <textarea
          rows={1}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          placeholder="Ask about team gear, sizes, or color matches..."
          className="chat-input bg-[#1a1a1a]/50"
          style={{ maxHeight: "200px" }}
          disabled={isLoading}
        />
        <button 
          onClick={handleSubmit}
          disabled={isLoading || !message.trim()}
          className="absolute right-3 top-[50%] -translate-y-[50%] p-1.5 bg-[#BF953F] hover:bg-[#AA771C] rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 z-30"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 text-white animate-spin" />
          ) : (
            <ArrowUp className="h-4 w-4 text-white" />
          )}
        </button>
      </div>
    </div>
  );
};

export default ChatInput;