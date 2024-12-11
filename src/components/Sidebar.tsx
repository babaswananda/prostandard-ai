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
          title: "New Team Collections Available",
          content: "Just dropped! Check out our latest team collections:\n\n1. Brooklyn Nets Heritage Collection\n- Premium materials\n- Authentic designs\n- Limited quantities\n\n2. Atlanta Hawks Signature Series\n- Custom embroidery\n- Exclusive colorways\n\n3. Tampa Bay Elite Collection\n- Premium performance wear\n- Limited edition designs\n\nWhich collection would you like to explore?"
        }
      ]
    },
    { 
      title: "This Week's Highlights",
      items: [
        {
          title: "Brooklyn Nets Collection",
          content: "Explore our premium Brooklyn Nets collection:\n\n1. Heritage Varsity Jacket\n- Black/White premium wool\n- Leather sleeves\n- $295.00\n\n2. Court Culture Hoodie\n- Premium cotton blend\n- Exclusive design\n- $165.00\n\nWould you like to see more items or get sizing information?"
        },
        {
          title: "Atlanta Hawks Gear",
          content: "Check out our Atlanta Hawks premium collection:\n\n1. Signature Series Jacket\n- Red/Gold colorway\n- Premium materials\n- $275.00\n\n2. Game Day Hoodie\n- Custom embroidery\n- Limited edition\n- $165.00\n\nInterested in seeing more items?"
        },
        {
          title: "Tampa Bay Collection",
          content: "Discover our Tampa Bay collection:\n\n1. Elite Series Jacket\n- Premium design\n- Custom patches\n- $245.00\n\n2. Game Day Cap\n- New Era collaboration\n- Limited release\n- $75.00\n\nWould you like to see more items?"
        },
        {
          title: "Limited Edition Sneakers",
          content: "Our current limited edition sneaker collection:\n\n1. Pro Standard x Air Jordan 12\n- Game Royal colorway\n- Premium materials\n- Limited quantities\n- $225.00\n\n2. Exclusive Court Series\n- Custom designs\n- Premium comfort\n- $195.00\n\nWhich style interests you?"
        }
      ]
    },
    {
      title: "Popular Collections",
      items: [
        {
          title: "Air Jordan 12 Game Royal",
          content: "The Air Jordan 12 Game Royal x Pro Standard:\n\n- Limited edition collaboration\n- Premium materials\n- Custom Pro Standard details\n- Exclusive packaging\n- Price: $225.00\n\nWould you like to check availability in your size?"
        },
        {
          title: "LA Dodgers Satin Jacket",
          content: "LA Dodgers Sublimated Satin Jacket:\n\n- Premium satin finish\n- Custom embroidery\n- Exclusive design\n- Limited quantities\n- Price: $295.00\n\nWould you like to see available sizes?"
        },
        {
          title: "Team Logo Hoodies",
          content: "Premium Team Logo Hoodie Collection:\n\n- Premium cotton blend\n- Authentic team designs\n- Custom embroidery\n- Available for all partner teams\n- Starting at $165.00\n\nWhich team's hoodie would you like to explore?"
        },
        {
          title: "Exclusive Team Caps",
          content: "Pro Standard Exclusive Team Caps:\n\n- New Era collaboration\n- Premium materials\n- Limited edition designs\n- Custom embroidery\n- Price: $75.00\n\nWhich team's cap interests you?"
        },
        {
          title: "Luxury Athletic Wear",
          content: "Pro Standard Luxury Athletic Collection:\n\n1. Premium Track Suits\n- Custom designs\n- Premium materials\n- $225.00\n\n2. Elite Performance Wear\n- Moisture-wicking fabric\n- Exclusive designs\n- Starting at $145.00\n\nWhich piece would you like to explore?"
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