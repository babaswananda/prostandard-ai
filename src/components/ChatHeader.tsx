import { ChevronDown, UserRound, Phone, Mail } from "lucide-react";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface ChatHeaderProps {
  isSidebarOpen?: boolean;
}

const ChatHeader = ({ isSidebarOpen = true }: ChatHeaderProps) => {
  const handlePhoneClick = () => {
    window.location.href = "tel:770-608-0494";
  };

  const handleEmailClick = () => {
    window.location.href = "mailto:shaunee.southsales@gmail.com";
  };

  const handleModelSelect = (model: string) => {
    console.log(`Selected model: ${model}`);
    // Here you would typically update the model in your application state
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = `https://ui-avatars.com/api/?name=Shaunee&background=random`;
  };

  return (
    <div className="fixed top-0 z-30 w-full border-b border-[#4E4F60] bg-white/95 backdrop-blur">
      <div className="flex h-[60px] items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className={`${!isSidebarOpen ? 'ml-24' : ''}`}>
            <img 
              src="https://teamprostandard.com/cdn/shop/files/logo_1187a12c-0055-4dae-9e00-e51f5f909a7f_300x.png?v=1652788495" 
              alt="Pro Standard Logo" 
              className="h-8 w-auto"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <ChevronDown className="h-4 w-4 text-black" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[200px] bg-white/95 backdrop-blur border border-[#4E4F60]">
              <DropdownMenuItem 
                onClick={() => handleModelSelect("personal-stylist")}
                className="transition-all duration-200 hover:bg-prostandard-hover hover:pl-6 hover:text-prostandard-gold"
              >
                Personal Stylist (Best for Outfit Matching)
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => handleModelSelect("size-expert")}
                className="transition-all duration-200 hover:bg-prostandard-hover hover:pl-6 hover:text-prostandard-gold"
              >
                Size Expert (Perfect Fit Guide)
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => handleModelSelect("trend-advisor")}
                className="transition-all duration-200 hover:bg-prostandard-hover hover:pl-6 hover:text-prostandard-gold"
              >
                Trend Advisor (Latest Releases)
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => handleModelSelect("team-specialist")}
                className="transition-all duration-200 hover:bg-prostandard-hover hover:pl-6 hover:text-prostandard-gold"
              >
                Team Specialist (Collection Expert)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-gray-600 hover:text-gray-900"
                  onClick={handlePhoneClick}
                >
                  <Phone className="h-4 w-4 text-black" />
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
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-gray-600 hover:text-gray-900"
                  onClick={handleEmailClick}
                >
                  <Mail className="h-4 w-4 text-black" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>shaunee.southsales@gmail.com</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <span className="text-sm text-gray-600">Shaunee (Sales Rep)</span>
          <div className="relative h-8 w-8 overflow-hidden rounded-full border border-[#4E4F60]">
            <div className="flex h-full w-full items-center justify-center bg-prostandard-gold text-white">
              SH
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
