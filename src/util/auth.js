const authToken = {

    // 在sessionStorage中记录登录状态的key
    loginKey: process.env.VUE_APP_TOKENKEY,

    // 当前是否是登录状态
    isLogin() {
        return sessionStorage.getItem(this.loginKey);
    },
    // 设置登录状态
    setLoginStatus() {
        // TODO: 设置超时登录时间，在该时间范围内没有任何请求操作则自动删除
        sessionStorage.setItem(this.loginKey, 'true');
    },
};

export default authToken;