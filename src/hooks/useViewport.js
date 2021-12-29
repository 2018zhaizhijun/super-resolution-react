import React, { memo, useState, useEffect, useContext } from 'react';

const viewportContext = React.createContext({});

export const ViewportProvider = memo( ({ children }) => {
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);

    const resizeHandler = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    };

    useEffect(() => {
        window.addEventListener('resize', resizeHandler);
        return () => {
            window.removeEventListener('resize', resizeHandler);
        }
    }, [])

    return (
        <viewportContext.Provider value={{ width, height }}>
            { children }
        </viewportContext.Provider>
    );
} );

export const useViewport = () => {
    const { width, height } = useContext(viewportContext);
    return { width, height };
};