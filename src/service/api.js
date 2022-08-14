import { api } from './http.client.js'
// import config from '../../../config/env.js'
let {get, post} = api
import qs from 'qs'

let baseURL = 'http://hzx.ngrok.aojiedu.com'
let baseURL1 = 'https://xiaoxapi.aoji.cn'


export const index = {
	async getAds (data, headers) {
		return await get(baseURL + `/advert/spaceAdvertList`, data, headers)
	},
	async getInfoList (data, headers) {
		return await get(baseURL + `/news/pageList`, data, headers)
	}
}
export const login = {
	async getCode (data, headers) {
		return await get(baseURL + `/wxlogin/login`, data, headers)
	},
}

