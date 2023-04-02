<template lang="pug">
</template>

<script>
import getUrlParam from '@/common/getUrlParam.js'
import { login } from '@/service/api.js'
const util = require('../util/util.js')

export default {

	name: 'GetLogin',

	data () {
		return {
			code: '',
			env: 0
		}
	},
	async created(){
		this.env = util.getEnv()
		if(this.env == 1){
			console.log('走了微信环境2')
			this.code = getUrlParam('code')
			await this.login()
		}
		if(this.env == 2){
			console.log('走了支付宝环境22222222')
			// this.code = getUrlParam('auth_code')
			this.code = this.$route.query.auth_code
			console.log('code', this.code)
			await this.login()
		}
	},
	methods: {
		async getToken(){
			if(this.env == 1){
				await login.getCode({
					code: this.code
				}).then(res => {
					console.log('getcode-res', res)
					localStorage.setItem('token', res.data)
				}).catch(err => {
					console.log('getcode-err', err)
				})
			}

			if(this.env == 2){
				await login.getCodeForZFB({
					code: this.code
				}).then(res => {
					console.log('getcode-res', res)
					localStorage.setItem('token', res.data)
				}).catch(err => {
					console.log('getcode-err', err)
				})
			}
		},
		async login(){
			let query = this.$route.query
			//过滤不必要的携带参数
			let queryArr = Object.keys(query).map((item, index) => {
				if(item != 'path' && item != 'code' && item != 'state'){
					return `${item}=${query[item]}`
				}else{
					return
				}
			})
			//过滤数组里的空项
			queryArr = queryArr.filter((item, index) => {
				return !!item
			})
			//拼接url需要的携带参数
			let queryStr = queryArr.join('&')
			//拼接完整将要跳转到的url
			let originUrl = `${this.$route.query.path}?${queryStr}`

			await this.getToken()
			this.$router.replace({
				path: originUrl
			})
		}
	}
}
</script>

<style lang="stylus" scoped>
</style>