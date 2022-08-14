import { api } from './http.client.js'
// import config from '../../../config/env.js'
let {get, post} = api
import qs from 'qs'

let baseURL = 'http://hzx.ngrok.aojiedu.com'
let baseURL1 = 'https://xiaoxapi.aoji.cn'


export const indexApi = {
	async detailshare (data, headers) {
		// headers = Object.assign({}, headers, {'Content-Type': 'application/x-www-form-urlencoded'})
		return await get(baseURL1 + `/article/detailshare`, data, headers)
	},
	async ads (data, headers) {
		// headers = Object.assign({}, headers, {'Content-Type': 'application/x-www-form-urlencoded'})
		return await get(baseURL + `/advert/spaceAdvertList`, data, headers)
	},
}
export const login = {
	async getCode (data, headers) {
		// headers = Object.assign({}, headers, {'Content-Type': 'application/x-www-form-urlencoded'})
		return await get(baseURL + `/wxlogin/login`, data, headers)
		// return await get(`/api/wxlogin/login`, data, headers)
	},
}

