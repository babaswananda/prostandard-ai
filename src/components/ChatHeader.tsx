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
    <div className="fixed top-0 z-30 w-full border-b border-[#4E4F60] bg-[#1a1a1a]/95 backdrop-blur">
      <div className="flex h-[60px] items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <span className={`font-semibold gold-gradient ${!isSidebarOpen ? 'ml-24' : ''}`}>ProStandardGPT</span>
          <ChevronDown className="h-4 w-4" />
        </div>
        <div className="flex items-center gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
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
                <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                  <Mail className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>shaunee.southsales@gmail.com</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <span className="text-sm text-gray-300">Shaunee (Sales Rep)</span>
          <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#1a1a1a] border border-[#4E4F60] text-white">
            <UserRound className="h-5 w-5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;