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

export const officeAbout = {
	async getDutyDate (data, headers) {
		return await get(baseURL + `/office/dutyDate`, data, headers)
	},
	async officeDutyDay (data, headers) {
		return await get(baseURL + `/office/officeDutyDay`, data, headers)
	},
	async getDutyDateHs (data, headers) {
		return await get(baseURL + `/office/dutyDateHs`, data, headers)
	},
	async getOfficeTree (data, headers) {
		return await get(baseURL + `/office/officeTree`, data, headers)
	},
	async getOfficeDetail (data, headers) {
		return await get(baseURL + `/office/detail`, data, headers)
	},
	async getOfficeDutyTimes (data, headers) {
		return await get(baseURL + `/office/officeDutyTimes`, data, headers)
	},
}

export const doctotAbout = {
	async getDoctorList (data, headers) {
		return await get(baseURL + `/doctor/pageList`, data, headers)
	},
	async getDoctorDetail (data, headers) {
		return await get(baseURL + `/doctor/detail`, data, headers)
	},
}

export const login = {
	async getCode (data, headers) {
		return await get(baseURL + `/wxlogin/login`, data, headers)
	},
}

