/**
 * Dependencies
 * -----------------------------------------------------------------------------
 */

const gulp = require("gulp");
const gulpLoadPlugins = require("gulp-load-plugins");
const browserSync = require("browser-sync").create();
const del = require("del");
const mainBowerFiles = require("main-bower-files");
const changedInPlace = require("gulp-changed-in-place");
// plugins load
const $ = gulpLoadPlugins();
const htmlmin = require('gulp-htmlmin');

// auto reload the browser
const reloadStream = browserSync.reload;
const reload = done => {
	browserSync.reload();
	done();
};

// catch stream errors
const gulpSrc = gulp.src;

gulp.src = function onError(...args) {
	return (
		gulpSrc
			.apply(gulp, args)
			// Catch errors
			.pipe(
				$.plumber(function onError(error) {
					$.util.log($.util.colors.red(`Error (${error.plugin}):${error.message}`));
					this.emit("end");
				})
			)
	);
};

// package data
const pkg = require("./package.json");

// for templatemonster theme
const isTemplatemonsterTheme = false;

// if production mode is active. -> false: developement mode
const isProduction = true;

const isDeployOnPublicWeb = false;

// if minified file included in production
const minifiedFileInclude = true;

// Project Path
const srcRoot = "src";
const src = {
	views: `${srcRoot}/pug`,
	styles: `${srcRoot}/sass`,
	stylesVendors: `${srcRoot}/sass/vendors`,
	scripts: `${srcRoot}/js`,
	scriptsVendors: `${srcRoot}/js/vendors`,
	images: isTemplatemonsterTheme ? `${srcRoot}/img` : `${srcRoot}/img`,
	fonts: `${srcRoot}/fonts`,
};

// Distribution Path
const tmpRoot = ".tmp";
const distRoot = isTemplatemonsterTheme ? `${pkg.name}-v${pkg.version}` : "docs";
const dist = {
	views: isProduction ? `${distRoot}` : `${tmpRoot}`,
	styles: isProduction ? `${distRoot}/assets/css` : `${tmpRoot}/assets/css`,
	stylesVendors: isProduction ? `${distRoot}/assets/css/vendors` : `${tmpRoot}/assets/css/vendors`,
	scripts: isProduction ? `${distRoot}/assets/js` : `${tmpRoot}/assets/js`,
	scriptsVendors: isProduction ? `${distRoot}/assets/js/vendors` : `${tmpRoot}/assets/js/vendors`,
	images: isProduction ? `${distRoot}/assets/img` : `${tmpRoot}/assets/img`,
	bowerPackages: isProduction ? `${distRoot}/assets/vendors` : `${tmpRoot}/assets/vendors`,
	fontsPackages: isProduction ? `${distRoot}/assets/fonts` : `${tmpRoot}/assets/fonts`,
};

/**
 * Builds
 * ================================================================
 */
// bower packages copy

gulp.task("bower", function() {
	// mainBowerFiles is used as a src for the task, usually you pipe stuff through
	// a task
	return gulp.src(mainBowerFiles(), { base: "bower_components" }).pipe(gulp.dest(dist.bowerPackages));
});

// html

gulp.task("views", () =>
	gulp
		.src(`${src.views}/*.pug`)
		.pipe(changedInPlace({firstPass:true, howToDetermineDifference: "modification-time" }))
		.pipe(
			$.pug({
				pretty: (isTemplatemonsterTheme && isProduction) || !isTemplatemonsterTheme ? true : false,
				data: {
					isProduction: isProduction,
					isTemplatemonsterTheme: isTemplatemonsterTheme
				}
			})
		)
		.pipe(
			$.if(
				(isTemplatemonsterTheme && isProduction) || !isTemplatemonsterTheme,
				$.prettier({ printWidth: 300, tabWidth: 4, useTabs: true })
			)
		)
		.pipe(
			$.if(
				isDeployOnPublicWeb,
				htmlmin({ collapseWhitespace: true,keepClosingSlash:true,trimCustomFragments:true,useShortDoctype:true,collapseInlineTagWhitespace:true })
			)
		)
		.pipe(gulp.dest(`${dist.views}`))
		.pipe(reloadStream({ stream: true }))
);

// styles

gulp.task("style", () => {
	let stream = gulp
		.src(`${src.styles}/*.scss`)
		.pipe($.sass())
		.pipe($.sass.sync({ outputStyle: "expanded", precision: 6, includePaths: ["."] }).on("error", $.sass.logError))
		.pipe($.autoprefixer());

	if (isProduction) {
		if (minifiedFileInclude) {
			stream = stream
				.pipe(gulp.dest(dist.styles))
				.pipe($.cleanCss())
				.pipe($.rename({ suffix: ".min" }));
		}
	} else {
		stream = stream
			.pipe($.cleanCss())
			.pipe($.rename({ suffix: ".min" }))
			.pipe($.size({ showFiles: true }));
	}
	stream = stream.pipe(gulp.dest(dist.styles)).pipe(reloadStream({ stream: true }));
	return stream;
});


