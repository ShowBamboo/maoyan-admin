import movieView from '../views/movie.art'
import movieAddView from '../views/movie-add.art'
import movieUpdateView from '../views/movie-update.art'
import http from '../models/http'
import store from 'store'
import _ from 'lodash'

function handleAddClick(res) {
    $('body').off().on('click', '#btn-add', () => {
        res.go('/movie_add')
    })
}

function handleUpdateClick(res) {
    $('body').on('click', '.btn-update', function () {
        let id = $(this).attr('data-id')
        res.go('/movie_update', {
            id
        })
    })
}

function handleDeleteClick(req, res) {
    $('body').on('click', '.btn-delete', async function () {
        let id = $(this).attr('data-id')
        let tempPoster = $(this).attr('data-img')
        let result = await http.get({
            url: '/api/movies',
            data: {
                id,
                tempPoster
            },
            type: 'DELETE'
        })

        if (result.ret) {
            res.go('/movie_list/' + (req.params.page || 1) + '?r=' + (new Date().getTime()))
        }

    })
}

function handleSearch(res) {
    $('body').on('keyup', '#search', async (e) => {
        if (e.keyCode === 13) {
            let keyword = e.target.value

            if (keyword === '') {
                res.go('/movie_list/1?r=' + (new Date().getTime()))
                return
            }

            let result = await http.get({
                url: '/api/movies/search',
                data: {
                    keyword
                },
                type: 'GET'
            })

            if (result.ret) {
                res.render(movieView({
                    list: result.data.list,
                    from: 'search'
                }))
            }

        }
    })
}

function handlePageNumberClick(req, res, obj, type, pageCount) {
    if (type) {
        let page = ~~req.params.page
        //上一页
        if (type === 'previous' && page > 1) {
            res.go('/movie_list/' + (page - 1))
        }
        //下一页
        if (type === 'next' && page < pageCount.length) {
            if (page === 0) {
                res.go('/movie_list/2')
            } else {
                res.go('/movie_list/' + (page + 1))
            }
        }
    } else {
        res.go('/movie_list/' + ~~$(obj).text())
    }
}
var now
export const list = async (req, res, next) => {
    let count = now || 3

    let currentPage = ~~req.params.page || 1

    let result = await http.get({
        url: '/api/movies',
        type: 'GET',
        data: {
            start: (currentPage - 1) * count,
            count
        }
    })

    let pageCount = _.range(1, Math.ceil(result.data.total / count) + 1)

    if (result.ret) {
        //自动跳转到上一页
        if (result.data.list.length === 0 && currentPage > 1) {
            res.go('/movie_list/' + (currentPage - 1))
            return
        }
        let {
            list,
            total
        } = result.data
        res.render(movieView({
            list,
            total,
            pageCount,
            currentPage,
            from: 'list',
            start: (currentPage - 1) * count,
            count
        }))

        //设置每页显示的数量
        $('#page-count').val(count)
        $('#page-count').change(function (e) {
            now = ~~$(this).val()
            res.go('/movie?r=' + (new Date().getTime()))
        });

        handleAddClick(res)
        handleUpdateClick(res)
        handleDeleteClick(req, res)
        handleSearch(res)

        //点击翻页
        $('#box-footer .page-number').on('click', function () {
            handlePageNumberClick(req, res, this)
        })
        //上一页
        $('#box-footer .previous').on('click', function () {
            handlePageNumberClick(req, res, this, 'previous')
        })
        //下一页
        $('#box-footer .next').on('click', function () {
            handlePageNumberClick(req, res, this, 'next', pageCount)
        })

        //按评分排序
        var p = 1
        $('#score-sort').on('click', function () {
            let oTab = $('#datatable')[0]

            let arr = [];
            for (let i = 0; i < oTab.tBodies[0].rows.length; i++) {
                arr[i] = oTab.tBodies[0].rows[i];
            }

            arr.sort(function (tr1, tr2) {
                let n1 = parseFloat(tr1.cells[3].textContent);
                let n2 = parseFloat(tr2.cells[3].textContent);
                return p * n1 - p * n2;
            })

            for (let i = 0; i < arr.length; i++) {
                oTab.tBodies[0].appendChild(arr[i]);
            }
            p *= -1
        })

    } else {
        res.go('/home')
    }
}

