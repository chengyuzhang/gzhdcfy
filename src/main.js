import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './util/rem' // rem 适配文件
import './assets/icons'
import './assets/css/reset.styl' // 最新版字体文件
import Vant from 'vant'
import 'vant/lib/index.css'

import MintUI from 'mint-ui' // mint-ui 的js
import 'mint-ui/lib/style.css' // mint-ui 的css

const util = require('./util/util.js')
let paltformEnv = util.getEnv()

Vue.use(MintUI)
Vue.use(Vant)

import VConsole from 'vconsole'
let env = process.env.NODE_ENV
console.log('env', env)
let vConsole = null

if(paltformEnv == 2){
	// vConsole = new VConsole()
}

Vue.config.productionTip = false
let vue = new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')

export default vue