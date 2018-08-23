const path = require('path')
var prod = process.env.NODE_ENV === 'production'

module.exports = {
  wpyExt: '.wpy',
  eslint: true,
  cliLogs: true,
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src')
    }
  },
  compilers: {
    sass: {
      outputStyle: 'compressed'
    },
    babel: {
      sourceMap: true,
      presets: ['env'],
      plugins: [
        'babel-plugin-transform-class-properties',
        'transform-export-extensions',
        'syntax-export-extensions'
      ]
    }
  },
  plugins: {},
  appConfig: {
    noPromiseAPI: ['createSelectorQuery']
  }
}

if (prod) {
  module.exports.cliLogs = false

  delete module.exports.compilers.babel.sourcesMap
  // 压缩sass
  module.exports.compilers['sass'] = { outputStyle: 'compressed' }

  // 压缩js
  module.exports.plugins = {
    uglifyjs: {
      filter: /\.js$/,
      config: {}
    },
    imagemin: {
      filter: /\.(jpg|png|jpeg)$/,
      config: {
        jpg: {
          quality: 80
        },
        png: {
          quality: 80
        }
      }
    }
  }
}
