import React, { memo } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import store from './store';
import routes from './router';
import { ViewportProvider } from '@hooks/useViewport';

export default memo(function App({testStore=null}) {
    return (
        <React.StrictMode>
        <Provider store={testStore?testStore:store}>
            <ViewportProvider>
                <BrowserRouter>
                    { renderRoutes(routes) }
                </BrowserRouter>
            </ViewportProvider>
        </Provider>
        </React.StrictMode>
    );
});
