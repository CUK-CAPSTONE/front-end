// src/setupProxy.js

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/proxy',
    createProxyMiddleware({
      target: 'https://assets.meshy.ai',
      changeOrigin: true,
      pathRewrite: {
        '^/proxy': '', // URL 경로에서 /proxy를 제거합니다.
      },
      onProxyReq: (proxyReq, req, res) => {
        // 여기서 필요에 따라 헤더를 추가할 수 있습니다.
      }
    })
  );
};
