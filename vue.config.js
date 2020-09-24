module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    proxy: {
      "/api": {
        // target: "https://10.168.1.2",
        target: "https://127.0.0.1:5001",
        secure: false,
        changeOrigin: true,
        pathRewrite: { "^/api": "" }
      }
    }
  }
};
