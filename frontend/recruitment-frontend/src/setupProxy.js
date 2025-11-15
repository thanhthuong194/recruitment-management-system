const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api', // Đường dẫn API của bạn
    createProxyMiddleware({
      target: 'http://recruitment-backend:8080',
      changeOrigin: true,
    })
  );
};