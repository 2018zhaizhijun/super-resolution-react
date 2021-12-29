import React, { memo } from 'react';
import { renderRoutes } from 'react-router-config';
import { useDispatch } from 'react-redux';
import MainHeader from '@components/main-header';
import mainStyle from './style.module.css';
import { useViewport } from '@hooks/useViewport';
import SideBar from '@components/side-bar';
import { changeSidebarVisible } from '@components/side-bar/store';

export default memo(function Main(props) {
    const { width } = useViewport();
    const breakpoint = 470;

    const dispatch = useDispatch();

    return (
        <div>
            <MainHeader className={mainStyle.header} />
            <div className={mainStyle.content}>
                {
                    width < breakpoint ? <SideBar /> : null
                }
                <div 
                  style={{width: '100%', height: '100%'}}
                  onClick={() => {
                    dispatch(changeSidebarVisible(false));
                  }}>
                    { renderRoutes(props.route.routes) }
                </div>
            </div>
        </div>
    );
});
