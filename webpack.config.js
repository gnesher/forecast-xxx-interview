var path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    autoprefixer = require('autoprefixer'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    argv = {},
    argvRegEx = /(--)([a-zA-Z\-]+)=([a-zA-Z\-//.:0-9]*)/,
    base = '/',
    _ = require('lodash');

require('es6-promise').polyfill();

// parse argv
for(var i = 0; i < process.argv.length; i++) {
    var argument = process.argv[i].match(argvRegEx);

    if(argument) {
        argv[argument[2]] = argument[3];
    }
}

// ...unless we provide an override
if (argv['base-href']) {
    base = argv['base-href'];
}

var includedFiles = [
    path.resolve(__dirname, "src")
    ];

var preloaders = [
    {
        test: /\.scss$/,
        loader: 'sasslint',
        include: includedFiles
    },
    {
        test: /\.js$/,
        include: includedFiles,
        loader: 'eslint-loader',
        exclude: /addStyles.js|css-base.js/
    }
];

if (argv.lint && argv.lint === 'false') {
    preloaders = [];
}

const envVariables = _.mapValues(require(`${path.resolve(__dirname, "env")}/${process.env.NODE_ENV}.js`), JSON.stringify);

module.exports = {
    cache: true,
    entry: {
        main: ['babel-polyfill',
        './src/main.js'],
        styles: './src/styles.js'
    },
    output: {
        path: './dist',
        publicPath: JSON.parse(envVariables.PUBLIC_PATH),
        filename: '[name].entry.js'
    },
    resolve: {
        root: [
            path.resolve('./node_modules'),
            path.resolve('./src')
        ],
        alias: {
            ASSETS: 'assets',
            COMPONENTS: 'components',
            CONSTANTS: 'constants',
            HELPERS: 'helpers',
            MOCKS: 'mocks',
            RESOURCES: 'resources',
            STYLESHEETS: 'stylesheets',
            VIEWS: 'views',
            FILTERS: 'filters'
        }
    },
    module: {
        preLoaders: preloaders,
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                include: includedFiles
            }, {
                test: /\.scss$/,
                loaders: ['style', 'css?sourceMap', 'postcss-loader', 'resolve-url', 'sass?sourceMap']
            }, {
                test: /\.css$/,
                loaders: ['style', 'css?sourceMap']
            }, {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file?name=images/[name].[hash].[ext]'
            }, {
                test: /\.(woff|otf|ttf|woff2|eot)$/,
                loader: 'file?name=fonts/[name].[hash].[ext]'
            }, {
                test: /\.html$/,
                loader: 'raw'
            }, {
                test: /\.json$/,
                loader: 'json-loader'
            },
        ]
    },
    // example: if you wish to apply custom babel options
    // instead of using vue-loader's default:
    babel: {
        presets: ['es2015', 'stage-0'],
        plugins: ['transform-runtime']
    },

    jscs: {
        emitErrors: false,
        failOnHint: false
    },

    sasslint: {
        configFile: '.sass-lint.yml'
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'Template',
            hash: true,
            base: base,
            template: 'src/index.js',
            inject: 'body',
            minify: {
                collapseWhitespace: true,
                removeAttributeQuotes: true,
            }
        }),
        new webpack.ProvidePlugin({
            'Promise': 'es6-promise',
        }),
    ],

    postcss: function () {
        return [autoprefixer];
    }
}

// some constants for angular (frontend config variables)
module.exports.plugins.push(
    new webpack.DefinePlugin(envVariables)
);

if (!process.env.NODE_ENV.startsWith('local')) {
    module.exports.plugins.push(
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        })
    );

    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    );

    module.exports.plugins.push(
        new webpack.optimize.OccurenceOrderPlugin()
    );
}
else {
    module.exports.devtool = 'inline-source-map';
}
