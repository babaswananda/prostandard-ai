import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SidebarSearchProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SidebarSearch = ({ value, onChange }: SidebarSearchProps) => (
  <div className="p-2 mb-4">
    <div className="flex items-center gap-2 mb-2">
      <Search className="h-4 w-4 text-black" />
      <span className="text-sm text-black">Search</span>
    </div>
    <Input
      type="text"
      placeholder="Order #, SKU, collection name..."
      value={value}
      onChange={onChange}
      className="bg-gray-50 border-gray-200 text-black"
    />
  </div>
);