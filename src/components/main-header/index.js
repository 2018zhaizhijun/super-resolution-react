import React, { memo } from 'react';
import { headerLinks, menuLinks } from '@common/local-data';
import { HeaderWrapper, ProfileMenu } from './style';
import { Dropdown } from 'antd';
import { DownOutlined, UserOutlined, MenuOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import ErrorBoundary from '@utils/error-boundary';
import { changeIsVisible, performLogout } from '@components/login/store';
import { changeSidebarVisible } from '@components/side-bar/store';
import LoginModal from '@components/login';
import { useViewport } from '@hooks/useViewport';

export default memo(function MainHeader(props) {
    // const isLogin = true;
    // const profile = {
    //     usrname: 'zz',
    //     telephone: '18607339539',
    //     avatarUrl: '@assets/img/login.jpg'
    // }
    const { width } = useViewport();
    const breakpoint = 470;
    
    const showLinkItem = (item, index, className) => {
        return (
            <NavLink
                key={item.title}
                id={item.discribe}
                to={item.link}
                className={className}
                activeClassName="active-link"
            >
                <i>{item.title}</i>
            </NavLink>
        );
    };

    const dispatch = useDispatch();
    const { isLogin, profile, isSidebarVisible } = useSelector(
        state => ({
            isLogin: state.getIn(['login', 'isLogin']),
            profile: state.getIn(['login', 'profile']),
            isSidebarVisible: state.getIn(['sidebar', 'isVisible']),
        }),
        shallowEqual);

    const showProfileContent = () => {
        return (
            <div className="info-disp">
                <div className="info-li">
                    <UserOutlined  className="icon"/>
                    <span>{profile.usrname}</span>
                </div>
                <div className="info-li">
                    <UserOutlined className="icon conceal" />
                    <span>{profile.telephone}</span>
                </div>
            </div>
        )
    }

    const clearLoginState = () => {
        dispatch(performLogout());
    }

    const handleLogin = () => {
        dispatch(changeIsVisible(true));
    }

    const hideSidebar = () => {
        dispatch(changeSidebarVisible(false));
    }

    const profileDownMenu = () => {
        return (
            <div onClick={hideSidebar}>
                <ProfileMenu>
                {showProfileContent()}
                <div className="menu-list">
                    {menuLinks.map((item, index) => {
                        return showLinkItem(item, index, "menu-link");
                    })}
                    <div className="menu-logout"
                     onClick={()=>clearLoginState()}>
                        退出登录
                    </div>
                </div>
                </ProfileMenu>
            </div>
        );
    }

    return (
        <ErrorBoundary>
        <HeaderWrapper>
            <div className="logo-menu">
                {
                    width < breakpoint ? 
                    <MenuOutlined className="icon" 
                      onClick={() => {
                          //console.log(!isSidebarVisible);
                          dispatch(changeSidebarVisible(!isSidebarVisible));
                      }}
                    /> : null
                }
                <img className="logo" src={require("@assets/img/logo.png")} alt="logo" />
            </div>
            {
                width < breakpoint ? 
                null :
                <div className="nav-left">
                    {headerLinks.map((item, index) => {
                        return showLinkItem(item, index, "header-link");
                    })}
                </div>
            }
            <div className="usr-menu">
                {isLogin ? 
                (<Dropdown overlay={profileDownMenu}>
                    <div className="drop-menu" data-testid="dropMenu">
                        <img src={typeof profile.avatarUrl === 'string' && profile.avatarUrl.length>0 ? 
                                  profile.avatarUrl : 
                                  require("@assets/img/login.jpg")} 
                             alt="" />
                        <DownOutlined className="icon"/>
                    </div>
                </Dropdown>) : 
                (<div className="login-link" 
                  onClick={() => {
                      hideSidebar();
                      handleLogin();
                  }}>
                     登录
                </div>)
                }
            </div>
        </HeaderWrapper>
        <LoginModal />
        </ErrorBoundary>
    );
});