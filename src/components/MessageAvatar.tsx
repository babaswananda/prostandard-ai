const MessageAvatar = ({ isAssistant }: { isAssistant: boolean }) => {
  if (isAssistant) {
    return (
      <div className="relative flex h-full items-center justify-center rounded-full bg-white text-black">
        <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-2/3 w-2/3" role="img">
          <text x="-9999" y="-9999">Pro Standard Assistant</text>
          <path d="M20.5 0C9.17816 0 0 9.17816 0 20.5C0 31.8218 9.17816 41 20.5 41C31.8218 41 41 31.8218 41 20.5C41 9.17816 31.8218 0 20.5 0ZM20.5 7.45455C24.3727 7.45455 27.5 10.5818 27.5 14.4545C27.5 18.3273 24.3727 21.4545 20.5 21.4545C16.6273 21.4545 13.5 18.3273 13.5 14.4545C13.5 10.5818 16.6273 7.45455 20.5 7.45455ZM20.5 36.0909C15.8727 36.0909 11.7455 33.9636 9.09091 30.5364C9.17816 25.5182 19.0909 22.7273 20.5 22.7273C21.8909 22.7273 31.8218 25.5182 31.9091 30.5364C29.2545 33.9636 25.1273 36.0909 20.5 36.0909Z" fill="black"/>
        </svg>
      </div>
    );
  }
  
  return null;
};

export default MessageAvatar;