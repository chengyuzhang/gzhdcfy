
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
		// console.log('conf', conf)
		wx.config(conf)
		wx.error(function(err){
			console.log('config-err', err)
		})
	},

	shareFriend(conf = {},isHidden = false){
		wx.ready(function () {   //需在用户可能点击分享按钮前就先调用

			// console.log('conf', conf)
			// console.log('conf.link', conf.link)
			let newConf = {
				title: conf.title ? conf.title : '小希留学，DIY院校申请平台', // 分享标题
				desc:  conf.desc ? conf.desc : '院校官方申请，99.9%成功率；50万成功案例，100万留学家庭的选择。', // 分享描述
				link:  conf.link ? conf.link : location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
				imgUrl: conf.imgUrl ? conf.imgUrl : 'http://ks3-cn-beijing.ksyun.com/aojixiaoxi/studentClient/studentHeadPortrait/2020/12/31/1609378916928068849.jpg', // 分享图标
				success: conf.success ? conf.success : function () {
					console.log('设置成功')
				},
				fail: conf.fail ? conf.fail : function(fail){
					console.log('shareFriend-fail', fail)
				}
			}
			// console.log('newConf', newConf)
			// console.log('isHiddensss', isHidden)
			if(isHidden){
				wx.hideAllNonBaseMenuItem()
			}else{
				wx.showAllNonBaseMenuItem()
				wx.updateAppMessageShareData(newConf)
				wx.updateTimelineShareData(newConf)
			}
		})
	}
}