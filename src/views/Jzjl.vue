<template lang="pug">
.jzjl-container
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
	ul(v-if="items.length")
		li(v-for="(item, index) in items" @click="toPage(index)")
			.l
				h6 张英超
				p <i>门诊</i><span>2022-05-07</span>
			p 咳嗽、呼吸道感染
	.con(v-if="!items.length")
		img(src="@/assets/imgs/none.png")
		p 暂无就诊记录
		button(@click="toXzhyPage") 去挂号
</template>

<script>
export default {

	name: 'Jzjl',

	data () {
		return {
			activeIndex: 0,
			showList: false,
			items: [
				{},
				{},
				{},
				{},
			]
		}
	},
	methods: {
		getItem(idx){
			this.activeIndex = idx
			this.showList = false
		},
		toPage(idx){
			this.$router.push({
				path: '/jzjlxq'
			})
		},
		toXzhyPage(){
			this.$router.push({
				path: '/xzhy'
			})
		}
	}
}
</script>

<style lang="stylus" scoped>
.jzjl-container
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
	>ul
		padding 0 .3rem
		background #fff
		li
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
			>p
				font-size .26rem
				line-height .36rem
				color #000
		li:last-of-type
			border none
	.con
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
	.fade-enter-active, .fade-leave-active {
		transition: opacity .2s;
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
		opacity: 0;
	}
</style>