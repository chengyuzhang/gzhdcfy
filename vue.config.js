const path = require('path')
const { defineConfig } = require('@vue/cli-service')
const port = 3600

function resolve(dir){
	return path.join(__dirname, dir)
}

module.exports = defineConfig({
	transpileDependencies: true,
	devServer: {
		port
	},
	chainWebpack(config){
		config.module
			.rule('svg')
			.exclude.add(resolve('src/assets/icons'))
		config.module
			.rule('icons')
			.test(/\.svg$/)
			.include.add(resolve('src/assets/icons')).end()
			.use('svg-sprite-loader')
			.loader('svg-sprite-loader')
				.options({symbolId: 'icon-[name]'})
				.end()
		config
			.plugin('html')
			.tap(args => {
				args[0].title= ''
				return args
			})
	}
})
