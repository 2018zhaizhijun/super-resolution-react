import React, { memo, useState, useEffect } from 'react';
import { Form, Input, Button, message, Radio, Upload } from 'antd';
import { UploadOutlined, EditOutlined } from '@ant-design/icons';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { updateAvatar, changeProfile } from '../login/store';
import { sendUsrinfo } from '@service/login';
import usrinfoFormStyle from './style.module.css';
import { BASE_URL } from '@service/config';

const layout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { 
            offset: 1,
            span: 10,
        },
    },
};
const editButtonLayout = {
    wrapperCol: {
        xs: { span: 24 },
        sm: { 
            offset: 9,
            span: 8,
        },
        // md: {
        //     offset: 9,
        //     span: 8,
        // },
    },
};
const saveButtonLayout = {
    wrapperCol: {
        xs: { span: 24 },
        sm: { 
            offset: 9,
            span: 10,
        },
        // md: {
        //     offset: 9,
        //     span: 8,
        // },
    },
};

// function readFile(img, callback) {
//     const reader = new FileReader();
//     reader.addEventListener('load', ()=>callback(reader.result));
//     reader.readAsDataURL(img);
// };

export default memo(function UsrinfoForm({ isEditing=false }) {
    const [editing, setEditing] = useState(isEditing);
    const dispatch = useDispatch();
    const { profile } = useSelector(
      state => ({
          profile: state.getIn(['login', 'profile']),
      }),
      shallowEqual);
    const avatarUrl = profile.avatarUrl;
    const [avatarNew, setAvatarNew] = useState(avatarUrl);
    const editFormRef = React.createRef();

    const onEditFinish = ({usrname, sex}) => {
        sendUsrinfo(avatarNew, usrname, sex).then((res) => {
            console.log(res);
            if (res.statusCode != 200) {
                throw new Error('statusCode' + res.statusCode);
            }
            else {
                message.success('用户信息更新成功');
                dispatch(changeProfile({
                    avatarUrl: avatarNew,
                    usrname,
                    sex
                }));
                setEditing(false);
            }
        }).catch((e) => {
            console.error('sendUsrinfoError', e);
            message.error('用户信息更新失败');
        })
    };

    const handleEdit = () => {
        setEditing(true);
        setAvatarNew(avatarUrl);
    };
    const handleCancelEdit = () => {
        setEditing(false);
    };

    // const handleUploadAvatar = () => {
    //     //获得avatar图片文件
    //     dispatch(updateAvatar(avatarFile));
    // };

    const handleBeforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };

    const handleChange = (info) => {
        if (info.file.status === 'done') {
            //console.log(info);
            setAvatarNew(BASE_URL+info.file.response.data.avatar);
            // readFile(info.file.originFileObj, (imgUrl) => {
            //     setAvatarNew(imgUrl);
            // });
        }
        else if (info.file.status === 'error') {
            message.error("头像上传失败");
        }
    };

    useEffect(() => {
        if(editing){
            editFormRef.current.setFieldsValue({
                usrname: profile.usrname,
                sex: profile.sex,
            });
        }
    }, [editing]);

    const props = {
        maxCount: 1,
        showUploadList: false,
        action: '/upload/avatar',
        beforeUpload: handleBeforeUpload,
        onChange: handleChange,
        progress: {
            strokeColor: {
              '0%': '#108ee9',
              '100%': '#87d068',
            },
            strokeWidth: 3,
            format: percent => `${parseFloat(percent.toFixed(2))}%`,
        },
    };

    return (
      <div className={usrinfoFormStyle.usrinfoWrapper}>
        {
        !editing ?
            <Form 
            //   style={{
            //       display: editing ? 'none' : 'block',
            //   }}
            className='infoForm'
            {...layout}
            >
                <Form.Item label="用户头像" >
                    <img className="avatar"  height="120"
                    src={ typeof avatarUrl === 'string' && avatarUrl.length>0 ? 
                            avatarUrl : require("@assets/img/login.jpg") } 
                    alt="avatar" />
                </Form.Item>

                <Form.Item label="用户名" >
                    <div className={usrinfoFormStyle.borderedLabel}>
                        {profile.usrname}
                    </div>
                </Form.Item>

                <Form.Item label="手机号码" >
                    <div className={usrinfoFormStyle.borderedLabel}>
                        {profile.telephone}
                    </div>
                </Form.Item>

                <Form.Item label="性别" >
                    <div className={usrinfoFormStyle.borderedLabel}>
                        {profile.sex ? '女' : '男'}
                    </div>
                </Form.Item>

                <Form.Item {...editButtonLayout}>
                    <Button onClick={()=>handleEdit()} 
                    size="middle" block icon={<EditOutlined />}
                    id="editButton"
                    className={usrinfoFormStyle.editButton}>
                        编辑个人信息
                    </Button>
                </Form.Item>
            </Form>
        :
            <Form 
            ref={editFormRef}
            // style={{
            //     display: editing ? 'block' : 'none',
            // }}
            className='editForm'
            {...layout}
            onFinish={onEditFinish}
            >
                <Form.Item label="用户头像" >
                    <img className="avatar" height="120"
                    src={ typeof avatarNew === 'string' && avatarNew.length>0 ? 
                            avatarNew : require("@assets/img/login.jpg") } 
                    alt="avatar" />
                    <Upload {...props} name='avatar'>
                        <Button icon={<UploadOutlined />}
                        className={usrinfoFormStyle.uploadButton}>
                            点击上传
                        </Button>
                    </Upload>
                </Form.Item>

                <Form.Item label="用户名" name="usrname" >
                    <Input />
                    {/* {
                        this.props.form.getFieldDecorator('usrname', {
                        rules: [
                            { required: true, message: "请输入你的用户名" },
                        ],
                        initialValue: profile.usrname,
                        })(<Input />)
                    } */}
                </Form.Item>

                <Form.Item label="手机号码" >
                    <Input disabled value={profile.telephone} />
                </Form.Item>

                <Form.Item label="性别" name="sex" >
                    <Radio.Group buttonStyle="solid">
                        <Radio className={usrinfoFormStyle.radioButton} value="0">男</Radio>
                        <Radio className={usrinfoFormStyle.radioButton} value="1">女</Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item {...saveButtonLayout}>
                    <Button type="primary" size="middle" 
                    id="cancelButton"
                    className={usrinfoFormStyle.saveButton}
                    style={{marginRight: '20px'}}
                    onClick={()=>handleCancelEdit()}>
                        取 消
                    </Button>
                    <Button type="primary" htmlType="submit" 
                    size="middle" id="saveButton"
                    className={usrinfoFormStyle.saveButton}>
                        保 存
                    </Button>
                </Form.Item>
            </Form>
        }
      </div> 
    );
});
