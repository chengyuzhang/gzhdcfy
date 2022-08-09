import { Toast, Indicator } from 'mint-ui'

function isImgLoadOver(){
	Indicator.open({
		spinnerType: 'fading-circle'
	})
	let aImg = document.querySelectorAll('img')
	let len = aImg.length
	aImg.forEach((item, index) => {
		item.onload = function(){
			len--
		}
	})
	let timer = setInterval(() => {
		if(len == 0){
			Indicator.close()
			clearInterval(timer)
		}
	}, 100)
}

export default isImgLoadOver