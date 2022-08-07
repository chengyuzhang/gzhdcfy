import { api } from './http.client.js'
// import config from '../../../config/env.js'
let {get, post} = api
import qs from 'qs'

let baseURL = 'https://stuapi.xiaoxiedu.com'


export const indexApi = {
	async getInfos (data, headers) {
		headers = Object.assign({}, headers, {'Content-Type': 'application/x-www-form-urlencoded'})
		return await post(baseURL + `/home/noticeDetail`, qs.stringify(data), headers)
	},
}
