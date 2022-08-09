let env = process.env.NODE_ENV
function login(){
	let userInfo = JSON.parse(localStorage.getItem('userInfo'))
	if(!userInfo){
		//访问的初始路由
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

		let callBackUrl = `${location.origin}/#/get-login?${queryStr}`
		if(env == 'production'){
			location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3485cb5c602728d2&redirect_uri=${encodeURIComponent(callBackUrl)}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
		}else if(env == 'test'){
			location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx9286b46c9ce97a40&redirect_uri=${encodeURIComponent(callBackUrl)}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
		}

		return
	}

}

export default login