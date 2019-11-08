import store from 'store'

import layoutView from '../views/layout.art'

class Layout {
    constructor() {
        this.render()
    }

    render() {

        if ($.cookie('ret')) {
            var ret = JSON.parse($.cookie('ret'))
        }

        //渲染界面
        $('.layout').html(layoutView({
            isLogin: ret,
            username: $.cookie('username')
        }))

        //控制左边二级菜单显示隐藏
        $('.side-nav-menu .nav-item').on('click', function () {
            $(this).toggleClass('open').siblings().removeClass('open')
        })

        //控制左边导航显示隐藏
        $('.lni-menu').on('click', function () {
            if ($(window).width() <= 1108) {
                $('.app ').toggleClass('side-nav-expand')
            } else {
                $('.app ').toggleClass('side-nav-folded')
            }
        })

        //点击登录
        $('.login').on('click', function () {
            location.hash = 'login'
        })

        //点击注册
        $('.register').on('click', function () {
            location.hash = 'register'
        })

        //点击注销
        $('.Logout').on('click', function () {
            $.cookie('ret', '')
            $.cookie('username', '')
            store.remove('token')
            window.location.reload()
        })
    }

}

export default new Layout()