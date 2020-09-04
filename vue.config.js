module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    proxy: {
      "/api": {
        target: "https://10.168.1.2",
        secure: false,
        changeOrigin: true,
        pathRewrite: { "^/api": "" }
      }
    }
  }
};
