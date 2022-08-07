<template lang="pug">
.yyjl-container
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
	ul
		li(v-for="item in 5" @click="toPage")
			.top
				.l
					h6 儿内科主任医师
					p 儿内科 东城妇幼保健院(南区)
				p 预约成功
			ol
				li(v-for="item in 4") <span>就诊人</span><i>星星</i>
			button(@click.self.stop="cancelOrder") 取消预约
</template>

<script>
import { Dialog, Toast } from 'vant'

export default {

	name: 'Yyjl',

	data () {
		return {
			activeIndex: 0,
			showList: false,
			showDialog: false
		}
	},
	methods: {
		getItem(idx){
			this.activeIndex = idx
			this.showList = false
		},
		toPage(){
			this.$router.push({
				path: '/yyjlxq'
			})
		},
		cancelOrder(){
			this.showDialog = true
			Dialog.confirm({
				title: '确认要取消预约？',
				message: '您正在取消“儿内科主任医师”的预约 ',
				confirmButtonText: '取消预约',
				cancelButtonText: '不取消',
				confirmButtonColor: '#576B95'
			})
			.then(() => {
			// on confirm
			})
			.catch(() => {
			// on cancel
			});
		}
	},
	mounted(){
		Toast({
			message: '我是展示内容',
			duration: 2000
		})
	}
}
</script>

<style lang="stylus" scoped>
.yyjl-container
	width 100%
	height 100%
	background #F8F8F8
	>.top
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
		>li
			display flex
			flex-direction column
			align-items flex-end
			margin-top .16rem
			padding 0 .3rem
			padding-bottom .34rem
			background #fff
			.top
				display flex
				justify-content space-between
				align-items center
				width 100%
				padding-top .5rem
				padding-bottom .24rem
				border-bottom 1px solid #EAEAEA
				.l
					h6
						font-size .3rem
						line-height .42rem
						color #333
					p
						margin-top .14rem
						font-weight 400
						font-size .24rem
						line-height .34rem
						color #999
				p
					font-weight 400
					font-size .26rem
					line-height .36rem
					color #999
			ol
				width 100%
				padding-top .16rem
				li
					display flex
					justify-content space-between
					margin-bottom .24rem
					span
						font-size .28rem
						line-height .48rem
						color #888
					i
						font-size .28rem
						line-height .4rem
						color #888
			button
				width 1.4rem
				height .5rem
				line-height .5rem
				text-align center
				font-size .24rem
				color #888
				border-radius .06rem
				border 1px solid #979797
</style>