export const add = async (req, res, next) => {
    res.render(movieAddView())

    //表单验证
    let onoff1 = false
    let onoff2 = false
    let onoff3 = false
    let onoff4 = false

    $('#movieName').blur(function () {
        if ($(this).val() == '') {
            $('.movieName .email-error').css('display', 'block')
            $('.movieName .email-right').css('display', 'none')
        } else {
            onoff1 = true
            $('.movieName .email-right').css('display', 'block')
            $('.movieName .email-error').css('display', 'none')
        }
    })

    $('#score').blur(function () {
        if ($(this).val() == '') {
            $('.score .email-error').css('display', 'block')
            $('.score .email-right').css('display', 'none')
        } else {
            onoff2 = true
            $('.score .email-right').css('display', 'block')
            $('.score .email-error').css('display', 'none')
        }
    })

    $('#actor').blur(function () {
        if ($(this).val() == '') {
            $('.actor .email-error').css('display', 'block')
            $('.actor .email-right').css('display', 'none')
        } else {
            onoff3 = true
            $('.actor .email-right').css('display', 'block')
            $('.actor .email-error').css('display', 'none')
        }
    })

    $('#showInfo').blur(function () {
        if ($(this).val() == '') {
            $('.showInfo .email-error').css('display', 'block')
            $('.showInfo .email-right').css('display', 'none')
        } else {
            onoff4 = true
            $('.showInfo .email-right').css('display', 'block')
            $('.showInfo .email-error').css('display', 'none')
        }
    })

    //提交添加的表单数据
    // $('#btn-add').on('click', async () => {
    //     if (onoff1 && onoff2 && onoff3 && onoff4) {
    //         let data = $('.forms-sample').serialize()

    //         let result = await http.get({
    //             url: '/api/movies',
    //             type: 'POST',
    //             data
    //         })

    //         if (result.ret) {
    //             alert(result.data.message)
    //             $('.forms-sample')[0].reset()
    //         } else {
    //             alert(result.data.message)
    //         }
    //     }
    // })

    $('#btn-check').on('click', () => {
        if (onoff1 && onoff2 && onoff3 && onoff4) {
            $('#btn-add').removeAttr("disabled")
        }
    })

    let token = store.get('token')
    $('.forms-sample').ajaxForm({
        headers: {
            'X-Access-Token': token
        },
        resetForm: true
    })

    $('#btn-back').on('click', () => {
        res.go('/movie')
    })

}

export const update = async (req, res, next) => {
    let id = req.body.id
    let result = await http.get({
        url: '/api/movies/findOne',
        data: {
            id
        },
        type: 'GET'
    })

    //回填数据
    res.render(movieUpdateView({
        item: result.data
    }))

    //提交更改的表单数据
    // $('#btn-update').on('click', async () => {
    //     let data = $('.forms-sample').serialize()
    //     let result = await http.get({
    //         url: '/api/movies',
    //         data: data + '&id=' + id,
    //         type: 'PATCH'
    //     })

    //     if (result.ret) {
    //         res.go('/movie')
    //     } else {
    //         alert(result.data.message)
    //     }
    // })

    let token = store.get('token')
    $('.forms-sample').ajaxForm({
        headers: {
            'X-Access-Token': token
        },
        resetForm: true,
        dataType: 'json',
        url: '/api/movies',
        method: 'PATCH',
        success: (result) => {
            if (result.ret) {
                res.back()
            } else {
                alert(result.data.message)
            }
        }
    })

    $('#update-back').on('click', () => {
        res.back()
    })

}