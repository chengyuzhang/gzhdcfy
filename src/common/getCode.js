
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

	location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx664220adca35a423&redirect_uri=${encodeURIComponent(callBackUrl)}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
}

export default getCode