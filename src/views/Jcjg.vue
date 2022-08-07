<template lang="pug">
.jcjg-container
	.top
		p(@click="showList = true") <i>就诊人</i><span>星星</span><img src="@/assets/imgs/arrow-down.png" alt="">
		transition(name="fade")
			ul(v-if="showList")
				li(v-for="(item, index) in 4" @click="getItem(index)")
					.l
						span 星星
						div
							h6 1578 944 9888
							p <i>北京社保卡</i><span class="ybbx">医保报销</span><span class="zf">自费</span>
					img(v-if="activeIndex == index" src="@/assets/imgs/ok.png")
					img(v-else src="@/assets/imgs/ok-space.png")
	.tab
		ol
			li(:class="{'active': tabIndex == 0}" @click="changeTab(0)") <i>检验报告</i><span></span>
			li(:class="{'active': tabIndex == 1}" @click="changeTab(1)") <i>检查报告</i><span></span>
		ul(v-if="tabIndex == 0")
			li(v-for="item in list1" @click="toPage")
				.l
					h5 末梢五分类+CRP+SAA
					p 2022-05-07 13:23
				img(src="@/assets/imgs/r.png")
		ul(v-if="tabIndex == 1")
			li(v-for="item in list2")
				.l
					h5 末梢五分类+CRP+SAA
					p 2022-05-07 13:24
				img(src="@/assets/imgs/r.png")
		.none(v-if="tabIndex == 0 && !list1.length || tabIndex == 1 && !list2.length")
			img(src="@/assets/imgs/none.png")
			p 暂无检查结果
</template>

<script>
export default {

	name: 'Jcjg',

	data () {
		return {
			tabIndex: 0,
			activeIndex: 0,
			showList: false,
			list1: [
				{},
				{},
			],
			list2: [
				{},
				{},
			],
		}
	},
	methods: {
		getItem(idx){
			this.activeIndex = idx
			this.showList = false
		},
		changeTab(idx){
			this.tabIndex = idx
		},
		toPage(){
			this.$router.push({
				path: '/jcjgxq'
			})
		}
	}
}
</script>

<style lang="stylus" scoped>
.jcjg-container
	width 100%
	height 100%
	background #F8F8F8
	.top
		width 100%
		>p
			display flex
			justify-content center
			align-items center
			width 100%
			height .8rem
			background #FBF6FF
			i
				font-size .28rem
				line-height .4rem
				color #333
			span
				margin-left .32rem
				margin-right .16rem
				font-size .28rem
				line-height .4rem
				color #64338E
			img
				width .16rem
				height .1rem
		ul
			position absolute
			left 0
			top 0
			z-index 2
			width 100%
			padding 0 .32rem
			background #fff
			box-shadow 0 -.04rem .4rem .1rem rgba(0,0,0,.2)
			li
				display flex
				justify-content space-between
				align-items center
				width 100%
				padding-top .3rem
				padding-bottom .3rem
				border-bottom 1px solid #EEEEEE
				.l
					display flex
					align-items center
					span
						margin-left .16rem
						font-size .28rem
						line-height .4rem
						color #333
					div
						margin-left .48rem
						h6
							font-size .28rem
							line-height .4rem
							color #333
						p
							margin-top .02rem
							i
								font-size .24rem
								line-height .34rem
								color #999
							span
								padding 0 .06rem
								font-weight 400
								font-size .24rem
								line-height .4rem
							span.ybbx
								color #FF8336
								background #FFF4E8
							span.zf
								color #64338E
								background #F5E8FF

				img
					width .34rem
					height .34rem
			li.active
				img
			li:last-of-type
				border none
	.tab
		ol
			display flex
			width 100%
			background #fff
			border-bottom 1px solid #ddd
			li
				display flex
				flex-direction column
				align-items center
				justify-content center
				position relative
				height .8rem
				width 50%
				i
					font-size .28rem
					font-weight 400
					transition all .2s
				span
					position absolute
					left 50%
					transform translateX(-50%)
					bottom 0
					width 1.24rem
					height .06rem
					background #64338E
					border-radius .03rem
					opacity 0
					transition all .2s
			li.active
				i
					color #64338E
				span
					opacity 1
		ul
			padding 0 .3rem
			background #fff
			li
				display flex
				justify-content space-between
				align-items center
				height 1.6rem
				border-bottom 1px solid #eee
				.l
					h5
						font-size .28rem
						color #000
						line-height .4rem
					p
						margin-top .2rem
						font-size .26rem
						color #999
						line-height .32rem
				img
					width .32rem
					height .32rem
			li:last-of-type
				border none
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
	.fade-enter-active, .fade-leave-active {
		transition: opacity .2s;
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
		opacity: 0;
	}
</style>