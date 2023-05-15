import React, { useRef } from 'react';

export const ScrollContext = React.createContext();

export const ScrollProvider = ({ searchBar, placeDetails, placesToVisitList, children }) => {
  const searchBarRef = useRef(null);
  const placeDetailsRef = useRef(null);
  const placesToVisitRef = useRef(null);

  const calculateHeight = () => {
    const searchBarHeight = searchBarRef.current ? searchBarRef.current.offsetHeight : 0;
    const placeDetailsHeight = placeDetailsRef.current ? placeDetailsRef.current.offsetHeight : 0;
    const placesToVisitHeight = placesToVisitRef.current ? placesToVisitRef.current.offsetHeight : 0;

    return searchBarHeight + placeDetailsHeight + placesToVisitHeight;
  }

  return (
    <ScrollContext.Provider value={{ calculateHeight }}>
    <div ref={searchBarRef}>
        {searchBar}
    </div>
    <div ref={placeDetailsRef}>
        {placeDetails}
    </div>
    <div ref={placesToVisitRef}>
        {placesToVisitList}
    </div>
    {children} 
</ScrollContext.Provider>
  );
};
