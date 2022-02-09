import React, { memo, useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import UsrinfoForm from '@components/usrinfo-form';
import formStyle from './style.module.css';

export default memo(function UsrInfo(props) {
    const { isLogin } = useSelector(
        (state) => ({
            isLogin: state.getIn(['login', 'isLogin']),
        }),
        shallowEqual
    );

    useEffect(() => {
        if (!isLogin) {
            //window.location.assign('/main/transform');
            props.history.replace({
                pathname: '/main/transform'
            })
        }
    }, [isLogin])

    return (
        <div className={formStyle.formWrapper+' usrinfoPage'} >
            <UsrinfoForm />
        </div>
    );
});