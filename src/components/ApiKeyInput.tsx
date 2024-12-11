import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Info } from 'lucide-react';

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
      
      <Alert className="bg-blue-500/10 border-blue-500/20 text-white">
        <Info className="h-4 w-4" />
        <AlertDescription>
          To use this app:
          <ol className="list-decimal ml-4 mt-2 space-y-1">
            <li>Install Ollama from <a href="https://ollama.ai" className="underline" target="_blank" rel="noopener noreferrer">ollama.ai</a></li>
            <li>Run: <code className="bg-black/20 px-1 rounded">ollama run llama2:3.3</code></li>
            <li>For remote deployment, set up an Ollama server with CORS enabled</li>
          </ol>
        </AlertDescription>
      </Alert>

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