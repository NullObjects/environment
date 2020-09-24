module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    proxy: {
      "/api": {
        target: "https://127.0.0.1",
        secure: false,
        changeOrigin: true,
        pathRewrite: { "^/api": "" }
      }
    }
  }
};
