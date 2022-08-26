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
	},
	async getJzxzList (data, headers) {
		return await get(baseURL + `/notice/allList`, data, headers)
	},
	async getJzxzDetails (data, headers) {
		return await get(baseURL + `/notice/detail`, data, headers)
	},
	async getGhxzDetails (data, headers) {
		return await get(baseURL + `/notice/detailGuahao`, data, headers)
	},
	async getAreaList (data, headers) {
		return await get(baseURL + `/area/allList`, data, headers)
	}
}

export const xzks = {
	async getOfficeTree (data, headers) {
		return await get(baseURL + `/office/officeTree`, data, headers)
	},
}

export const xzhy = {
	async getDutyDate (data, headers) {
		return await get(baseURL + `/office/dutyDate`, data, headers)
	},
	async officeDutyDay (data, headers) {
		return await get(baseURL + `/office/officeDutyDay`, data, headers)
	},
}

export const login = {
	async getCode (data, headers) {
		return await get(baseURL + `/wxlogin/login`, data, headers)
	},
}

