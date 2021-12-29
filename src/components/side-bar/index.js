import React, { memo } from 'react';
import { headerLinks } from '@common/local-data';
import { NavLink } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import { SidebarWrapper } from './style';

export default memo(function SideBar() {
    const { isVisible } = useSelector(
        state => ({
            isVisible: state.getIn(['sidebar', 'isVisible']),
        }),
        shallowEqual);

    const showLinkItem = (item, index, className) => {
        return (
            <NavLink
                key={item.title}
                to={item.link}
                className={className}
                activeClassName="active-link"
            >
                <span>{item.title}</span>
            </NavLink>
        );
    };

    return (
        <SidebarWrapper className="sidebarWrapper"
          style={{left: isVisible ? '0' : '-100%'}}>
            {headerLinks.map((item, index) => {
                return showLinkItem(item, index, "sidebar-link");
            })}
        </SidebarWrapper>
    );
});