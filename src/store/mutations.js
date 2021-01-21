import authToken from '../util/auth';

const mutations = {
    setToken: (state, data) => {
        // TODO: 设置token
        sessionStorage.setItem('token', data);
        authToken.setLoginStatus();
        state.token = data;
    },
    setuser: (state, data) => {
        // TODO: 设置用户信息
        sessionStorage.setItem('user', JSON.stringify(data));
        state.user = data;
    },
    setMenuList: (state, data) => {
        // TODO: 设置顶部菜单
        sessionStorage.setItem('MenuList', JSON.stringify(data));
        state.MenuList = data;
    },
    removesession: () => {
        // TODO: 清空所有信息
        sessionStorage.clear();
    },
    // TODO: 刷新重新获取登陆信息
    relogin: (state) => {
        let token = sessionStorage.getItem('token');
        let MenuList;
        if (sessionStorage.getItem('MenuList')) {
            MenuList = JSON.parse(sessionStorage.getItem('MenuList'));
        } else {
            MenuList = [];
        }
        let user;
        if (sessionStorage.getItem('user')) {
            user = JSON.parse(sessionStorage.getItem('user'));
        } else {
            user = {};
        }
        state.token = token;
        state.user = user;
        state.MenuList = MenuList;
    }
};
export default mutations;