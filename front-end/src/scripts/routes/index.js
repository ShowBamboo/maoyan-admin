import SMERouter from 'sme-router'

import titleView from '../views/title.art'

import {
    home
} from '../controllers/home'

import {
    register
} from '../controllers/register'

import {
    login
} from '../controllers/login'

import * as movie from '../controllers/movie'

import {
    reset
} from '../controllers/reset'

import {
    chat
} from "../controllers/chat";

const router = new SMERouter('container-fluid')

router.use((req) => {
    //通过路由控制页签高亮
    let url = req.url.slice(1).split('/')[0].split('?')[0].split('_')[0]
    $(`.side-nav-menu .nav-item[data-url=${url}]`).addClass('open').siblings().removeClass('open')

    let BreadcrumbMap = {
        'home': {
            level1: '后台管理系统',
            level2: '首页'
        },
        'movie': {
            level1: '后台管理系统',
            level2: '电影管理'
        },
        'login': {
            level1: '后台管理系统',
            level2: '登录'
        },
        'register': {
            level1: '后台管理系统',
            level2: '注册'
        },
        'reset': {
            level1: '后台管理系统',
            level2: '重置密码'
        },
        'chat': {
            level1: '后套管理系统',
            level2: '聊天室'
        }
    }
    let TitleMap = {
        'home': {
            title: '首页'
        },
        'movie': {
            title: '电影管理'
        },
        'login': {
            title: '登录'
        },
        'register': {
            title: '注册'
        },
        'reset': {
            title: '重置密码'
        },
        'chat': {
            title: '聊天室'
        }
    }
    let info = {
        Breadcrumb: {
            level1: BreadcrumbMap[url].level1,
            level2: BreadcrumbMap[url].level2
        },
        Title: {
            title: TitleMap[url].title
        }
    }

    //渲染面包屑
    $('#content-title').html(titleView({
        info
    }))
})

router.route('/home', home)
router.route('/register', register)
router.route('/login', login)
router.route('/movie', movie.list)
router.route('/movie_add', movie.add)
router.route('/movie_update', movie.update)
router.route('/movie_list/:page', movie.list)
router.route('/reset', reset)
router.route('/chat', chat)

//重定向路由， 初始化为home
router.route('*', (req, res, next) => {
    res.redirect('/home')
})

export default router


// import layoutController from '../controllers/layout'
// import loginController from '../controllers/login'
// import registerController from '../controllers/register'

// class Router {
//     constructor() {
//         this.render()
//     }

//     render() {
//         window.addEventListener('load', this.handlePageload.bind(this))
//         window.addEventListener('hashchange', this.handleHashchange.bind(this))
//     }

//     handlePageload() {

//         let hash = location.hash.substr(1) || 'layout'

//         let re = /\w+/g
//         let path = hash.match(re)

//         // indexController.render()

//         //设置浏览器的hash
//         location.hash = hash

//         //初始化也需要渲染DOM和页签高亮
//         this.renderDom(path[0])
//     }

//     handleHashchange() {

//         let re = /\w+/g
//         let hash = location.hash.substr(1).match(re)[0]

//         //渲染DOM
//         this.renderDom(hash)
//     }

//     renderDom(hash) {
//         let pageControllers = {
//             layoutController,
//             loginController,
//             registerController
//         }
//         pageControllers[hash + 'Controller'].render()
//     }

// }

// new Router()