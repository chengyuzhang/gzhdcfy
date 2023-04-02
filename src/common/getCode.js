
const util = require('../util/util.js')

function getCode(){
	let originUrl = location.hash.split('?')[0].slice(1)
		//首个?的参数
	let queryStrSearch = location.search.slice(1)
	//#后面的?的参数
	let queryStrHash = location.hash.split('?')[1]
	//定义合并后的参数变量
	let queryStr = ''
	if(queryStrSearch && queryStrHash){
		queryStr = `${queryStrSearch}&${queryStrHash}&path=${originUrl}`
	}else if(queryStrSearch && !queryStrHash){
		queryStr = `${queryStrSearch}&path=${originUrl}`
	}else if(!queryStrSearch && queryStrHash){
		queryStr = `${queryStrHash}&path=${originUrl}`
	}else{
		queryStr = `path=${originUrl}`
	}

	let callBackUrl = `${location.origin}/#/login?${queryStr}`

	let callBackUrl1 = `http://weixin.chinadrgs.cn/oauthproxy.html?r=${encodeURIComponent(callBackUrl)}`

	let env = util.getEnv()


	console.log('env', env)
	if(env == 1){
		console.log('走了微信环境1')

		location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxb26221bc33889015&redirect_uri=${encodeURIComponent(callBackUrl)}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
		return
	}
	if(env == 2){
		console.log('走了支付宝环境1')
		let openauth = `https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=2019010462832021&scope=auth_user&redirect_uri=${encodeURIComponent(callBackUrl)}`
		console.log('openauth', openauth)
		location.href = openauth

		return
	}
}

export default getCode