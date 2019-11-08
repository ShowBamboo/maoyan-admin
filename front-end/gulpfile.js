const path = require('path')
const {
    src,
    dest,
    series,
    parallel,
    watch
} = require('gulp')
const connect = require('gulp-connect')
const sass = require('gulp-sass')
const webpack = require('webpack-stream')
const proxy = require('http-proxy-middleware')

// copyhtml
function copyhtml() {
    return src('./src/*.html')
        .pipe(dest('./dev/'))
        .pipe(connect.reload())
}

// copylibs
function copylibs() {
    return src('./src/libs/**/*')
        .pipe(dest('./dev/libs'))
}

// copyassets
function copyassets() {
    return src('./src/assets/**/*')
        .pipe(dest('./dev/assets'))
}

// 编译sass
function packSCSS() {
    return src(['./src/styles/**/*.scss', '!./src/styles/yo/**/*.scss'])
        .pipe(sass().on('error', sass.logError))
        .pipe(dest('./dev/styles/'))
        .pipe(connect.reload())
}

// JS模块化
function packJS() {
    return src('./src/scripts/app.js')
        .pipe(webpack({
            mode: 'development',
            entry: './src/scripts/app.js',
            output: {
                path: path.resolve(__dirname, './dev'),
                filename: 'app.js'
            },
            module: {
                rules: [{
                        test: /\.html$/,
                        loader: 'string-loader'
                    },
                    {
                        test: /\.art$/,
                        loader: "art-template-loader"
                    }, {
                        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                        loader: 'url-loader'
                    }
                ]
            }
        }))
        .pipe(dest('./dev/scripts'))
        .pipe(connect.reload())
}

// 启动server
function gulpServer() {
    return connect.server({
        name: 'Dist App',
        root: './dev',
        port: 8000,
        host: '10.9.49.206',
        livereload: true,
        middleware: () => {
            return [
                proxy('/api', {
                    target: 'http://10.9.49.206:3000',
                    changeOrigin: true,
                    // pathRewrite: {
                    //     '^/api': ''
                    // }
                })
            ]
        }
    })
}

// watch
function watchFiles() {
    watch('./src/*.html', series(copyhtml))
    watch('./src/libs/*', series(copylibs))
    watch('./src/**/*', series(packJS))
    watch('./src/**/*.scss', series(packSCSS))
    watch('./src/assets/*', series(copyassets))
}

exports.default = series(parallel(copyhtml, copyassets, copylibs, packSCSS, packJS), parallel(gulpServer, watchFiles))