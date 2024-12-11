import { ContactButtons } from "./header/ContactButtons";
import { ModelSelector } from "./header/ModelSelector";

interface ChatHeaderProps {
  isSidebarOpen?: boolean;
}

const ChatHeader = ({ isSidebarOpen = true }: ChatHeaderProps) => {
  return (
    <div className="fixed top-0 z-30 w-full border-b border-[#4E4F60] bg-white/95 backdrop-blur">
      <div className="flex h-[60px] items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className={`${!isSidebarOpen ? 'ml-24' : ''}`}>
            <img 
              src="https://teamprostandard.com/cdn/shop/files/logo_1187a12c-0055-4dae-9e00-e51f5f909a7f_300x.png?v=1652788495" 
              alt="Pro Standard Logo" 
              className="h-8 w-auto"
            />
          </div>
          <ModelSelector />
        </div>
        <div className="flex items-center gap-4">
          <ContactButtons />
          <span className="text-sm text-gray-600">Shaunee (Sales Rep)</span>
          <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-white border border-[#4E4F60]">
            <img
              src="https://scontent-ord5-2.cdninstagram.com/v/t51.2885-19/271827760_896436681029236_3251343246148692709_n.jpg?stp=dst-jpg_s320x320_tt6&_nc_ht=scontent-ord5-2.cdninstagram.com&_nc_cat=104&_nc_ohc=YfuViP_cwEQQ7kNvgFufImC&_nc_gid=79927215a4db4ecc96fc4689127d9264&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AYCE4MA415z-QbhzNZAOOixT12H0oI_SQyPTTFJ3Kyuh5g&oe=675F6165&_nc_sid=8b3546"
              alt="Shaunee"
              className="h-full w-full rounded-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `https://ui-avatars.com/api/?name=Shaunee&background=random`;
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;