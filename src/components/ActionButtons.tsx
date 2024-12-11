import { Shirt, Search, ShoppingBag, Palette, Medal } from "lucide-react";

const ActionButtons = () => {
  const actions = [
    { icon: <Shirt className="h-4 w-4 text-purple-400" />, label: "Team gear" },
    { icon: <Search className="h-4 w-4 text-blue-400" />, label: "Find my size" },
    { icon: <ShoppingBag className="h-4 w-4 text-green-400" />, label: "New releases" },
    { icon: <Palette className="h-4 w-4 text-yellow-400" />, label: "Color match" },
    { icon: <Medal className="h-4 w-4 text-red-400" />, label: "Limited editions" },
  ];

  return (
    <div className="flex gap-2 flex-wrap justify-center mt-4">
      {actions.map((action) => (
        <button 
          key={action.label} 
          className="relative flex h-[42px] items-center gap-1.5 rounded-full border border-[#383737] px-3 py-2 text-start text-[13px] shadow-xxs transition enabled:hover:bg-black/20 disabled:cursor-not-allowed xl:gap-2 xl:text-[14px] text-white bg-black/40 backdrop-blur-sm"
        >
          {action.icon}
          {action.label}
        </button>
      ))}
    </div>
  );
};

export default ActionButtons;