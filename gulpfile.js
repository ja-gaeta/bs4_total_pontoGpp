var // módulos:
  gulp = require('gulp'),
  newer = require('gulp-newer'),
  imagemin = require('gulp-imagemin'),
  htmlclean = require('gulp-htmlclean'),
  plumber = require('gulp-plumber'),
  stripdebug = require('gulp-strip-debug'),
  uglify = require('gulp-uglify'),
  sass = require('gulp-sass'),
  browserSync = require('browser-sync').create();

// Modo de desenvolvimento?
devBuild = true; // Mude para false para produção

// Pastas
pasta = {
  src: 'src/',
  build: 'build/'
};

// Inicializa Browsersync
gulp.task('serve', function() {
  browserSync.init({
    server: './build',
    notify: false
  });
});

// Processamento das imagens
gulp.task('imagens', function() {
  var out = pasta.build + 'img/';
  return gulp
    .src(pasta.src + 'img/**/*')
    .pipe(newer(out))
    .pipe(imagemin({ optimizationLevel: 5 }))
    .pipe(gulp.dest(out));
});

// Processamento HTML
gulp.task('html', ['imagens'], function() {
  var out = pasta.build,
    page = gulp.src(pasta.src + 'html/**/*').pipe(newer(out));

  // Comprime o código para produção
  if (!devBuild) {
    page = page.pipe(htmlclean());
  }

  return page.pipe(gulp.dest(out));
});

// Processamento dos arquivos JavaScript
gulp.task('js', function() {
  var jsbuild = gulp
    .src([
      pasta.src + 'js/**/*',
      'node_modules/jquery/dist/jquery.js',
      'node_modules/popper.js/dist/umd/popper.js',
      'node_modules/bootstrap/dist/js/bootstrap.js'
    ])
    .pipe(plumber());
  if (!devBuild) {
    jsbuild = jsbuild.pipe(stripdebug()).pipe(uglify());
  }
  return jsbuild.pipe(gulp.dest(pasta.build + 'js/'));
  // .pipe(browserSync.stream());
});

// Processamento do CSS
gulp.task('css', ['imagens'], function() {
  return gulp
    .src([
      pasta.src + 'scss/main.scss',
      'node_modules/bootstrap/scss/bootstrap.scss'
    ])
    .pipe(
      sass({
        outputStyle: devBuild ? 'nested' : 'compressed',
        imagePath: 'img/',
        precision: 3,
        errLogToConsole: true
      })
    )
    .pipe(gulp.dest(pasta.build + 'css/'));
});

// Copia pasta fonts para a pasta build
gulp.task('fonts', function() {
  return gulp
    .src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest(pasta.build + 'fonts/'));
});

// Copia o CSS de Font Awesome para a pasta build
gulp.task('fa', function() {
  return gulp
    .src('node_modules/font-awesome/css/font-awesome.min.css')
    .pipe(gulp.dest(pasta.build + 'css/'));
});

// Execução de todas as tarefas criadas acima
gulp.task('run', ['serve', 'html', 'css', 'js', 'fa', 'fonts']);

// Monitoramento de modificações
gulp.task('watch', function() {
  // Modificações em arquivos html
  gulp
    .watch(pasta.src + 'html/**/*', ['html'])
    .on('change', browserSync.reload);

  // Modificações em imagens
  gulp
    .watch(pasta.src + 'img/**/*', ['imagens'])
    .on('change', browserSync.reload);

  // Modificações em arquivos javascript
  gulp.watch(pasta.src + 'js/**/*', ['js']).on('change', browserSync.reload);

  // Modificações em arquivos css
  gulp.watch(pasta.src + 'scss/**/*', ['css']).on('change', browserSync.reload);
});

// Tarefa default
gulp.task('default', ['run', 'watch']);
