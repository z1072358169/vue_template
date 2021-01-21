import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import Auth from '@/util/auth';
import routes from './staticRoute';
import store from '../store';
import whiteList from './whiteList';

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
    routes
})

NProgress.configure({
    showSpinner: false,
});


function permissionList(navList) {
    let meunList = []
    // 将菜单数据扁平化为一级
    function flatNavList(arr) {
        for (let v of arr) {
            if (v.child && v.child.length) {
                if (v.path) {
                    meunList.push(v)
                }
                flatNavList(v.child)
            } else {
                meunList.push(v)
            }
        }
    }
    flatNavList(navList)
    return meunList
}
// 路由跳转前验证
router.beforeEach((to, from, next) => {
    // 开启进度条
    NProgress.start();

    // 判断用户是否处于登录状态
    // debugger
    if (Auth.isLogin()) {
        store.commit('relogin')
        // 如果当前处于登录状态，并且跳转地址为login，则自动跳回系统首页
        // 这种情况出现在手动修改地址栏地址时
        if (to.path === '/login') {
            next({
                path: '/home',
                replace: true,
            });
        } else if (to.path.indexOf('/error') >= 0) {
            // 防止因重定向到error页面造成beforeEach死循环
            next();
        } else {
            let isPermission = false;
            console.log('进入权限判断');
            whiteList.forEach((item) => {
                if (item.indexOf("*") >= 0) {
                    let pathl = item.replace("*", "")
                    if (to.path.indexOf(pathl) >= 0) {
                        isPermission = true;
                    }
                } else {
                    if (item == to.path) {
                        isPermission = true;
                    }
                }
            })
            permissionList(store.state.MenuList).forEach((v) => {
                // 判断跳转的页面是否在权限列表中
                if (v.path == to.path) {
                    isPermission = true;
                }
            });
            // 没有权限时跳转到401页面
            if (!isPermission) {
                next({
                    path: '/error/401',
                    replace: true,
                });
            } else {
                next();
            }
        }
    } else {
        // 如果是免登陆的页面则直接进入，否则跳转到登录页面
        if (whiteList.indexOf(to.path) >= 0) {
            console.log('该页面无需登录即可访问');
            next();
        } else {
            console.warn('当前未处于登录状态，请登录');
            next({
                path: '/login',
                replace: true,
            });
            // 如果store中有token，同时Cookie中没有登录状态
            if (store.state.token) {
                next({
                    path: '/login',
                    replace: true,
                });
            }
            NProgress.done();
        }
    }
});

router.afterEach(() => {
    NProgress.done(); // 结束Progress
});

export default router