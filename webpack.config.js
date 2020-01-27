const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const S3Plugin = require('webpack-s3-plugin')

const environment = process.env.DJANGO_ENVIRONMENT || 'local'

let plugins = [
  new HtmlWebPackPlugin({
    template: './src/index.html',
    filename: './index.html'
  }),
  new webpack.EnvironmentPlugin({
    SENTRY_DSN_FRONTEND: '',
    DJANGO_ENVIRONMENT: environment,
    RELEASE_VERSION: process.env.RELEASE_VERSION
  })
]

if (process.env.AWS_ACCESS_KEY_ID) {
  plugins.push(
    new S3Plugin({
      includ: /.*\.(css|js)/,
      s3Options: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_S3_REGION_NAME
      },
      s3UploadOptions: {
        Bucket: process.env.AWS_STORAGE_BUCKET_NAME
      }
    })
  )
}

module.exports = {
  output: {
    filename: 'main_'.concat(environment, '.js')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    open: false,
    proxy: {
      '/': 'http://localhost:8000'
    },
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 500,
      poll: 1000
    }
  },
  plugins: plugins
}
