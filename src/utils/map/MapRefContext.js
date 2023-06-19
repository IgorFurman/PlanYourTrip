import React from 'react';

const MapContext = React.createContext(null);

export const MapRefProvider = ({ children }) => {
    const mapRef = React.useRef(null);
    return (
        <MapContext.Provider value={mapRef}>
            {children}
        </MapContext.Provider>
    );
};

export const useMapRef = () => React.useContext(MapContext);
