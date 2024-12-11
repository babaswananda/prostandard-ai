import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface ApiKeyInputProps {
  onApiKeySet: (url: string) => void;
}

const ApiKeyInput = ({ onApiKeySet }: ApiKeyInputProps) => {
  const [serverUrl, setServerUrl] = useState('http://localhost:11434');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (serverUrl.trim()) {
      localStorage.setItem('ollama_url', serverUrl.trim());
      onApiKeySet(serverUrl.trim());
      toast({
        title: "Server URL Saved",
        description: "Your Ollama server URL has been saved",
        className: "bg-black/80 text-white border-none",
      });
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 space-y-4 bg-black/40 backdrop-blur-sm rounded-lg">
      <h2 className="text-xl font-semibold text-white text-center">Enter Ollama Server URL</h2>
      <p className="text-sm text-gray-300 text-center">
        Make sure Ollama is running with the llama2 model (ollama run llama2:3.3)
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          value={serverUrl}
          onChange={(e) => setServerUrl(e.target.value)}
          placeholder="http://localhost:11434"
          className="w-full bg-white/10 text-white border-gray-700"
        />
        <Button 
          type="submit" 
          className="w-full bg-[#BF953F] hover:bg-[#AA771C] text-white"
          disabled={!serverUrl.trim()}
        >
          Save Server URL
        </Button>
      </form>
    </div>
  );
};

export default ApiKeyInput;