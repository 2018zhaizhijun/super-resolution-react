import React, { memo, useState } from 'react';
import { Button, message, Modal } from 'antd';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { changeIsVisible } from './store';
import LoginForm from '../login-form';

export default memo(function Login() {

    const dispatch = useDispatch();
    const { isVisible } = useSelector(
        (state) => ({
            isVisible: state.getIn(['login', 'isVisible']),
        }),
        shallowEqual
    );

    const handleCancel = () => {
        dispatch(changeIsVisible(false));
    };

    return (
        <Modal
          //centered
          footer={null}
          title="Super Resolution"
          visible={isVisible}
          onCancel={handleCancel}
        >
            <LoginForm />
        </Modal>
    );
});