gulp.task("style:vendors", () => {
	let stream = gulp
		.src(`${src.stylesVendors}/*.scss`)
		.pipe($.sass())
		.pipe($.sass.sync({ outputStyle: "expanded", precision: 6, includePaths: ["."] }).on("error", $.sass.logError))
		.pipe($.autoprefixer());

	if (isProduction) {
		if (minifiedFileInclude) {
			stream = stream
				.pipe(gulp.dest(dist.stylesVendors))
				.pipe($.cleanCss())
				.pipe($.rename({ suffix: ".min" }));
		}
	} else {
		stream = stream
			.pipe($.cleanCss())
			.pipe($.rename({ suffix: ".min" }))
			.pipe($.size({ showFiles: true }));
	}
	stream = stream.pipe(gulp.dest(dist.stylesVendors)).pipe(reloadStream({ stream: true }));
	return stream;
});

gulp.task("styles", gulp.series("style",  "style:vendors"));

// scripts

gulp.task("script", () => {
	let stream = gulp
		.src(`${src.scripts}/*.js`)
		.pipe($.include())
		.pipe(
			$.babel({
				presets: [
					[
						"env",
						{
							loose: true,
							modules: false
						}
					]
				] //'use-strict' deleted
			})
		);

	if (isProduction) {
		if (minifiedFileInclude) {
			stream = stream
				.pipe(gulp.dest(dist.scripts))
				.pipe($.uglify())
				.pipe($.rename({ suffix: ".min" }));
		}
	} else {
		stream = stream
			.pipe($.uglify())
			.pipe($.rename({ suffix: ".min" }))
			.pipe($.size({ showFiles: true }));
	}
	stream = stream.pipe(gulp.dest(dist.scripts)).pipe(reloadStream({ stream: true }));
	return stream;
});

gulp.task("script:vendors", () => {
	let stream = gulp
		.src(`${src.scriptsVendors}/**/*.js`)
		.pipe($.include())
		.pipe(
			$.babel({
				presets: [
					[
						"env",
						{
							loose: true,
							modules: false
						}
					]
				] //'use-strict' deleted
			})
		);

	if (isProduction) {
		if (minifiedFileInclude) {
			stream = stream
				.pipe(gulp.dest(dist.scriptsVendors))
				.pipe($.uglify())
				.pipe($.rename({ suffix: ".min" }));
		}
	} else {
		stream = stream
			.pipe($.uglify())
			.pipe($.rename({ suffix: ".min" }))
			.pipe($.size({ showFiles: true }));
	}
	stream = stream.pipe(gulp.dest(dist.scriptsVendors)).pipe(reloadStream({ stream: true }));
	return stream;
});

gulp.task("scripts", gulp.series("script", "script:vendors"));

// images

gulp.task("images", () => {
	let stream;
	stream = gulp
		.src(`${src.images}/**/*`)
		.pipe(changedInPlace({firstPass:true, howToDetermineDifference: "modification-time" }))
		.pipe($.newer(`${dist.images}`))
		.pipe(
			$.imagemin([
				$.imagemin.gifsicle({ interlaced: true }),
				$.imagemin.mozjpeg({ progressive: true }),
				$.imagemin.optipng({ optimizationLevel: 5 }),
				$.imagemin.svgo({
					plugins: [
						{
							removeViewBox: false
						},
						{
							cleanupIDs: false
						}
					]
				})
			])
		)
		.pipe(gulp.dest(`${dist.images}`));

	stream = stream.pipe(reloadStream({ stream: true }));
	return stream;
});

// fonts

gulp.task("fonts", function() {
	// mainBowerFiles is used as a src for the task, usually you pipe stuff through
	// a task
	return gulp.src(`${src.fonts}/**/*`).pipe(gulp.dest(dist.fontsPackages));
});

// datas


/**
 * Clean
 * ================================================================
 */

gulp.task("clean", () => del(`${distRoot}`, { force: true }));

/**
 * Build Theme
 * ================================================================
 */

gulp.task("zip", () =>
	gulp
		.src(`${distRoot}/**/*`)
		.pipe($.zip(`${distRoot}.zip`))
		.pipe(gulp.dest("./"))
);

if (isTemplatemonsterTheme && isProduction) {
	gulp.task(
		"build",
		gulp.series("clean", "bower", "views", "styles", "scripts", "images", "fonts", "zip")
	);
} else {
	gulp.task("build", gulp.series("clean", "bower", "views", "styles", "scripts", "images", "fonts",));
}

/**
 * Serve
 * ================================================================
 */

// 'gulp serve' - open up theme in your browser and watch for changes
gulp.task("serve", done => {
	browserSync.init({ notify: true, ui: false, port: 1888, server: dist.views });

	done();

	gulp.watch(`${src.views}/**/*.pug`, gulp.series("views", reload));
	gulp.watch(
		[`${src.styles}/**/*.scss`, `!${src.stylesColors}/**/*.scss`, `!${src.stylesVendors}/**/*.scss`],
		gulp.series("style", reload)
	);
	gulp.watch(`${src.stylesVendors}/**/*.scss`, gulp.series("style:vendors", reload));
	gulp.watch([`${src.scripts}/**/*.js`, `!${src.scriptsVendors}/**/*.js`], gulp.series("script", reload));
	gulp.watch(`${src.scriptsVendors}/**/*.js`, gulp.series("script:vendors", reload));
	gulp.watch(`${src.images}/**/*`, gulp.series("images", reload));
	gulp.watch(`${src.fonts}/**/*`, gulp.series("fonts", reload));
});

// 'gulp' - build and serves the theme
gulp.task("default", gulp.series("build", "serve"));
