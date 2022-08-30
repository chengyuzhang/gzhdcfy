<template lang="pug">
.ghqr-container
	.con
		.top
			img(src="@/assets/imgs/logo.png")
			h5 东城妇幼保健院(南区)
		ul
			li
				span 挂号信息
				p 2022-10-10 周一
			li
				span 挂号信息
				p 2022-10-10 周一
			li
				span 挂号信息
				p 2022-10-10 周一
			li
				span 挂号信息
				p 2022-10-10 周一
			li
				span 挂号信息
				p 2022-10-10 周一
			li
				span 挂号信息
				p 哮喘慢咳、反复感冒、急性慢性支气管炎哮喘慢咳、反复感冒、急性慢性支气管炎哮喘慢咳、反复感冒、急性慢性支气管炎
		.btns
			button(@click="toPage(0)") 回到首页
			button(@click="toPage(1)") 查看预约记录
</template>

<script>
import { appointAbout } from '@/service/api.js'

export default {

	name: 'Ghcg',

	data () {
		return {
			id: ''
		}
	},
	created(){
		this.id = this.$route.query.id
		this.getAppointDetail()
	},
	methods: {
		getAppointDetail(){
			appointAbout.getAppointDetail({
				id: this.id
			}).then(res => {
				console.log('getAppointDetail-res', res)
				this.jzrInfo = res.data
			}).catch(err => {
				console.log('getAppointDetail-err', err)
			})
		},
		toPage(idx){
			if(idx == 0){
				this.$router.push({
					path: '/'
				})
			}else{
				this.$router.push({
					path: '/yyjl'
				})
			}
		}
	}
}
</script>

<style lang="stylus" scoped>
.ghqr-container
	width 100%
	height 100%
	padding-top .3rem
	background #F8F8F8
	.con
		margin 0 auto
		width 6.9rem
		padding .3rem
		padding-top .18rem
		padding-bottom .5rem
		background #fff
		.top
			display flex
			flex-direction column
			align-items center
			img
				margin-top .66rem
				margin-bottom .36rem
				width 1.08rem
				height 1.08rem
			h5
				margin-bottom .66rem
				font-size .36rem
				font-weight 500
				color #000
				line-height .5rem
		ul
			li
				display flex
				justify-content space-between
				align-items center
				margin-bottom .24rem
				span
					font-size .28rem
					line-height .48rem
					color #888
				p
					width 4rem
					text-align right
					font-size .28rem
					line-height .4rem
					color #333
					-webkit-line-clamp 2
					text-overflow ellipsis
					display -webkit-box
					-webkit-box-orient vertical
					overflow hidden
		.btns
			display flex
			justify-content center
			align-items center
			margin-top .6rem
			button
				width 2.4rem
				height .72rem
				line-height .72rem
				text-align center
				color #999
				font-size .28rem
				border 1px solid #aaa
				border-radius .36rem
			button:first-of-type
				margin-right .32rem
</style>