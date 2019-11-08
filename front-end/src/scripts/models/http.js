import store from 'store'

export default {
    get({
        url,
        type = 'GET',
        data = {}
    }) {
        let token = store.get('token')
        return $.ajax({
            type: type,
            url: url,
            data: data,
            headers: {
                'X-Access-Token': token
            },
            success: function (result, textStatus, jqXHR) {
                let token = jqXHR.getResponseHeader('x-access-token')
                if (token) {
                    store.set('token', token)
                }
                return result
            }
        })
    }
}