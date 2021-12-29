import axios from 'axios';
import { BASE_URL, TIMEOUT } from './config';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

NProgress.configure({showSpinner: false});

const instance = axios.create({
    //baseURL: BASE_URL,
    timeout: TIMEOUT,
    headers: {
        'content-type': 'application/json',
    },
    withCredentials: true
});

instance.interceptors.request.use(
    config => {
        NProgress.start();
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    response => {
        NProgress.done();
        return response.data;
    },
    error => {
        if (error && error.response) {
            switch (error.response.statusCode) {
                case 504:
                    alert('用户尚未注册');
                    console.log('504:用户尚未注册');
                    break;
                case 509:
                case 515:
                    alert('找不到处理完的文件');
                    console.log(error.response.status+':找不到处理完的文件');
                    break;
                case 512:
                case 514:
                    alert('文件未上传');
                    console.log(error.response.status+':文件未上传');
                    break;
                case 518:
                    alert('用户token过期，请重新登录');
                    console.log('518:用户token过期，请重新登录');
                    break;
                default:
                    alert('操作失败');
                    console.log(error.response);
                    break;
            }
        }
        return Promise.reject(error);
    }
);

export default instance;