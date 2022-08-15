<template lang="pug">
</template>

<script>
import getUrlParam from '@/common/getUrlParam.js'
import { login } from '@/service/api.js'

export default {

	name: 'GetLogin',

	data () {
		return {
			code: ''
		}
	},
	async created(){
		this.code = getUrlParam('code')
		await this.login()
	},
	methods: {
		async getToken(){
			await login.getCode({
				code: this.code
			}).then(res => {
				console.log('getcode-res', res)
				localStorage.setItem('token', res.data)
			}).catch(err => {
				console.log('getcode-err', err)
			})
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