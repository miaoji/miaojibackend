const path = require('path')

const svgSpriteDirs = [
  path.resolve(__dirname, 'src/svg/'),
  require.resolve('antd').replace(/index\.js$/, ''),
]

export default {
  entry: 'src/index.js',
  svgSpriteLoaderDirs: svgSpriteDirs,
  "theme": "./theme.config.js",
  // 接口代理示例
  "proxy": {
    "/api": {
      "target": "https://console.mijihome.cn",
      // "target": "http://192.168.231.125:80",
      // "target": "http://192.168.231.239:8066",
      // "target": "http://192.168.231.113:80",
      "changeOrigin": true,
      // "pathRewrite": { "^/api": "/" }
      "pathRewrite": { "^/api": "/quandiExpressSiteManager" }
    },
    // "/api/v2": {
    //   "target": "http://192.168.0.110",
    //   "changeOrigin": true,
    //   "pathRewrite": { "^/api/v2" : "/api/v2" }
    // }
  },
  "env": {
    "development": {
      "extraBabelPlugins": [
        "dva-hmr",
        "transform-runtime",
        ["import", { "libraryName": "antd", "style": true }]
      ]
    },
    "production": {
      "extraBabelPlugins": [
        "transform-runtime",
        ["import", { "libraryName": "antd", "style": true }]
      ]
    }
  }
}
