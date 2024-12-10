import { ChevronDown, UserRound, Phone, Mail } from "lucide-react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface ChatHeaderProps {
  isSidebarOpen?: boolean;
}

const ChatHeader = ({ isSidebarOpen = true }: ChatHeaderProps) => {
  return (
    <>
      <div className="fixed top-0 z-40 w-full bg-[#BF953F] text-white">
        <div className="flex items-center justify-center py-2 text-sm">
          <span>🔥 New Releases: Check out the latest Pro Standard x NBA Collection!</span>
        </div>
      </div>
      <div 
        className="fixed top-8 z-30 w-full border-b border-[#4E4F60] bg-white/95 backdrop-blur"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070&auto=format&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="flex h-[60px] items-center justify-between px-4 bg-white/80 backdrop-blur">
          <div className="flex items-center gap-2">
            <span className={`font-semibold gold-gradient ${!isSidebarOpen ? 'ml-24' : ''}`}>ProStandardGPT</span>
            <ChevronDown className="h-4 w-4 text-gray-700" />
          </div>
          <div className="flex items-center gap-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-gray-700 hover:text-gray-900">
                    <Phone className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>770-608-0494</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-gray-700 hover:text-gray-900">
                    <Mail className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>shaunee.southsales@gmail.com</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <span className="text-sm text-gray-700">Shaunee (Sales Rep)</span>
            <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 border border-gray-200 text-gray-700">
              <UserRound className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatHeader;