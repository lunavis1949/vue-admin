const path = require('path');
module.exports = {
  // 项目部署的基础路径
  // 我们默认假设你的应用将会部署在域名的根部，
  // 比如 https://www.my-app.com/
  // 如果你的应用时部署在一个子路径下，那么你需要在这里
  // 指定子路径。比如，如果你的应用部署在
  // https://www.foobar.com/my-app/
  // 那么将这个值改为 `/my-app/`
  // publicPath: '/Reader/dist/',　　/*这个是我存放在github在线预览的Reader项目*/
  publicPath: process.env.NODE_ENV === 'production' ? '' : '/',

  // 将构建好的文件输出到哪里（或者说将编译的文件）
  // outputDir: 'dist',
  outputDir: process.env.NODE_ENV === 'production' ? 'dist' : 'devdist',

  // 是否在保存的时候使用 `eslint-loader` 进行检查。
  // 有效的值：`ture` | `false` | `"error"`
  // 当设置为 `"error"` 时，检查出的错误会触发编译失败。
  lintOnSave: false,

  // 调整内部的 webpack 配置。
  // 查阅 https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli/webpack.md
  chainWebpack: (config) => {

  },
  configureWebpack: (config) => {
    config.resolve= {
      extensions: [".js", ".vue", ".json"], //文件优先解析后缀名顺序
          alias: {
        "@": path.resolve(__dirname, "./src"),
            "@c": path.resolve(__dirname, "./src/components"),
            "@v": path.resolve(__dirname, "./src/views"),
            "@u": path.resolve(__dirname, "./src/utils"),
            "@s": path.resolve(__dirname, "./src/service")
      } // 别名配置
    }
  },

  // 是否为生产环境构建生成 source map？
  productionSourceMap: false,

  // 放置静态资源的地方 (js/css/img/font/...)
  assetsDir: '',

  // CSS 相关选项
  css: {
    // 将组件内的 CSS 提取到一个单独的 CSS 文件 (只用在生产环境中)
    // 也可以是一个传递给 `extract-text-webpack-plugin` 的选项对象
    //是否开启css分离插件 ExtractTextPlugin
    extract: true,

    // 是否开启 CSS source map？
    sourceMap: false,

    // 为预处理器的 loader 传递自定义选项。比如传递给
    // sass-loader 时，使用 `{ sass: { ... } }`。
    loaderOptions: {
      sass: {
        prependData: '@import "./src/styles/main.scss";'
      }
    },

    // 为所有的 CSS 及其预处理文件开启 CSS Modules。
    // 这个选项不会影响 `*.vue` 文件。
    requireModuleExtension: false
  },

  // 在生产环境下为 Babel 和 TypeScript 使用 `thread-loader`
  // 在多核机器下会默认开启。
  parallel: require('os').cpus().length > 1,

  // PWA 插件的选项。
  // 查阅 https://github.com/vuejs/vue-cli/tree/dev/packages/@vue/cli-plugin-pwa
  pwa: {},

  // 配置 webpack-dev-server 行为。
  devServer: {
    open: false,
    // open: process.platform === 'darwin',  //编译完成后是否打开网页 false
    host: '0.0.0.0',        // 指定使用地址 0。0。0。0代表可被外界访问
    port: 8080,
    https: false,   //编译失败时刷新页面
    hot: true,    //开启热加载
    hotOnly: false,
    // proxy: null,
    // 查阅 https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli/cli-service.md#配置代理
    proxy: {
        '/devapi': {
            target: 'http://test123.com/api',    //访问的服务器地址
            changeOrigin: true,  //开启跨域
            secure: false,
            // ws: true,
            pathRewrite: {
                '^/devapi': ''   // 请求数据路径别名,这里是注意将static/mock放入public文件夹
            }
        }
    },
    overlay: { //全屏模式下是否显示脚本错误
      warnings: true,
      errors: true
    },
    before: app => {

    }
  },

  // 用于多页配置，默认是 undefined
  // pages: {
  //     index: {
  //         // 入口文件
  //         entry: 'src/main.js',　　/*这个是根入口文件*/
  //         // 模板文件
  //         template: 'public/index.html',
  //         // 输出文件
  //         filename: 'index.html',
  //         // 页面title
  //         title: 'Index Page'
  //     },
  //     // 简写格式
  //     // 模板文件默认是 `public/subpage.html`
  //     // 如果不存在，就是 `public/index.html`.
  //     // 输出文件默认是 `subpage.html`.
  //     subpage: 'src/main.js'　　　　/*注意这个是*/
  // },


  // 使用带有浏览器内编译器的完整构建版本
  // 查阅 https://cn.vuejs.org/v2/guide/installation.html#运行时-编译器-vs-只包含运行时
  // runtimeCompiler: false,

  // babel-loader 默认会跳过 node_modules 依赖。
  // 通过这个选项可以显式转译一个依赖。
  // transpileDependencies: [/* string or regex */],

  // 三方插件的选项
  pluginOptions: {
    // ...
  }
}