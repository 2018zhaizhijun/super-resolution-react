const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(createProxyMiddleware('/api',
        {
            target: "http://101.35.24.184:9008",
            pathRewrite: {
                '^/api': '',
            },
            changeOrigin: true,
            secure: false,
        }
    ));
};
