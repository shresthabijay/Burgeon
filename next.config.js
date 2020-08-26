// next.config.js
const withSass = require('@zeit/next-sass')
const withReactSvg = require('next-react-svg')
const path = require('path')  

module.exports = withSass(withReactSvg({
  include: path.resolve(__dirname, 'public/static/svgs'),
  webpack(config, options) {
    return config
  },
}))