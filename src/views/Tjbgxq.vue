<template lang="pug">
.tjbgxq-container
	h5 东城妇幼保健院(南区)
	.top
		ul
			li(v-for="item in 3")
				span 姓名
				i 小星星
	ul
		li.bar <span>项目</span><i>结果</i><em>单位</em><b>参考范围</b>
		li <span>快速C-反应蛋白</span><i><8.0</i><em>mg/L</em><b><8</b>
		li <span>血清淀粉样蛋白A</span><i><5.0</i><em>mg/L</em><b><10</b>
		li <span>白细胞</span><i>9.16</i><em>10^9/L</em><b>4.9-12.7</b>
		li <span>红细胞</span><i>9.16</i><em>10^12/L</em><b>4.9-12.7</b>
	.btn
		button 下载PDF
</template>

<script>
export default {

	name: 'Tjbgxq',

	data () {
		return {

		}
	}
}
</script>

<style lang="stylus" scoped>
.tjbgxq-container
	width 100%
	height 100%
	background #F8F8F8
	h5
		padding .2rem .3rem
		font-size .28rem
		color #000
		line-height .4rem
	.top
		ul
			padding 0 .3rem
			padding-top .32rem
			background #fff
			overflow hidden
			li
				display flex
				justify-content space-between
				margin-bottom .32rem
				span
					font-size .3rem
					color #999
					line-height .42rem
				i
					font-size .3rem
					color #666
					line-height .42rem
	>ul
		margin-top .32rem
		padding-top .36rem
		background #fff
		overflow hidden
		li
			margin-bottom .38rem
			padding 0 .32rem
			span,i,em,b
				font-size .26rem
				color #999
				line-height .36rem
			span
				margin-right 1rem
				width 2rem
			i
				margin-right .8rem
				width .6rem
			em
				margin-right .66rem
				width .6rem
			b
				width 1.2rem
		li.bar
			span,i,em,b
				font-size .3rem
				color #333
				line-height .42rem
	.btn
		margin-top .88rem
		width 100%
		height 1.16rem
		line-height 1.16rem
		text-align center
		// border-top 1px solid #eee
		overflow hidden
		button
			width 5.5rem
			height .84rem
			line-height .84rem
			font-size .28rem
			color #fff
			background #7C509D
			border-radius .4rem
</style>