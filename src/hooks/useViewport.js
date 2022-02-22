import React, { memo, useState, useEffect, useContext } from 'react';
import throttle from '@utils/throttle';

// Context 通过组件树提供了一个传递数据的方法，从而避免在每一个层级手动传递 props 属性
const viewportContext = React.createContext({});

// 生产者
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

// 消费者
export const useViewport = () => {
    const { width, height } = useContext(viewportContext);
    return { width, height };
};

// 参考https://blog.csdn.net/u013034585/article/details/106327634