import { ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useModelSelection } from "@/hooks/useModelSelection";
import { ModelType } from "@/config/modelMessages";

export const ModelSelector = () => {
  const { handleModelSelect } = useModelSelection();

  return (
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
  );
};