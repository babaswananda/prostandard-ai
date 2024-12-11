interface TimeframeItem {
  title: string;
  items: Array<{
    title: string;
    content: string;
  }>;
}

interface SidebarTimeframesProps {
  timeframes: TimeframeItem[];
  onItemClick: (content: string) => void;
}

export const SidebarTimeframes = ({ timeframes, onItemClick }: SidebarTimeframesProps) => (
  <div className="mt-4 flex flex-col gap-4">
    {timeframes.map((timeframe) => (
      <div key={timeframe.title}>
        <div className="px-3 py-2 text-xs text-gray-500">{timeframe.title}</div>
        {timeframe.items.map((item) => (
          <div
            key={item.title}
            onClick={() => onItemClick(item.content)}
            className="group flex h-10 items-center gap-2.5 rounded-lg px-2 hover:bg-gray-100 cursor-pointer mx-2"
          >
            <span className="text-sm text-black">{item.title}</span>
          </div>
        ))}
      </div>
    ))}
  </div>
);