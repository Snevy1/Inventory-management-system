import React from "react";

const ThemeLink = ({ className = "", title, href, icon}) => {
  return (
    <a
      href={href}
      className={` inline-flex items-center justify-center 
        px-6 py-3 rounded-lg font-medium
       ${className}
      `}
      aria-label={`${title} (opens in same window)`}
    >
      <span className="mr-2">{title}</span>
      <span className="transition-transform duration-300 group-hover:translate-y-1">
        {icon}
      </span>
    </a>
  );
};

export default ThemeLink;