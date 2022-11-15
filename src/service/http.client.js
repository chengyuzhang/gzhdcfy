import axios from 'axios'
import { Toast, Indicator } from 'mint-ui'

let env = process.env.NODE_ENV
let requestCount = 0
import vue from '../main'
import getCode from '../common/getCode'

export const api = {
	async get (url, data = {}, headers = {}) {
		let path = vue.$route.path

		if(path !== '/login'){
			let token = localStorage.getItem('token')

			if(token){
				headers = Object.assign({token}, headers)
			}else{
				console.log('没有取得token')
				getCode()
				return
			}
		}

		headers = Object.assign({hospitalId: 1}, headers)

		Indicator.open({
	      spinnerType: 'fading-circle'
	    })
		requestCount ++
		try {
			let res = await axios.get(url, {params: data, headers})

			requestCount --
			if(requestCount == 0){
				Indicator.close()
			}

			return new Promise((resolve, reject) => {

				if (res.data.code === 200) {
					resolve(res.data)

				}else if(res.data.code === 401){ //此时没有登录
					getCode()
					return
				} else {
					reject(res)
					Toast({
						message: res.data.message,
						duration: 1200
					})
				}
			})
		} catch (err) {
			console.log('catch-err', err)

			Toast({
				message: err,
				duration: 1500
			})
			requestCount --
			if(requestCount == 0){
				Indicator.close()
			}
			console.log(err)
		}
	},

	async post (url, data = {}, headers = {}) {
		let path = vue.$route.path

		if(path !== '/login'){
			let token = localStorage.getItem('token')

			if(token){
				headers = Object.assign({token}, headers)
			}else{
				console.log('没有取得token')
				getCode()
				return
			}
		}

		headers = Object.assign({hospitalId: 1}, headers)

		Indicator.open({
	      spinnerType: 'fading-circle'
	    })
		requestCount ++
		try {
			let res = await axios({
				method: 'post',
				url,
				data,
				headers
			})
			
			requestCount --
			if(requestCount == 0){
				Indicator.close()
			}
			
			return new Promise((resolve, reject) => {
				console.log('try-res', res)

				if (res.data.code === 200) {
					resolve(res.data)
				}else if(res.data.code === 401){ //此时没有登录
					getCode()
					return
				} else {
					reject(res)
					Toast({
						message: res.data.message,
						duration: 1200
					})
				}
			})
		} catch (err) {
			console.log('catch-err', err)
			Toast({
				message: err.message,
				duration: 1500
			})
			requestCount --
			if(requestCount == 0){
				Indicator.close()
			}
		}
	},
}
