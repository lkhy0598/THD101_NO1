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

// =============================================  src / dest  ============================================= //

const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const fileinclude = require('gulp-file-include');

function sassstyle(){
    // return src("./sass/style.scss").pipe(dest("./dist/css"));
    // 複製資料夾

    return src("./sass/style.scss")
    // 追溯開始
    .pipe(sourcemaps.init())

    // 編譯sass
    .pipe(sass.sync().on('error', sass.logError))

    // 追溯結束
    .pipe(sourcemaps.write())

    // ============================================= CSS壓縮 網站確定上線才壓縮
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
function watchTask(){
    watch(['./sass/style.scss'],sassstyle);
    watch(['./*.html' , './layout/ *.html'], html)
}
exports.w = watchTask;

// html template
function html(){
    return src('./*.html')
    .pipe(fileinclude({
        prefix: '@@',
        basepath: '@file'
    }))
    .pipe(dest('./dist/'));
}
exports.t = html;

// =============================================　壓縮圖片
const imagemin = require('gulp-imagemin');
function img(){
    return src('./images/*.*')
    .pipe(imagemin([
         // 壓縮品質      quality越低 -> 壓縮越大 -> 品質越差 
        imagemin.mozjpeg({quality: 70, progressive: true})
    ]))
    .pipe(dest('dist/images'))
}

exports.p = img;

// =============================================　沒有壓縮的圖片，開發用(純搬家)
function img_orgin(){
    return src('./images/*.*').pipe(dest('dist/images'))
}

// =============================================　壓縮JS檔　JSMIN
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

function ugjs() {
    return src('js/*.js')
    .pipe(uglify())
    // .pipe(rename({
    //   extname: '.min.js'
    // }))
    .pipe(dest('dist/js'))
}

exports.jsmin = ugjs;
