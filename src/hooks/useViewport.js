import React, { memo, useState, useEffect, useContext } from 'react';
import throttle from '@utils/throttle';

const viewportContext = React.createContext({});

export const ViewportProvider = memo( ({ children }) => {
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);

    const resizeHandler = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    };

    const throttleResizeHandler = throttle(resizeHandler, 300);

    useEffect(() => {
        window.addEventListener('resize', throttleResizeHandler);
        return () => {
            window.removeEventListener('resize', throttleResizeHandler);
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