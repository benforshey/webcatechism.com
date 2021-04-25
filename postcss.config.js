const config = {
  plugins: {
    'postcss-import': {},
    'postcss-cssnext': {
      browsers: ['last 2 versions', '> 2%']
    }
  }
}
module.exports = config
