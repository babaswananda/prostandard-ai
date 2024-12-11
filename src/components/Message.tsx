import MessageAvatar from './MessageAvatar';
import MessageActions from './MessageActions';

type MessageProps = {
  role: 'user' | 'assistant';
  content: string;
};

const Message = ({ role, content }: MessageProps) => {
  // Function to detect image URLs in the content
  const renderContent = (text: string) => {
    const imageUrlRegex = /(https?:\/\/[^\s]+\.(?:jpg|jpeg|png|gif))(?=\s|$)/gi;
    const parts = text.split(imageUrlRegex);
    const matches = text.match(imageUrlRegex) || [];
    
    return parts.map((part, index) => (
      <>
        {part}
        {matches[index] && (
          <div className="mt-2 mb-2">
            <img 
              src={matches[index]} 
              alt="Product" 
              className="rounded-lg max-w-[300px] h-auto"
              loading="lazy"
            />
          </div>
        )}
      </>
    ));
  };

  return (
    <div className="py-6">
      <div className={`flex gap-4 ${role === 'user' ? 'flex-row-reverse' : ''}`}>
        <MessageAvatar isAssistant={role === 'assistant'} />
        <div className={`flex-1 space-y-2 ${role === 'user' ? 'flex justify-end' : ''}`}>
          <div 
            className={`
              ${role === 'user' 
                ? 'bg-gray-700/50 rounded-[20px] px-4 py-2 inline-block text-white backdrop-blur-sm' 
                : 'bg-black/40 backdrop-blur-sm rounded-[20px] px-4 py-2 text-white max-w-[85%]'
              }
            `}
          >
            {renderContent(content)}
          </div>
          {role === 'assistant' && <MessageActions />}
        </div>
      </div>
    </div>
  );
};

export default Message;