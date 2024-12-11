const MessageAvatar = ({ isAssistant }: { isAssistant: boolean }) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = `https://ui-avatars.com/api/?name=Shaunee&background=random`;
  };

  if (isAssistant) {
    return (
      <div className="relative h-8 w-8 overflow-hidden rounded-full border border-[#4E4F60]">
        <img
          src="https://scontent-ord5-2.cdninstagram.com/v/t51.2885-19/271827760_896436681029236_3251343246148692709_n.jpg?stp=dst-jpg_s320x320_tt6&_nc_ht=scontent-ord5-2.cdninstagram.com&_nc_cat=104&_nc_ohc=YfuViP_cwEQQ7kNvgFufImC&_nc_gid=79927215a4db4ecc96fc4689127d9264&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AYCE4MA415z-QbhzNZAOOixT12H0oI_SQyPTTFJ3Kyuh5g&oe=675F6165&_nc_sid=8b3546"
          alt="Pro Standard Assistant"
          className="h-full w-full object-cover"
          onError={handleImageError}
        />
      </div>
    );
  }
  
  return null;
};

export default MessageAvatar;