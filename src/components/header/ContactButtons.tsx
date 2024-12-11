import { Phone, Mail } from "lucide-react";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export const ContactButtons = () => {
  const handlePhoneClick = () => {
    window.location.href = "tel:770-608-0494";
  };

  const handleEmailClick = () => {
    window.location.href = "mailto:shaunee.southsales@gmail.com";
  };

  return (
    <>
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
    </>
  );
};