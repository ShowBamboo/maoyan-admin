import chatView from '../views/chat.art'

export const chat = (req, res, next) => {
    res.render(chatView())

    var socket = io.connect('http://10.9.49.206:8082');
    const content = document.getElementById('content')
    document.querySelector('#submit')
        .addEventListener('click', function () {
            var msg2 = msg.value
            socket.emit('receive', msg2)
            msg.value = ''
            content.innerHTML += msg2 + '<br/>'
        }, false)

    socket.on('message', function (msg) {
        content.innerHTML += msg + '<br/>'
    })
}