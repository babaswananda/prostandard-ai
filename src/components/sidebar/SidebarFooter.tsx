export const SidebarFooter = () => (
  <div className="flex flex-col py-2 border-t border-gray-200">
    <button className="group flex gap-2 p-2.5 text-sm items-start hover:bg-gray-100 rounded-lg px-2 text-left w-full min-w-[200px]">
      <span className="flex w-full flex-row flex-wrap-reverse justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-200">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="icon-sm">
              <path fillRule="evenodd" clipRule="evenodd" d="M12.5001 3.44338C12.1907 3.26474 11.8095 3.26474 11.5001 3.44338L4.83984 7.28868C4.53044 7.46731 4.33984 7.79744 4.33984 8.1547V15.8453C4.33984 16.2026 4.53044 16.5327 4.83984 16.7113L11.5001 20.5566C11.8095 20.7353 12.1907 20.7353 12.5001 20.5566L19.1604 16.7113C19.4698 16.5327 19.6604 16.2026 19.6604 15.8453V8.1547C19.6604 7.79744 19.4698 7.46731 19.1604 7.28868L12.5001 3.44338Z" fill="black"/>
            </svg>
          </span>
          <div className="flex flex-col">
            <span className="text-black">Settings & Account</span>
            <span className="line-clamp-1 text-xs text-gray-500">Preferences and sign out</span>
          </div>
        </div>
      </span>
    </button>
  </div>
);