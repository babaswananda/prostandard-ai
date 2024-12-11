import { Shirt, Search, ShoppingBag, Palette, Medal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ActionButtons = () => {
  const { toast } = useToast();

  const actions = [
    { 
      icon: <Shirt className="h-4 w-4 text-purple-400" />, 
      label: "Team gear",
      action: () => {
        toast({
          title: "Team Gear",
          description: "Browsing latest team collections...",
        });
      }
    },
    { 
      icon: <Search className="h-4 w-4 text-blue-400" />, 
      label: "Find my size",
      action: () => {
        toast({
          title: "Size Finder",
          description: "Opening size guide...",
        });
      }
    },
    { 
      icon: <ShoppingBag className="h-4 w-4 text-green-400" />, 
      label: "New releases",
      action: () => {
        toast({
          title: "New Releases",
          description: "Loading latest drops...",
        });
      }
    },
    { 
      icon: <Palette className="h-4 w-4 text-yellow-400" />, 
      label: "Color match",
      action: () => {
        toast({
          title: "Color Match",
          description: "Opening color matching tool...",
        });
      }
    },
    { 
      icon: <Medal className="h-4 w-4 text-red-400" />, 
      label: "Limited editions",
      action: () => {
        toast({
          title: "Limited Editions",
          description: "Showing exclusive items...",
        });
      }
    },
  ];

  return (
    <div className="flex gap-2 flex-wrap justify-center mt-4">
      {actions.map((action) => (
        <button 
          key={action.label} 
          className="relative flex h-[42px] items-center gap-1.5 rounded-full border border-[#383737] px-3 py-2 text-start text-[13px] shadow-xxs transition enabled:hover:bg-black/20 disabled:cursor-not-allowed xl:gap-2 xl:text-[14px] text-white bg-black/40 backdrop-blur-sm"
          onClick={action.action}
        >
          {action.icon}
          {action.label}
        </button>
      ))}
    </div>
  );
};

export default ActionButtons;