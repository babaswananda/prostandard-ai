import { Shirt, Search, ShoppingBag, Palette, Medal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ActionButtonsProps {
  onAction: (title: string) => void;
}

const ActionButtons = ({ onAction }: ActionButtonsProps) => {
  const { toast } = useToast();

  const actions = [
    { 
      icon: <Shirt className="h-4 w-4 text-purple-400" />, 
      label: "Team gear",
      action: () => {
        toast({
          title: "Team Gear",
          description: "Browsing latest team collections...",
          className: "bg-black/80 text-white border-none",
        });
        onAction("Team Gear");
      }
    },
    { 
      icon: <Search className="h-4 w-4 text-blue-400" />, 
      label: "Find my size",
      action: () => {
        toast({
          title: "Size Finder",
          description: "Opening size guide...",
          className: "bg-black/80 text-white border-none",
        });
        onAction("Size Finder");
      }
    },
    { 
      icon: <ShoppingBag className="h-4 w-4 text-green-400" />, 
      label: "New releases",
      action: () => {
        toast({
          title: "New Releases",
          description: "Loading latest drops...",
          className: "bg-black/80 text-white border-none",
        });
        onAction("New Releases");
      }
    },
    { 
      icon: <Palette className="h-4 w-4 text-yellow-400" />, 
      label: "Color match",
      action: () => {
        toast({
          title: "Color Match",
          description: "Opening color matching tool...",
          className: "bg-black/80 text-white border-none",
        });
        onAction("Color Match");
      }
    },
    { 
      icon: <Medal className="h-4 w-4 text-red-400" />, 
      label: "Limited editions",
      action: () => {
        toast({
          title: "Limited Editions",
          description: "Showing exclusive items...",
          className: "bg-black/80 text-white border-none",
        });
        onAction("Limited Editions");
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