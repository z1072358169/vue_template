const path = require('path');

function resolve(dir) {
    return path.resolve(__dirname, dir);
}
module.exports = {
    // eslint-loader 是否在保存的时候检查
    lintOnSave: true,
    // 输出文件目录
    outputDir: 'dist',
    assetsDir: 'static',
    // 静态资源路径
    publicPath: "./",
    chainWebpack: (config) => {
        //设置html title
        config
            .plugin('html')
            .tap((args) => {
                args[0].title = process.env.VUE_APP_TITLE;
                return args;
            });
        //设置目录映射
        config.resolve.alias
            .set('@assets', resolve('src/assets'))
            .set('@', resolve('src'));
    },
    //打包去除console
    configureWebpack: (config) => {
        if (process.env.NODE_ENV === 'production') {
            config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
        }
    },
    devServer: {
        port: process.env.VUE_APP_PORT, // 端口
        open: true, // 自动开启浏览器
        compress: false, // 开启压缩
        overlay: {
            warnings: true,
            errors: true,
        },
    },
};