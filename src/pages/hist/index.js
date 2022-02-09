import React, { memo, useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import HistList from '@components/hist-list';

export default memo(function Hist(props) {
    const { isLogin } = useSelector(
        (state) => ({
            isLogin: state.getIn(['login', 'isLogin']),
        }),
        shallowEqual
    );

    useEffect(() => {
        if (!isLogin) {
            //window.location.href = '/main/transform';
            props.history.replace({
                pathname: '/main/transform'
            })
        }
    }, [isLogin])

    return (
        <div className='histPage'>
            <HistList />
        </div>
    );
});