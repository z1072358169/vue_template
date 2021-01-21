const actions = {
    // 登出
    logout({
        commit
    }) {
        return new Promise((resolve) => {
            commit('removesession')
            resolve()
        })
    }
}
export default actions