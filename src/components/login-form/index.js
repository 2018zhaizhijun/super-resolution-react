import React, { memo, useState } from 'react';
import propTypes from 'prop-types';
import { Form, Input, Button, message, Checkbox } from 'antd';
import { useDispatch } from 'react-redux';
import { performLogin } from '../login/store';
import { sendRegister, sendRegisterCode } from '@service/login';
import loginFormStyle from './style.module.css';

const layout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
    },
}
const buttonLayout = {
    wrapperCol: {
        xs: { span: 16 },
        sm: { offset: 8, span: 10 },
    },
}

export default memo(function LoginForm({ isRegistering=false }) {
    const [registering, setRegistering] = useState(isRegistering);
    const [isSending, setIsSending] = useState(false);
    const [phone, setPhone] = useState(null);
    const [second, setSecond] = useState(60);
    const dispatch = useDispatch();

    const telRegex = /[1][358][0-9]{9}/;
    const pwdRegex = /[0-9a-zA-Z_]{6,20}/;
    const codeRegex = /[0-9]{4}/;

    const onLogin = ({telephone, password}) => {
        dispatch(performLogin(telephone, password));
    };

    const onRegister = ({usrname, password, phone, code}) => {
        sendRegister(usrname, password, phone, code).then((res) => {
            console.log(res);
            if (res.statusCode != 200) {
                throw new Error('statusCode' + res.statusCode);
            }
            else {
                message.success('注册成功');
                setRegistering(false);
            }
        }).catch((e) => {
          message.error('注册失败');
          console.error('sendRegisterError', e);
        })
    };

    const handleRegister = () => {
        setRegistering(true);
    };
    const handleLogin = () => {
        setRegistering(false);
    };

    const handleSendCode = () => {
        if (!isSending) {
            sendRegisterCode(phone).then((res) => {
                if (res.statusCode == 200) message.success('发送成功');
                else {
                    setIsSending(false);
                    throw new Error('statusCode' + res.statusCode);
                }
            }).catch((e) => {
                message.error('发送失败，请重新发送');
                console.error('sendRegisterCodeError', e);
            })

            let i = 60;
            const doCount = () => {
                i--;
                setSecond(i);
                if (i > 0) {
                    setTimeout(doCount(), 1000);
                }
            };
            doCount();

            setIsSending(true);
        }
    };

    return (
      <>
        {
          !registering ? 
          <Form 
            // style={{
            //     display: registering ? 'none' : 'block',
            // }}
            className='loginForm'
            {...layout}
            onFinish={onLogin}
          >
              <Form.Item
                label="手机号码"
                name="telephone"
                rules={[
                  { pattern: telRegex, message: "请输入正确的手机号" },
                  { required: true, message: "请输入你的手机号" },
                ]}
              >
                  <Input autoFocus />
              </Form.Item>

              <Form.Item
                label="密码"
                name="password"
                rules={[
                  { pattern: pwdRegex, message: "请输入6-20位密码" },
                  { required: true, message: "请输入你的密码" },
                ]}
              >
                  <Input.Password />
              </Form.Item>

              <Form.Item {...buttonLayout}>
                  <Checkbox> 
                    记住我
                  </Checkbox>
              </Form.Item>

              <Form.Item {...buttonLayout}>
                  <Button type="primary" htmlType="submit" 
                    size="middle" block shape="round" 
                    className={loginFormStyle.loginButton}>
                      登  录
                  </Button>
                  <div className={loginFormStyle.register}
                    id="registerButton" 
                    onClick={handleRegister}>
                      立即注册
                  </div>
              </Form.Item>
          </Form>
          :
          <Form 
            // style={{
            //     display: registering ? 'block' : 'none',
            // }}
            className='registerForm'
            {...layout}
            onFinish={onRegister}
          >
              <Form.Item
                label="用户名"
                name="usrname"
                rules={[
                  { required: true, message: "请输入你的用户名" },
                ]}
              >
                  <Input autoFocus />
              </Form.Item>

              <Form.Item
                label="密码"
                name="password"
                rules={[
                  { pattern: pwdRegex, message: "请输入6-20位密码" },
                  { required: true, message: "请输入你的密码" },
                ]}
              >
                  <Input.Password />
              </Form.Item>

              <Form.Item
                label="手机号码"
                name="telephone"
                rules={[
                  { pattern: telRegex, message: "请输入正确的手机号" },
                  { required: true, message: "请输入你的手机号" },
                ]}
              >
                  <Input onChange={(target) => {
                      setPhone(target.value);
                  }}/>
              </Form.Item>

              <Form.Item
                label="验证码"
                name="code"
                rules={[
                  { pattern: codeRegex, message: "请输入正确的验证码" },
                  { required: true, message: "请输入短信验证码" },
                ]}
              >
                  <Input disabled={!isSending} 
                    style={{display:'inline', width: '45%'}}/>
                  <Button onClick={handleSendCode}
                    style={{display:'inline', width: '45%', marginLeft: '10%'}}
                  >
                      {isSending ? second+'s' : '发送验证码'}
                  </Button>
              </Form.Item>

              <Form.Item {...buttonLayout}>
                  <Button type="primary" htmlType="submit" 
                    size="middle" block shape="round"
                    className={loginFormStyle.loginButton}>
                      注  册
                  </Button>
                  <div className={loginFormStyle.register}
                    id="backtoLoginButton" 
                    onClick={handleLogin}>
                      返回登录
                  </div>
              </Form.Item>
          </Form>
        }
      </> 
    )
});
