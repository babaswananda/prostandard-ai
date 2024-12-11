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
  onNewChat?: () => void;
  onChatResponse?: (content: string) => void;
}

const Sidebar = ({ isOpen, onToggle, onApiKeyChange, onNewChat, onChatResponse }: SidebarProps) => {
  const [apiKey, setApiKey] = useState("");
  const timeframes = [
    { 
      title: "Today's Releases",
      items: [
        {
          title: "New Holiday Collections",
          content: "Just dropped! Check out our latest holiday collections:\n\n1. WINGSPAN Hoodie\n- Premium design\n- Available within 72 hours\n- View at: www.brandboom.com/app/a/E309C507924\n\n2. PENNANTS Collection\n- New holiday release\n- View at: www.brandboom.com/app/a/28D699E1686\n\n3. Sneaker Tie Backs\n- Perfect gift option\n- View at: www.brandboom.com/app/a/9B78CADB770\n\nWhich collection would you like to explore?"
        }
      ]
    },
    { 
      title: "This Week's Highlights",
      items: [
        {
          title: "NFL Week 14 Selections",
          content: "Check out our NFL Week 14 Best in Division selections:\n- Premium team gear\n- Limited quantities\n- View at: www.brandboom.com/app/a/81598162307\n\nAll NFL teams available at: www.brandboom.com/app/a/9F416FC9538"
        },
        {
          title: "NBA Collection",
          content: "Explore our NBA collection featuring exclusive team designs and premium materials. View the full collection at: www.brandboom.com/app/a/37C6DC6066D"
        },
        {
          title: "MLB Collection",
          content: "Discover our MLB collection with authentic team gear and limited editions. Browse the collection at: www.brandboom.com/app/a/D2DD62A764D"
        },
        {
          title: "College Collection",
          content: "Check out our College collection, including the new Colorado items! View all collegiate wear at: www.brandboom.com/app/a/AC4A7D8952C"
        }
      ]
    },
    {
      title: "Classic Collections",
      items: [
        {
          title: "MASH UP Classics",
          content: "Explore our timeless MASH UP collection featuring premium materials and authentic team logos. View the collection at: www.brandboom.com/app/a/1EB1F5270F7"
        }
      ]
    }
  ];

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newApiKey = e.target.value;
    setApiKey(newApiKey);
    onApiKeyChange(newApiKey);
  };

  const handleItemClick = (content: string) => {
    if (onChatResponse) {
      onChatResponse(content);
    }
  };

  return (
    <div className={cn(
      "fixed top-0 left-0 z-40 h-screen bg-white transition-all duration-300",
      isOpen ? "w-64" : "w-0"
    )}>
      <nav className="flex h-full w-full flex-col px-3" aria-label="Chat history">
        <SidebarHeader onToggle={onToggle} onNewChat={onNewChat} />

        <div className="flex-col flex-1 transition-opacity duration-500 relative -mr-2 pr-2 overflow-y-auto">
          {isOpen && (
            <>
              <SidebarSearch value={apiKey} onChange={handleApiKeyChange} />
              <div className="bg-white pt-0">
                <SidebarNavigation onItemClick={handleItemClick} />
                <SidebarTimeframes timeframes={timeframes} onItemClick={handleItemClick} />
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
