<template lang="pug">
.jzjlxq-container
	.wrap(v-if="isHas")
		h5 东城区妇幼保健院(南区)
		.con
			div
				.l
					h6 张英超
					p <i>门诊</i><span>2022-05-07</span>
				p 咳嗽、呼吸道感染
		ul
			li
				h6 症状:
				p 咳嗽，咽干红，扁桃体大
			li
				h6 症状:
				p 咳嗽，咽干红，扁桃体大
			li
				h6 症状:
				p 咳嗽，咽干红，扁桃体大
	.none(v-if="!isHas")
		img(src="@/assets/imgs/none.png")
		p 网络未连接请检查网络
</template>

<script>
export default {

	name: 'Jzjlxq',

	data () {
		return {
			isHas: true
		}
	}
}
</script>

<style lang="stylus" scoped>
.jzjlxq-container
	width 100%
	height 100%
	background #F8F8F8
	.wrap
		h5
			width 100%
			height .8rem
			padding 0 .3rem
			line-height .8rem
			font-size .28rem
			color #000
		.con
			padding 0 .3rem
			background #fff
			>div
				display flex
				justify-content space-between
				align-items center
				height 1.6rem
				border-bottom 1px solid #EEEEEE
				.l
					h6
						font-size .28rem
						line-height .36rem
						color #000
					p
						margin-top .2rem
						i
							margin-right .2rem
							font-size .26rem
							line-height .36rem
							color #000
							font-weight 400
						span
							font-size .26rem
							line-height .3rem
							color #999
		>ul
			padding 0 .3rem
			background #fff
			li
				padding .32rem 0
				h6
					font-size .28rem
					line-height .48rem
					color #444
				p
					font-size .28rem
					font-weight 400
					line-height .48rem
					color #666
	.none
		display flex
		flex-direction column
		align-items center
		>img
			margin-top 2.48rem
			width 3.44rem
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