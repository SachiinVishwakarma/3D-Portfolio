import React, { useState } from 'react';

const Navigation = () => {
  const [active, setActive] = useState("About Me");
  
  // Navigation items
  const navLinks = [
    {
      id: "about",
      title: "About Me",
    },
    {
      id: "summary",
      title: "Summary",
    },
    {
      id: "portfolio",
      title: "Portfolio",
    },
  ];

  return (
    <div className="w-full bg-[#212121] dark:bg-white rounded-lg px-2 py-1 overflow-x-auto scrollbar-hide">
      <div className="relative flex items-center">
        {navLinks.map((nav, index) => (
          <React.Fragment key={nav.id}>
            <input 
              type="radio" 
              id={`rd-${index + 1}`}
              name="nav-radio" 
              className="absolute overflow-hidden h-0 w-0 opacity-0"
              checked={active === nav.title}
              onChange={() => setActive(nav.title)}
            />
            <label 
              htmlFor={`rd-${index + 1}`} 
              className={`cursor-pointer outline-none text-sm font-medium w-[100px] min-w-[100px] py-3 px-4 flex items-center justify-center relative z-10 transition-colors duration-250 group
                ${active === nav.title ? 'text-black dark:text-black' : 'text-white dark:text-[#212121]'}`}
              onClick={() => setActive(nav.title)}
            >
              <span className="overflow-hidden whitespace-nowrap text-ellipsis">{nav.title}</span>
              
              {/* Underline effect on hover (only shows when not active) */}
              {active !== nav.title && (
                <div className="absolute left-0 bottom-[-3px] w-full h-[3px] bg-red-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out rounded-full"></div>
              )}
            </label>
          </React.Fragment>
        ))}
        
        {/* Moving background for selected tab */}
        <div 
          className="absolute h-[calc(100%-8px)] w-[100px] bg-[#b8b8b8] dark:bg-[#383838] rounded-md z-0 transition-transform duration-500 ease-[cubic-bezier(0.33,0.83,0.99,0.98)]"
          style={{ 
            transform: `translateX(${navLinks.findIndex(nav => nav.title === active) * 100}%)` 
          }}
        ></div>
        
        {/* Bar decoration elements */}
        <div 
          className="absolute flex items-center justify-center flex-shrink-0 z-0 h-full w-[100px] transition-transform duration-500 ease-[cubic-bezier(0.33,0.83,0.99,0.98)]"
          style={{ 
            transform: `translateX(${navLinks.findIndex(nav => nav.title === active) * 100}%)` 
          }}
        >
          <div className="absolute top-0 h-1 w-full bg-white dark:bg-[#212121] rounded-b-full"></div>
          <div className="absolute bottom-0 h-1 w-full bg-white dark:bg-[#212121] rounded-t-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;