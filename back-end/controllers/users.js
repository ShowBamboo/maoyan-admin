const usersModel = require('../models/users')

const tools = require('../utils/tools')

const authMiddleware = require('../middlewares/auth')

const nodemailer = require("nodemailer")

const register = async function (req, res, next) {
    //设定返给前端的格式
    res.set('Content-Type', 'application/json;charset=utf-8')

    let {
        email,
        username,
        password
    } = req.body

    //加密密码
    let hash = await tools.hash(password)

    //存入数据
    let result = await usersModel.save({
        email,
        username,
        password: hash
    })

    console.log(result);

    //返给前端结果
    if (result) {
        res.render('success', {
            data: JSON.stringify({
                message: '注册成功,3秒后自动跳转.'
            })
        })
    } else {
        res.render('fail', {
            data: JSON.stringify({
                message: '注册失败.'
            })
        })
    }

}

const hasUsername = async function (req, res, next) {
    res.set('Content-Type', 'application/json;charset=utf-8')

    let {
        username
    } = req.body

    let result = await usersModel.findOne({
        username
    })
    console.log(result);

    if (result) {
        res.render('fail', {
            data: JSON.stringify({
                message: '用户名已被注册.'
            })
        })
    } else {
        next()
    }
}

const login = async function (req, res, next) {
    res.set('Content-Type', 'application/json;charset=utf-8')

    let {
        username,
        password
    } = req.body

    let result = await usersModel.findOne({
        username
    })

    if (result) {
        let flag = await tools.compare(password, result.password)

        if (flag) {
            let token = await tools.generateToken(username)

            res.header('X-Access-Token', token)

            res.render('success', {
                data: JSON.stringify({
                    message: '登录成功,3秒后自动跳转.',
                    username
                })
            })
        } else {
            res.render('fail', {
                data: JSON.stringify({
                    message: '用户名或密码不正确.'
                })
            })
        }
    } else {
        res.render('fail', {
            data: JSON.stringify({
                message: '用户名或密码不正确.'
            })
        })
    }
}

const isLogin = authMiddleware

const reset = async function (req, res, next) {
    res.set('Content-Type', 'application/json;charset=utf-8')

    let {
        email,
        newPassword
    } = req.body

    //加密密码
    let password = await tools.hash(newPassword)

    let result = await usersModel.update({
        email,
        password
    })

    if (result) {
        res.render('success', {
            data: JSON.stringify({
                message: '密码修改成功,3秒后自动跳转.'
            })
        })
    } else {
        res.render('fail', {
            data: JSON.stringify({
                message: '密码修改失败.'
            })
        })
    }

}

const mails = async function (req, res, next) {
    res.set('Content-Type', 'application/json;charset=utf-8')

    let email = req.body.email

    var code = ''
    for (let i = 0; i < 4; i++) {
        code += Math.floor(Math.random() * 10)
    }

    const smtpTransport = nodemailer.createTransport({
        service: '163',
        auth: {
            user: 'showbambooo@163.com',
            pass: 'qgh123' //注：此处为授权码，并非邮箱密码
        }
    });
    smtpTransport.sendMail({
        from: 'showbambooo@163.com', //发件人邮箱
        to: email, //收件人邮箱，多个邮箱地址间用','隔开
        subject: 'maoyan后台管理系统重置密码', //邮件主题
        html: `<p>尊敬的用户，此次操作的验证码为<b>${code}</b>，打死也不要告诉别人</p>`
    }, function (err, res) {
        console.log(err, res);
    });

    res.render('success', {
        data: JSON.stringify({
            message: '验证码发送成功.',
            code
        })
    })
}

module.exports = {
    register,
    hasUsername,
    login,
    mails,
    isLogin,
    reset
}