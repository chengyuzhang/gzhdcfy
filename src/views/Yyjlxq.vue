<template lang="pug">
.yyjlxq-container
	.wrap(v-if="isHas")
		h5 已就诊
		ul.one
			li(v-for="item in 8")
				span 就诊人
				i 星星
			li
				span 可退号时间
				i 2022年10月10日 00:00-2022年10月10日 00:00
		.xz
			h5 预约须知
			p 上午号请于11:30之前取号，下午号请于16:30之前取号，过时无法取号。次日24点之前可在微信服务号自助机挂号。
		ul.two
			li
				span 订单号
				i 2298938494303458459845
			li
				span 下单时间
				i 2022-10-10 10:43:47
		button 取消预约
	.none(v-if="!isHas")
		img(src="@/assets/imgs/none.png")
		p 暂无预约记录
		button(@click="toXzhyPage") 去挂号
</template>

<script>
export default {

	name: 'Yyjlxq',

	data () {
		return {
			isHas: true
		}
	},
	methods: {
		toXzhyPage(){
			this.$router.push({
				path: '/xzhy'
			})
		}
	}
}
</script>

<style lang="stylus" scoped>
.yyjlxq-container
	width 100%
	height 100%
	padding-bottom .5rem
	background #F8F8F8
	overflow hidden
	overflow-y auto
	.wrap
		display flex
		flex-direction column
		align-items flex-end
		>h5
			width 100%
			padding .18rem 0
			padding-left .3rem
			font-size .32rem
			line-height .44rem
			color #333
		ul.one
			width 100%
			padding-left .3rem
			background #fff
			li
				display flex
				align-items flex-start
				padding .22rem 0
				border-bottom 1px solid #E7E7E7
				span
					width 2.1rem
					font-size .28rem
					line-height .48rem
					color #888
				i
					width 4.8rem
					font-size .28rem
					line-height .48rem
					color #333
			li:last-of-type
				border none
		.xz
			margin-top .32rem
			padding .2rem .3rem
			background #fff
			h5
				font-size .28rem
				line-height .44rem
				color #444
			p
				margin-top .1rem
				fonr-weight 400
				font-size .28rem
				line-height .48rem
				color #666
		ul.two
			margin-top .32rem
			width 100%
			overflow hidden
			li
				display flex
				justify-content space-between
				padding-left .3rem
				padding-right .6rem
				margin-bottom .16rem
				span
					font-size .28rem
					line-height .48rem
					color #888
				i
					font-size .28rem
					line-height .40rem
					color #333
		button
			margin-top .5rem
			margin-right .3rem
			width 1.56rem
			height .56rem
			line-height .56rem
			text-align center
			font-size .28rem
			color #4F4F4F
			border 1px solid #aaa
			border-radius .06rem
	.none
		display flex
		flex-direction column
		align-items center
		height 100%
		>img
			margin-top 2.48rem
			width 3.44rem
			height auto
			object-fit contain
		>p
			font-size .28rem
			line-height .4rem
			color #999
		button
			margin-top .68rem
			width 5.5rem
			height .84rem
			line-height .84rem
			font-size .28rem
			color #fff
			background #7C509D
			border-radius .4rem
</style>