import loginView from '../views/login.art'

import httpModel from '../models/http'

export const login = (req, res, next) => {
    res.render(loginView())

    //点击登录提交数据
    $('#btn-login').on('click', async () => {
        let data = $('.form-horizontal').serialize()

        let result = await httpModel.get({
            url: '/api/users/login',
            data,
            type: 'POST'
        })

        handleSubmitSuccess(result)
    })

    //点击注册
    $('#register').on('click', function () {
        // location.hash = '/register'
        res.go('/register')
    })

    //点击忘记密码
    $('#reset').on('click', function () {
        // location.hash = '/reset'
        res.go('/reset')
    })

    function handleSubmitSuccess(result) {
        console.log(result.ret);
        //存下返回的结果
        $.cookie('ret', result.ret)
        $.cookie('username', result.data.username)

        if (result.ret == true) {
            $('.card-title').html(result.data.message)
            setTimeout(() => {
                // location.hash = '/home'
                res.go('/home')
                window.location.reload()
            }, 2000);
        } else {
            $('.card-title').html(result.data.message)
            $('#username').val('')
            $('#password').val('')
        }
    }
}


// class Login {
//     constructor() {
//         // this.render()
//     }

//     render() {
//         $('.layout').html(loginView())

//         //点击登录提交数据
//         $('#btn-login').on('click', this.handleSubmit.bind(this))

//         //点击注册
//         $('#register').on('click', function () {
//             location.hash = 'register'
//         })
//     }

//     async handleSubmit() {
//         let data = $('.form-horizontal').serialize()

//         let result = await httpModel.login({
//             url: '/api/users/login',
//             data,
//             type: 'POST'
//         })

//         this.handleSubmitSuccess(result)
//     }

//     handleSubmitSuccess(result) {
//         console.log(result.ret);
//         //存下返回的结果
//         $.cookie('ret', result.ret)
//         $.cookie('username', result.data.username)

//         if (result.ret == true) {
//             $('.card-title').html(result.data.message)
//             setTimeout(() => {
//                 location.hash = 'layout'
//             }, 3000);
//         } else {
//             $('.card-title').html(result.data.message)
//         }
//     }
// }

// export default new Login()