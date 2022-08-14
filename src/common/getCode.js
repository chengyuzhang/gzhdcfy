
function getCode(){
	let callBackUrl = `${location.origin}/wxsq`
	console.log('callBackUrl', callBackUrl)
	location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx664220adca35a423&redirect_uri=${encodeURIComponent(callBackUrl)}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
}

export default getCode