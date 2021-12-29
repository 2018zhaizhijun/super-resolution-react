import React, { memo, useEffect, useState, useRef } from 'react';
import { Upload, message } from 'antd';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import { uploadImage, uploadVideo } from '@service/upload';
import { changeIsVisible } from '@components/login/store';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { BASE_URL } from '@service/config';
import { TransWrapper } from './style';

const { Dragger } = Upload;

export default memo(function TransBlock() {
    const [filelist, setFilelist] = useState([]);
    let ref = useRef();
    const dispatch = useDispatch();
    const { isLogin } = useSelector(
        state => ({
            isLogin: state.getIn(['login', 'isLogin']),
        }),
        shallowEqual);

    const customRequest = (option) => {
        const fileType = option.file.type.split('/')[0];
        const { file, onSuccess, onError, onProgress } = option;

        const onUploadProgress = ({ total, loaded }) => {
            onProgress({ percent: Math.round((loaded / total) * 100).toFixed(2) }, file);
        };

        //console.log(file);
        file.status = "uploading";
        const filelistNew = [...ref.current, file];
        setFilelist(filelistNew);
        ref.current = filelistNew;
            
        if (fileType === 'image') {
            uploadImage(file, onUploadProgress).then((res) => {
                setTimeout(() => {
                    //console.log(file);
                    onSuccess(res, file);
                    let filelistCopy = ref.current.slice(0);
                    //console.log(filelistCopy);
                    for (let fileitem of filelistCopy) {
                        if (fileitem.uid === file.uid) {
                            fileitem.url = BASE_URL+res.data[1];
                            fileitem.status = "done";
                            setFilelist(filelistCopy);
                            ref.current = filelistCopy;
                        }
                    }
                }, 12000);
            }).catch((e, res) => {
                onError(e, res);
                message.error(file.name+"上传失败");
            });
        }
        else if (fileType === 'video') {
            uploadVideo(file, onUploadProgress).then((res) => {
                setTimeout(() => {
                    onSuccess(res, file);
                    let filelistCopy = ref.current.slice(0);
                    for (let fileitem of filelistCopy) {
                        if (fileitem.uid === file.uid) {
                            fileitem.url = BASE_URL+res.data[1];
                            fileitem.status = "done";
                            setFilelist(filelistCopy);
                            ref.current = filelistCopy;
                        }
                    }
                }, 180*1000);
            }).catch((e, res) => {
                onError(e, res);
                message.error(file.name+"上传失败");
            });
        }
        else {
            message.error('不支持的文件类型');
        }

    };

    const props = {
        multiple: true,
        action: "",
        showUploadList: false,
        //listType: "picture",
        accept: "image/*,video/*",
        // showUploadList: {
        //     showDownloadIcon: true,
        //     downloadIcon: '下载  ',
        //     showRemoveIcon: true,
        //     removeIcon: <DeleteOutlined />,
        // },
        beforeUpload: (file) => {
            const acceptedFormats = ['jpg', 'jpeg', 'png', 'mp4', 'webm', 'ogg'];
            const isRightFormat = acceptedFormats.includes(file.name.split('.')[1].toLowerCase());
            if (!isRightFormat) {
                message.error('请上传.jpg .png .mp4 .webm .ogg格式的文件');
            }
            const isLt2M = file.size / 1024 / 1024 <= 2;
            if (!isLt2M) {
                message.error('请上传小于2MB的文件');
            }
            return isRightFormat && isLt2M ? true : Upload.LIST_IGNORE;
        },
        progress: {
            style: {
                width: '50%',
                float: 'right',
                marginBottom: '8px',
                marginRight: '20px',
            },
            strokeWidth: 3,
            size: 'small',
            format: percent => `${percent}%`,
        },
        customRequest: customRequest,
    };

    const eventHandler = (event) => {
        dispatch(changeIsVisible(true));
        event.stopPropagation();
    };
    
    useEffect(() => {
        let elem = document.getElementById('draggerWrapper');

        if (!isLogin) {
            elem.addEventListener('click', eventHandler, true);
        }
        else {
            //removeEventListener中也要填入与addEventListener一样的useCapture参数
            elem.removeEventListener('click', eventHandler, true);
        }

        return () => {
            try {
                elem.removeEventListener('click', eventHandler, true);
            } catch(e) {}
        }
    }, [isLogin]);

    useEffect(() => {
        ref.current = filelist;
    });

    const onChange = ({ file, fileList }) => {
        console.log(file, fileList);
        setFilelist(fileList);
        ref.current = fileList;
    };

    return (
      <TransWrapper>
        <div id="draggerWrapper" className="draggerArea">
            <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                    <UploadOutlined />
                </p>
                <p className="ant-upload-text">点击或拖拽上传图片或视频</p>
                <p className="ant-upload-hint">
                    文件格式：.jpg .png .mp4 .webm .ogg
                    <br />
                    文件大小限制：2MB
                </p>
            </Dragger>
        </div>

        <div className="draggerArea resultArea">
            <Dragger 
              className="displayDragger"
              fileList={filelist} 
              onChange={onChange}
              listType="picture"
              showUploadList={{
                showDownloadIcon: true,
                downloadIcon: '下载  ',
                showRemoveIcon: true,
                removeIcon: <DeleteOutlined />,
              }}>
            </Dragger>
        </div>
      </TransWrapper>
    );
});