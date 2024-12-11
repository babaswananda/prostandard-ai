import { cn } from "@/lib/utils";
import { useState } from "react";
import { SidebarHeader } from "./sidebar/SidebarHeader";
import { SidebarSearch } from "./sidebar/SidebarSearch";
import { SidebarNavigation } from "./sidebar/SidebarNavigation";
import { SidebarTimeframes } from "./sidebar/SidebarTimeframes";
import { SidebarFooter } from "./sidebar/SidebarFooter";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onApiKeyChange: (apiKey: string) => void;
}

const Sidebar = ({ isOpen, onToggle, onApiKeyChange }: SidebarProps) => {
  const [apiKey, setApiKey] = useState("");
  const timeframes = [
    { title: "Today's Releases", items: ["New Team Collections Available"] },
    { 
      title: "This Week's Highlights", 
      items: [
        "Brooklyn Nets Collection",
        "Atlanta Hawks Gear",
        "Tampa Bay Collection",
        "Limited Edition Sneakers"
      ] 
    },
    {
      title: "Popular Collections",
      items: [
        "Air Jordan 12 Game Royal",
        "LA Dodgers Satin Jacket",
        "Team Logo Hoodies",
        "Exclusive Team Caps",
        "Luxury Athletic Wear"
      ]
    }
  ];

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newApiKey = e.target.value;
    setApiKey(newApiKey);
    onApiKeyChange(newApiKey);
  };

  const handleNewChat = () => {
    window.location.reload();
  };

  return (
    <div className={cn(
      "fixed top-0 left-0 z-40 h-screen bg-white transition-all duration-300",
      isOpen ? "w-64" : "w-0"
    )}>
      <nav className="flex h-full w-full flex-col px-3" aria-label="Chat history">
        <SidebarHeader onToggle={onToggle} onNewChat={handleNewChat} />

        <div className="flex-col flex-1 transition-opacity duration-500 relative -mr-2 pr-2 overflow-y-auto">
          {isOpen && (
            <>
              <SidebarSearch value={apiKey} onChange={handleApiKeyChange} />
              <div className="bg-white pt-0">
                <SidebarNavigation />
                <SidebarTimeframes timeframes={timeframes} />
              </div>
            </>
          )}
        </div>

        {isOpen && <SidebarFooter />}
      </nav>
    </div>
  );
};

export default Sidebar;