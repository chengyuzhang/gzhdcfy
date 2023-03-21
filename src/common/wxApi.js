
import { wxAbout } from '../service/api.js'
let env = process.env.NODE_ENV
export const wxApi = {
	wxAboutConfig(){
		wxAbout.getWxConfig({
			url: location.href.split('#')[0]
		}).then(res => {
			console.log('wxAboutConfig-res', res)
			this.wxConfig({
				nonceStr: res.data.noncestr,
				signature: res.data.signature,
				timestamp: res.data.timestamp
			})
		}).catch(err => {
			console.log('wxAboutConfig-err', err)
		})
	},

	wxConfig(config){
		let appId = ''
		if(env == 'production'){
			appId = 'wx3485cb5c602728d2'
		}else if(env == 'test'){
			appId = 'wx9286b46c9ce97a40'
		}
		let conf = Object.assign({}, config, {
			debug: false,
			appId: appId,
			jsApiList: ['chooseWXPay', 'updateAppMessageShareData', 'updateTimelineShareData', 'hideAllNonBaseMenuItem', 'showAllNonBaseMenuItem']
		})
		wx.config(conf)
		wx.ready(function(ready){
			console.log('config-ready', ready)
		})
		wx.error(function(err){
			console.log('config-err', err)
		})
	},
}