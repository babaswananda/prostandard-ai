import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface ApiKeyInputProps {
  onApiKeySet: (key: string) => void;
}

const ApiKeyInput = ({ onApiKeySet }: ApiKeyInputProps) => {
  const [apiKey, setApiKey] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      localStorage.setItem('openai_api_key', apiKey.trim());
      onApiKeySet(apiKey.trim());
      toast({
        title: "API Key Saved",
        description: "Your OpenAI API key has been saved",
        className: "bg-black/80 text-white border-none",
      });
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 space-y-4 bg-black/40 backdrop-blur-sm rounded-lg">
      <h2 className="text-xl font-semibold text-white text-center">Enter OpenAI API Key</h2>
      <p className="text-sm text-gray-300 text-center">
        Your API key will be stored locally and never sent to our servers.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="sk-..."
          className="w-full bg-white/10 text-white border-gray-700"
        />
        <Button 
          type="submit" 
          className="w-full bg-[#BF953F] hover:bg-[#AA771C] text-white"
          disabled={!apiKey.trim()}
        >
          Save API Key
        </Button>
      </form>
    </div>
  );
};

export default ApiKeyInput;