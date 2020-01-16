const loaderUtils = require('loader-utils')
module.exports = function ( loaderContext )
{	
	const options = Object.assign({}, loaderUtils.getOptions(this))
	return require('./lib/main')(loaderContext, options)
}