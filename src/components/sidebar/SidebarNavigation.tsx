import { Globe, Gift, Shirt } from "lucide-react";

interface SidebarNavigationProps {
  onItemClick: (content: string) => void;
}

export const SidebarNavigation = ({ onItemClick }: SidebarNavigationProps) => {
  const items = [
    {
      title: "Holiday Collection",
      icon: <Gift className="h-4 w-4 text-black" />,
      content: "Welcome to our Holiday Collection! Here are our latest additions:\n\n1. WINGSPAN Hoodie (NEW)\n- Premium Philadelphia design\n- Limited holiday release\n- Available within 72 hours\n\n2. Sneaker Tie Backs\n- Perfect gift option\n- Pairs with December shoe releases\n- View at: brandboom.com/app/a/9B78CADB770\n\n3. PENNANTS Collection\n- New holiday release\n- Premium design\n\nWhich collection would you like to explore?"
    },
    {
      title: "League Collections",
      icon: <Shirt className="h-4 w-4 text-black" />,
      content: "Explore our exclusive league collections:\n\n1. NFL Collection (Week 14)\n- Best in Division selections\n- All teams available\n- Premium designs\n\n2. NBA Collection\n- Exclusive team designs\n- Premium materials\n\n3. MLB Collection\n- Authentic team gear\n- Limited editions\n\n4. College Collection\n- Including Colorado\n- Premium collegiate wear\n\nWhich league interests you?"
    },
    {
      title: "Classic Collections",
      icon: <Globe className="h-4 w-4 text-black" />,
      content: "Discover our classic MASH UP collection:\n\n- Timeless designs\n- Premium materials\n- Authentic team logos\n- View at: brandboom.com/app/a/1EB1F5270F7\n\nWould you like to explore our classic pieces?"
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
            {item.icon}
          </div>
          <span className="text-sm text-black">{item.title}</span>
        </div>
      ))}
    </div>
  );
};