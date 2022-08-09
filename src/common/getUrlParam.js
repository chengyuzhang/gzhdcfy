function getUrlParam(name) {   //name为要获取的参数名
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var rrr = decodeURIComponent(window.location.search);
	var r = rrr.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}

export default getUrlParam