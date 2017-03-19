# vue-springbud
Vue 生产环境模板，默认支持特性包括：

* 热重载
* 公共依赖提取
* 多入口 HTML 注入
* 反向代理
* 内联图片
* Stylus 支持
* CSS 提取


## 运行
安装依赖：

``` text
yarn install
```

运行开发模式，将监听文件变更并写入打包文件到磁盘：

``` text
yarn run dev
```

运行带 dev-server 的开发模式，默认启动本地于 `localhost:9000` 并监听文件变更。该模式下打包文件写入内存：

``` text
yarn run dev-server
```


运行生产模式，将压缩文件、分离 CSS 并添加 hash 值：

``` text
yarn run prod
```


## 默认配置策略
可修改 `build/config.js` 配置文件以定制相关参数。

### 输入
页面入口 JS 文件位于 `src` 路径下，相应 HTML 模板与其同名，位于 `src/templates` 路径下。`src` 目录结构如下：

``` text
├── index.js             # Webpack 入口 JS
├── App.vue              # Vue 入口组件
├── assets               # 图片 / 字体等静态资源
│   └── logo.png
├── components           # 页面 .vue 组件与各页面 JS
│   └── Hello.vue
├── styl                 # 公用样式
│   ├── mixins.styl
│   └── variables.styl
└── templates            # 用于注入页面 JS 的 HTML 模板
    └── index.html
```

### 输出
模板默认将 JS 文件输出至 `dist` 路径下，生成的 HTML 文件输出至 `pages` 目录下。`run prod` 时，将提取 CSS 文件至 `dist/css` 路径下。小于 15K 的图片将内联至 JS，不需拼接雪碧图。

默认输出 JS 包为 index / vendor / manifest 三个。其中 manifest 包用于存放对接 index 和 vendor 的 Webpack 相关模块加载代码，使得等业务模块变更时，只变动内容较小的 manifest 而无需更新第三方库 `vendor` 文件。


## 自定义配置指南
处理常见开发需求的配置方式如下：

### 更改输出路径
需对接不同后端框架时，可将输出的 JS 和 HTML 路径更改为后端框架的相应路径。若后端静态资源目录为 `resources`，HTML View 目录为 `applications/view`，线上路径为 `http://demo.com/foo/bar/resources/bundle.js`，相应配置可修改为：

``` js
var bundlePath = path.join(process.cwd(), './resources')
var htmlPath = path.join(process.cwd(), './applications/view')
// ...
output: {
  publicPath: '/foo/bar/resources/'
}
```

### 多入口文件
目前已有 index 页面，需新建 foo 页面时，先修改配置文件的 `entry` 部分如下：

``` js
var entry = {
  index: './src/index.js',
  foo: './src/foo.js',
  vendor: ['vue']
}
```
然后新建 `src/foo.js` 与 `src/templates/foo.html` 并重启 webpack 即可。

### 合并多个公共依赖库
默认将 Vue 作为唯一的第三方依赖打包至 `vendor.bundle.js`。若页面有多个第三方库，可在 `entry` 中指定需要抽取至 `vendor` 中合并的第三方库名：

``` js
var entry = {
  index: './src/index.js',
  foo: './src/foo.js',
  vendor: ['vue', 'chart.js', 'vue-router'] // ...
}
```

### 引入 CSS
模板已配置根路径为 `src` 与 `node_modules`，可通过绝对路径引入相应位置下的 CSS 文件：

``` css
/* 引入 src/styl/foo.css */
@import '~styl/foo.css';

/* 引入 yarn install 的第三方 CSS 库 */
@import '~normalize.css';
```

### 反向代理后端接口
可通过 devServer 反向代理后端接口 API，从而无需在本地搭建后端环境或上传文件到测试环境。修改 `module.exports.devServer` 下的 `proxy` 参数即可：

``` js
{
  // ...
  proxy: {
    '/api': { target: 'http://backend-address/' }
  }
}
```


关于 Webpack 2 的更多常用配置，可参见 [Webpack Configuration](https://webpack.js.org/configuration/)


## Changelog
* `0.1.1` 修复 vue runtime 包问题
* `0.1.0` 升级到 Webpack 2 并重写配置文件及目录结构
