import { Globe } from "lucide-react";

interface SidebarNavigationProps {
  onItemClick: (content: string) => void;
}

export const SidebarNavigation = ({ onItemClick }: SidebarNavigationProps) => {
  const items = [
    {
      title: "New Arrivals",
      content: "Welcome to our New Arrivals section! Here are the latest additions to our luxury collection:\n\n1. Brooklyn Nets Heritage Collection\n- Limited Edition Varsity Jacket\n- Premium Wool Blend\n- $295.00\n\n2. Atlanta Hawks Signature Series\n- Exclusive Team Logo Hoodie\n- Custom Embroidery\n- $165.00\n\n3. Tampa Bay Premium Collection\n- Limited Release Cap\n- Premium Materials\n- $75.00\n\nWhich new arrival would you like to explore?"
    },
    {
      title: "Explore Collections",
      content: "Discover our exclusive team collections featuring premium materials and authentic designs:\n\n1. Brooklyn Nets\n- Heritage Collection\n- Court Culture Series\n- Limited Editions\n\n2. Atlanta Hawks\n- Signature Series\n- Premium Streetwear\n- Game Day Collection\n\n3. Tampa Bay\n- Elite Series\n- Gameday Essentials\n- Exclusive Releases\n\nWhich collection interests you?"
    }
  ];

  return (
    <div className="flex flex-col gap-2 px-2 py-2">
      {items.map((item) => (
        <div
          key={item.title}
          onClick={() => onItemClick(item.content)}
          className="group flex h-10 items-center gap-2.5 rounded-lg px-2 hover:bg-gray-100 cursor-pointer"
        >
          <div className="h-6 w-6 flex items-center justify-center">
            <Globe className="h-4 w-4 text-black" />
          </div>
          <span className="text-sm text-black">{item.title}</span>
        </div>
      ))}
    </div>
  );
};