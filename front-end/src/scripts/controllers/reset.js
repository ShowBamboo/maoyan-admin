import resetView from '../views/forgot-password.art'

import httpModel from '../models/http'

export const reset = (req, res, next) => {
    res.render(resetView())

    //点击发送验证码
    var code = ''
    $('#send').on('click', async function () {
        //倒计时
        let count = 60;
        $(this).html(count + 's')
        $(this).css({
            'pointer-events': 'none'
        })
        let This = $(this)
        let timer = setInterval(() => {
            if (count == 0) {
                clearInterval(timer);
                This.html('获取验证码')
                This.css({
                    'pointer-events': ''
                })
            } else {
                count--
                This.html(count + 's')
            }
        }, 1000);

        let data = $('.form-horizontal').serialize()

        let result = await httpModel.get({
            url: '/api/users/mails',
            data,
            type: 'POST'
        })

        code = result.data.code
    })

    $('#reset').on('click', async function () {
        let fillCode = $('#code').val()

        if (fillCode === code) {
            let data = $('.form-horizontal').serialize()

            let result = await httpModel.get({
                url: '/api/users/reset',
                data,
                type: 'POST'
            })

            if (result.ret == true) {
                $('.card-title').html(result.data.message)
                setTimeout(() => {
                    res.go('/login')
                }, 3000);
            } else {
                $('.card-title').html(result.data.message)
                $('#code').val('')
                $('#newPassword').val('')
            }
        } else {
            $('.card-title').html('验证码不正确')
        }

    })

}