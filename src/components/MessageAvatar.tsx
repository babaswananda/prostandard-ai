const MessageAvatar = ({ isAssistant }: { isAssistant: boolean }) => {
  if (isAssistant) {
    return (
      <div className="relative flex h-full items-center justify-center rounded-full bg-white text-black">
        <img
          src="https://scontent-ord5-2.cdninstagram.com/v/t51.2885-19/271827760_896436681029236_3251343246148692709_n.jpg?stp=dst-jpg_s320x320_tt6&_nc_ht=scontent-ord5-2.cdninstagram.com&_nc_cat=104&_nc_ohc=YfuViP_cwEQQ7kNvgFufImC&_nc_gid=79927215a4db4ecc96fc4689127d9264&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AYCE4MA415z-QbhzNZAOOixT12H0oI_SQyPTTFJ3Kyuh5g&oe=675F6165&_nc_sid=8b3546"
          alt="Pro Standard Assistant"
          className="h-full w-full rounded-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = `https://ui-avatars.com/api/?name=Pro+Standard&background=random`;
          }}
        />
      </div>
    );
  }
  
  return null;
};

export default MessageAvatar;