import registerView from '../views/register.art'

import httpModel from '../models/http'

export const register = (req, res, next) => {
    res.render(registerView())

    //表单验证
    let onoff1 = false
    let onoff2 = false
    let onoff3 = false

    $('#email').blur(function () {
        let re = /^[a-z0-9_-]+@[a-z0-9]+(\.[a-z]+){1,3}$/

        if ($(this).val() != '' && re.test($(this).val()) == true) {
            onoff1 = true
            $('.email .email-right').css('display', 'block')
            $('.email .email-error').css('display', 'none')
        } else {
            $('.email .email-error').css('display', 'block')
            $('.email .email-right').css('display', 'none')
        }
    })

    $('#username').blur(function () {
        if ($(this).val() == '') {
            $('.username .email-error').css('display', 'block')
            $('.username .email-right').css('display', 'none')
        } else {
            onoff2 = true
            $('.username .email-right').css('display', 'block')
            $('.username .email-error').css('display', 'none')
        }
    })

    $('#password').blur(function () {
        if ($(this).val() == '') {
            $('.password .email-error').css('display', 'block')
            $('.password .email-right').css('display', 'none')
        } else {
            onoff3 = true
            $('.password .email-right').css('display', 'block')
            $('.password .email-error').css('display', 'none')
        }
    })

    //点击注册提交数据
    // $('#btn-register').on('click', this.handleSubmit.bind(this))
    $('#btn-register').on('click', async () => {
        if (onoff1 && onoff2 && onoff3) {

            let data = $('.form-horizontal').serialize()
            let result = await httpModel.get({
                url: '/api/users/register',
                data,
                type: 'POST'
            })

            handleSubmitSuccess(result)
        }
    })

    //点击登录
    $('#login').on('click', function () {
        // location.hash = '/login'
        res.go('/login')
    })

    function handleSubmitSuccess(result) {

        $.cookie('ret', result.ret)

        if (result.ret == true) {
            $('.card-title').html(result.data.message)
            setTimeout(() => {
                // location.hash = '/login'
                res.go('/login')
            }, 2000);
        } else {
            $('.card-title').html(result.data.message)
            $('#username').val('')
            $('#password').val('')
        }
    }
}


// class Register {
//     render() {
//         $('.layout').html(registerView())

//         //表单验证
//         let onoff1 = false
//         let onoff2 = false
//         let onoff3 = false

//         $('#email').blur(function () {
//             let re = /^[a-z0-9_-]+@[a-z0-9]+(\.[a-z]+){1,3}$/

//             if ($(this).val() != '' && re.test($(this).val()) == true) {
//                 onoff1 = true
//                 $('.email .email-right').css('display', 'block')
//                 $('.email .email-error').css('display', 'none')
//             } else {
//                 $('.email .email-error').css('display', 'block')
//                 $('.email .email-right').css('display', 'none')
//             }
//         })

//         $('#username').blur(function () {
//             if ($(this).val() == '') {
//                 $('.username .email-error').css('display', 'block')
//                 $('.username .email-right').css('display', 'none')
//             } else {
//                 onoff2 = true
//                 $('.username .email-right').css('display', 'block')
//                 $('.username .email-error').css('display', 'none')
//             }
//         })

//         $('#password').blur(function () {
//             if ($(this).val() == '') {
//                 $('.password .email-error').css('display', 'block')
//                 $('.password .email-right').css('display', 'none')
//             } else {
//                 onoff3 = true
//                 $('.password .email-right').css('display', 'block')
//                 $('.password .email-error').css('display', 'none')
//             }
//         })

//         //点击注册提交数据
//         // $('#btn-register').on('click', this.handleSubmit.bind(this))
//         $('#btn-register').on('click', async () => {
//             if (onoff1 && onoff2 && onoff3) {
//                 console.log(111);

//                 let data = $('.form-horizontal').serialize()
//                 let result = await httpModel.register({
//                     url: '/api/users/register',
//                     data,
//                     type: 'POST'
//                 })

//                 this.handleSubmitSuccess(result)
//             }
//         })

//         //点击登录
//         $('#login').on('click', function () {
//             location.hash = 'login'
//         })
//     }

//     async handleSubmit() {
//         let data = $('.form-horizontal').serialize()
//         let result = await httpModel.register({
//             url: '/api/users/register',
//             data,
//             type: 'POST'
//         })
//         this.handleSubmitSuccess(result)
//     }

//     handleSubmitSuccess(result) {
//         console.log(result)
//         $.cookie('ret', result.ret)

//         if (result.ret == true) {
//             $('.card-title').html(result.data.message)
//             setTimeout(() => {
//                 location.hash = 'login'
//             }, 3000);
//         } else {
//             $('.card-title').html(result.data.message)
//         }
//     }
// }

// export default new Register()