import React, { useState, useRef } from 'react';

export const ScrollContext = React.createContext();

export const ScrollProvider = ({ children }) => {
  const searchBarRef = useRef(null);
  const [hasScrolled, setHasScrolled] = useState(false);

  const handleScroll = () => {
    console.log("handleScroll is called!");
    if (hasScrolled) return;
    const searchBarHeight = searchBarRef.current.offsetHeight;
		
    console.log("searchBarHeight: ", searchBarHeight); 
		
    window.scrollTo({
      top: searchBarHeight,
      behavior: 'smooth',
    });

    setHasScrolled(true);
};

  const resetScroll = () => {
    setHasScrolled(false);
  };

  return (
    <ScrollContext.Provider value={{ searchBarRef, handleScroll, resetScroll, hasScrolled }}>
      {children} 
    </ScrollContext.Provider>
  );
};
