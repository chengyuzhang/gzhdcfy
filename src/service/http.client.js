import axios from 'axios'
import { Toast } from 'vant'
let env = process.env.NODE_ENV
let requestCount = 0

export const api = {
	async get (url, data = {}, headers = {}) {

		headers = Object.assign({}, headers)

		Toast.loading({
			duration: 0,
			message: '',
			forbidClick: true,
		})
		requestCount ++
		try {
			let res = await axios.get(url, {params: data, headers})
			res = res.data
			return new Promise((resolve, reject) => {

				if (res.code === 0) {
					resolve(res)
				} else {
					reject(res)
					Toast.loading({
						message: res.message,
						duration: 1200
					})
				}
				requestCount --
				if(requestCount == 0){
					Toast.clear()
				}
			})
		} catch (err) {
			console.log('catch-err', err)

			Toast.loading({
				message: err,
				duration: 1200
			})
			requestCount --
			if(requestCount == 0){
				Toast.clear()
			}
			console.log(err)
		}
	},

	async post (url, data = {}, headers = {}) {
		headers = Object.assign({}, headers)
		Toast.loading({
			duration: 0,
			message: '',
			forbidClick: true,
		})
		requestCount ++
		try {
			let res = await axios({
				method: 'post',
				url,
				data,
				headers
			})
			res = res.data
			return new Promise((resolve, reject) => {
				console.log('try-res', res)

				if (res.head.code === 0) {
					resolve(res.body)
				} else {
					reject(res)
					Toast.loading({
						message: res.message,
						duration: 1200
					})
				}
				requestCount --
				if(requestCount == 0){
					Toast.clear()
				}
			})
		} catch (err) {
			console.log('catch-err', err)
			Toast.loading({
				message: err.message,
				duration: 1200
			})
			requestCount --
			if(requestCount == 0){
				Toast.clear()
			}
		}
	},
}
