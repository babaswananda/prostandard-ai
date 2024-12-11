import { Globe } from "lucide-react";

export const SidebarNavigation = () => (
  <div className="flex flex-col gap-2 px-2 py-2">
    <div className="group flex h-10 items-center gap-2.5 rounded-lg px-2 hover:bg-gray-100 cursor-pointer">
      <div className="h-6 w-6 flex items-center justify-center">
        <Globe className="h-4 w-4 text-black" />
      </div>
      <span className="text-sm text-black">New Arrivals</span>
    </div>
    <div className="group flex h-10 items-center gap-2.5 rounded-lg px-2 hover:bg-gray-100 cursor-pointer">
      <div className="h-6 w-6 flex items-center justify-center">
        <Globe className="h-4 w-4 text-black" />
      </div>
      <span className="text-sm text-black">Explore Collections</span>
    </div>
  </div>
);