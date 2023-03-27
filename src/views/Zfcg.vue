<template lang="pug">
.ghqr-container
	.con
		.top
			img(src="@/assets/imgs/logo.png")
			h5 支付成功
		ul
			li
				span 付款金额
				p {{info.productFee}}元
			li
				span 项目名称
				p {{info.productName}}
			li
				span 时间
				p {{info.updateTime}}
		.btns
			button(@click="toPage(0)") 回到首页
			button(@click="toPage(1)") 查看缴费记录
</template>

<script>
import { orderAbout } from '@/service/api.js'

export default {

	name: 'Ghcg',

	data () {
		return {
			id: '',
			tradeNo: '',
			areaName: '',
			prePrice: '',
			queueNo: '',
			tradeStatus: '',
			info: {}
		}
	},
	created(){
		this.id = this.$route.query.id
		this.orderDetail()
	},
	methods: {
		async orderDetail(id){
			await orderAbout.orderDetail({
				orderId: this.id
			}).then(res => {
				console.log('orderDetail-res', res)
				this.info = res.data
			}).catch(err => {
				console.log('orderDetail-err', err)
			})
		},
		toPage(idx){
			if(idx == 0){
				this.$router.replace({
					path: '/'
				})
			}else{
		  		this.$router.push({
		  			path: `/jfjl`
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