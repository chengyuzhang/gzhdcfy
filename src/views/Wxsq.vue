<template lang="pug">
.wxsq-container
	img.one(src="@/assets/imgs/login-bg.png")
	button 授权登录
	p
		img(src="@/assets/imgs/ok.png")
		span 我已阅读并同意
		i 《法律条款及隐私政策》
	img.two(src="@/assets/imgs/login-bg2.png")
</template>

<script>
import getUrlParam from '@/common/getUrlParam.js'
// import { userInfo, wxAbout, index } from '@/service/api.js'

export default {

	name: 'Wxsq',

	data () {
		return {

		}
	},
	async created(){
		this.login()
	},
	methods: {
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

			await this.getUserInfo()

			this.$router.replace({
				path: originUrl
			})
		},
		async getUserInfo(){
			let userAbout = localStorage.getItem('userInfo')
			userAbout = userAbout && JSON.parse(userAbout)

			if(userAbout) {
				this.userInfo = userAbout
				return
			}

			let code = getUrlParam('code')

			let res = await userInfo.getUserInfo({
				code: code
			})
			this.userInfo = res.data
			localStorage.setItem('userInfo', JSON.stringify(res.data))
		}
	}
}
</script>

<style lang="stylus" scoped>
.wxsq-container
	display flex
	flex-direction column
	align-items center
	img.one
		margin-top 2.3rem
		width 3.54rem
		height 1.38rem
	button
		margin-top .6rem
		width 5.5rem
		height .84rem
		line-height .84rem
		text-align center
		font-size .28rem
		color #fff
		border-radius .42rem
		background #7C509D
	p
		display flex
		align-items center
		margin-top .5rem
		img
			margin-right .08rem
			width .24rem
			height .24rem
		span
			font-size .24rem
			line-height .48rem
			color #666
		i
			font-size .24rem
			line-height .48rem
			color #7C509D
	img.two
		position relative
		left 1.2rem
		margin-top .96rem
		width 4.1rem
		height 5.7rem
</style>