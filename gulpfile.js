const {
    src,
    dest,
    series,
    parallel,
    watch
} = require('gulp');

function defaultTask(cb) {
    console.log('hello gulp4');
    cb();
}

exports.do = defaultTask

// =============================================  src / dest  ============================================= //

const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const fileinclude = require('gulp-file-include');

function sassstyle(){
    // return src("./sass/style.scss").pipe(dest("./dist/css"));
    // 複製資料夾

    return src("./sass/style.scss","./css/reset.css")
    // 追溯開始
    .pipe(sourcemaps.init())

    // 編譯sass
    .pipe(sass.sync().on('error', sass.logError))

    // 追溯結束
    .pipe(sourcemaps.write())
    // CSS壓縮 網站確定上線才壓縮
    // .pipe(cleanCSS())
    // 跨瀏覽器
    .pipe(
        autoprefixer({
            cascade: false,
        })
    )
    // 複製並建立到指定資料夾
    .pipe(dest("./dist/css"));
}
exports.style = sassstyle;

// =============================================　監看檔案(有修改就變更)
function watchTask() {
    watch(['./sass/style.scss'], sassstyle);
    watch(['./*.html', './layout/ *.html'], html)
}
exports.w = watchTask;

// html template
function html() {
    return src(['./*.html', '!./test.html', '!./user_test.html']) //排除的html寫在這裡
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(dest('./dist/'));
}
exports.t = html;

// =============================================　壓縮圖片
const imagemin = require('gulp-imagemin');
function img() {
    return src('./img/**/*.*')
        .pipe(imagemin([
            // 壓縮品質      quality越低 -> 壓縮越大 -> 品質越差 
            imagemin.mozjpeg({ quality: 70, progressive: true })
        ]))
        .pipe(dest('dist/img'))
}

exports.p = img;

// =============================================　沒有壓縮的圖片，開發用(純搬家)
function img_orgin() {
    return src('./img/*.*').pipe(dest('dist/img'))
}

// =============================================　壓縮JS檔　JSMIN
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

function ugjs() {
    return src('js/*.js')
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(dest('dist/js'))
}

exports.jsmin = ugjs;

// =============================================　降轉js es6 > es5
const babel = require('gulp-babel');

function babel5() {
    return src('js/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(dest('dist/js'));
}
exports.js = babel5;

//=============================================　清除舊檔案
const clean = require('gulp-clean');

function clear() {
    // 不去讀檔案結構，增加刪除效率  / allowEmpty : 允許刪除空的檔案
    return src('dist', { read: false, allowEmpty: true })
        //強制刪除檔案 
        .pipe(clean({ force: true }));
}
exports.c = clear;

// =============================================　瀏覽器同步
const browserSync = require('browser-sync');
const reload = browserSync.reload;


function browser(done) {
    browserSync.init({
        server: {
            baseDir: "./dist",
            index: "index.html"
        },
        port: 3000
    });
    watch(['./sass/style.scss'], sassstyle).on("change", reload);
    watch(['./*.html', './layout/ *.html'], html).on("change", reload);
    watch(['./img/*.*', './img/**/*.*'], img_orgin).on("change", reload);
    watch(['./js/*.js', './js/**/*.js'], ugjs).on("change", reload);
    done();
}

exports.default = browser;

// 開發用
exports.dev = series(parallel(html, sassstyle, img_orgin, ugjs), browser)

//上線用
exports.online = series(clear, parallel(html, sassstyle, img, babel5))