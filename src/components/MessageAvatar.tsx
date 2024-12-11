const MessageAvatar = ({ isAssistant }: { isAssistant: boolean }) => {
  if (isAssistant) {
    return (
      <div className="relative h-8 w-8 overflow-hidden rounded-full border border-[#4E4F60]">
        <div className="flex h-full w-full items-center justify-center bg-prostandard-gold text-white text-sm">
          SH
        </div>
      </div>
    );
  }
  
  return null;
};

export default MessageAvatar;