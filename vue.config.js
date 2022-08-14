const path = require('path')
const { defineConfig } = require('@vue/cli-service')
const port = 3600

function resolve(dir){
	return path.join(__dirname, dir)
}

module.exports = defineConfig({
	transpileDependencies: true,
	devServer: {
		port,
        // proxy: {
        //     //配置跨域
        //     '/api': {
        //         target: "http://hzx.ngrok.aojiedu.com",
        //         ws:true,
        //         changOrigin: true,
		// 		pathRewrite: {
		// 			'^/api': '' //请求的时候使用这个api就可以
		// 		}
        //     }
        // }
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
