import React, { memo } from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import store from './store';
import routes from './router';
import { ViewportProvider } from '@hooks/useViewport';

export default memo(function App() {
    return (
        <Provider store={store}>
            <ViewportProvider>
                <HashRouter>
                    { renderRoutes(routes) }
                </HashRouter>
            </ViewportProvider>
        </Provider>
    );
});
