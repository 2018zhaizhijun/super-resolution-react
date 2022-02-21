# 关于超分辨率转换的React项目

该项目以Create-Reate-App脚手架创建，用craco覆盖webpack的配置。
实现超分辨率转换、登录、修改个人信息、查看历史记录等功能，是在原课程大作业项目的基础上用web重新实现，同时有一定的调整。
原项目文档：https://github.com/Shinichi618/Super-resolution

## npm操作

在项目的根目录下可以运行:

### `npm start`

在开发模式下运行
可通过 http://localhost:3000 访问页面

### `npm run test`

运行单例测试

### `npm run build`

构建项目，打包后的文件位于build目录下

## 部署到本地Nginx服务器

nginx/nginx.conf文件针对BrowserRouter进行了配置，同时将api请求转发至Web服务器（https://github.com/Shinichi618/Super-resolution）

·本地安装nginx，用该项目中的nginx/nginx.conf文件替换安装目录下的conf/nginx.conf
·在nginx安装目录下执行nginx.exe启动反向代理，通过nginx.conf内配置的主机名+端口号访问页面
·执行nginx -s quit停止运行
