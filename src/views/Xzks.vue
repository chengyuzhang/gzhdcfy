<template lang="pug">
.xzks-container
	img(src="@/assets/imgs/example.png")
	.introduce
		.l
			h5 东城妇幼保健院(南区)
			p 北京市东城区法华南里25号楼
			div <span>7:30</span><i>放第15天号</i>
		.r
			img(src="@/assets/imgs/select-bg.png")
	.side-tab
		ol
			li(v-for="(item, index) in sideTabs" :class="{'active': tabIndex == index}" @click="changeTab(index)") {{item.title}}
		ul
			li(v-for="(item, index) in sideTabs" @click="toPage") {{item.title}}
</template>

<script>
const util= require('../util/util.js')

export default {

	name: 'Xzks', //选择科室

	data () {
		return {
			tabIndex: 0,
			sideTabs: [
				{
					title: 1231
				},
				{
					title: 324324
				},
				{
					title: 232
				},
				{
					title: 234234
				},
				{
					title: 1231
				},
				{
					title: 3434
				},
				{
					title: 434543
				},
				{
					title: 76575
				},
				{
					title: 1231
				},
				{
					title: 324324
				},
				{
					title: 232
				},
				{
					title: 234234
				},
				{
					title: 1231
				},
				{
					title: 3434
				},
				{
					title: 434543
				},
				{
					title: 76575
				}
			]
		}
	},
	methods: {
		toPage(){
			this.$router.push({
				path: '/xzhy'
			})
		},
		setElHeight(){
			let pageH = document.body.clientHeight
			let el = document.querySelector('.side-tab')
			let ol = document.querySelector('.side-tab ol')
			let ul = document.querySelector('.side-tab ul')
			let top = util.getElRec(el).top

			ol.style.height = pageH - top + 'px'
			ul.style.height = pageH - top + 'px'
		},
		changeTab(idx){
			this.tabIndex = idx
		}
	},
	mounted(){
		this.setElHeight()
	}
}
</script>

<style lang="stylus" scoped>
.xzks-container
	width 100%
	height 100%
	background #f8f8f8
	overflow hidden
	overflow-y auto
	>img
		width 100%
		height 2.66rem
	.introduce
		position relative
		z-index 2
		display flex
		// justify-content space-between
		margin-top -.2rem
		width 100%
		padding 0 .3rem
		padding-top .48rem
		padding-bottom .32rem
		background #fff
		border-radius .2rem .2rem 0 0
		.l
			h5
				font-size .36rem
				font-weight 500
				color #000
				line-height .5rem
			p
				margin-top .08rem
				font-size .26rem
				color #888
				line-height .36rem
			>div
				display flex
				align-items center
				margin-top .24rem
				span
					margin-right .08rem
					font-size .32rem
					font-weight bold
					color #191919
					line-height .38rem
				i
					font-size .28rem
					font-weight bold
					color #999
					line-height .4rem
		.r
			margin-left .6rem
			img
				width 1.54rem
				height .5rem
	.side-tab
		display flex
		justify-content space-between
		margin-top .16rem
		overflow hidden
		ol
			width 2.4rem
			background #F4F4F4
			overflow hidden
			overflow-y auto
			li
				width 100%
				height 1rem
				padding-left .3rem
				line-height 1rem
				font-size .28rem
			li.active
				background #fff
		ul
			width 5.1rem
			padding-left .48rem
			padding-right .4rem
			background #fff
			overflow hidden
			overflow-y auto
			li
				width 100%
				height 1.04rem
				line-height 1.04rem
				font-size .28rem
				color #333
				border-bottom 1px solid rgba(235, 235, 235, .6)
			li:last-of-type
				border none
</style>