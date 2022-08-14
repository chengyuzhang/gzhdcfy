<template lang="pug">
.index-container
	ul.top
		li(@click="orderRegister")
			.l <img src="@/assets/imgs/yygh.png" alt="">
			.r
				h6 预约挂号
				p 今日挂号/预约挂号
		li(@click="toJcjgPage")
			.l <img src="@/assets/imgs/jcjg.png" alt="">
			.r
				h6 检查结果
				p 查询结果问医生
	.line
	ul.items
		li(v-for="(item, index) in items" @click="toPage(index)")
			.img
				<img v-if="index == 0" src="@/assets/imgs/hsjc.png" alt="">
				<img v-if="index == 1" src="@/assets/imgs/zjjs.png" alt="">
				<img v-if="index == 2" src="@/assets/imgs/tjyy.png" alt="">
				<img v-if="index == 3" src="@/assets/imgs/jzxz.png" alt="">
				<img v-if="index == 4" src="@/assets/imgs/yfxx.png" alt="">
				<img v-if="index == 5" src="@/assets/imgs/yyjj.png" alt="">
				<img v-if="index == 6" src="@/assets/imgs/yydt.png" alt="">
				<img v-if="index == 7" src="@/assets/imgs/yqwz.png" alt="">
			p {{item.title}}
	.banner
		<van-swipe class="my-swipe" :autoplay="3000" autoplay="false" indicator-color="white">
			<van-swipe-item v-for="(item,index) in ads">
				img(:src="item.picture")
				a(:href="item.linkUrl") 
			</van-swipe-item>
		</van-swipe>
	.infos
		.bar
			ul
				li(@click="changeTab(0)" :class="{'active': tabIndex == 0}")
					p 医院动态
					span
				li(@click="changeTab(1)" :class="{'active': tabIndex == 1}")
					p 孕妇学院
					span
			.more(@click="toMore") 更多
		.items(v-if="tabIndex == 0")
			Item(v-for="item in 6" :Event="toDetailPage")
		.items(v-if="tabIndex == 1")
			Item(v-for="item in 6")
	transition(name="fade")
		TabBar(v-if="showTabBar" idx="0")
	transition(name="fade")
		.select-zone(v-if="showSelectZone")
			.con
				h5 选择院区
				ul
					li(@click="selectZone(0)")
						.l
							h6 东城妇幼保健院(南区)
							p 北京市东城区法华南里25号楼
						img(src="@/assets/imgs/r.png")
					li(@click="selectZone(1)")
						.l
							h6 东城妇幼保健院(北区)
							p 北京市东城区交道口南大街136号
						img(src="@/assets/imgs/r.png")
				button(@click="showSelectZone = false") 取消
</template>

<script>
import Item from '@/components/Item'
import TabBar from '@/components/TabBar'
import { index } from '@/service/api.js'

export default {

	name: 'Index',

	components: {
		Item,
		TabBar
	},

	data () {
		return {
			showSelectZone: false,
			showTabBar: true,
			tabIndex: 0,
			ads: [],
			items: [
				{
					title: '核酸检测'
				},
				{
					title: '专家介绍'
				},
				{
					title: '体检预约'
				},
				{
					title: '就诊须知'
				},
				{
					title: '孕妇学校'
				},
				{
					title: '医院简介'
				},
				{
					title: '医院动态'
				},
				{
					title: '院区位置'
				},
			],
			actions: [],
			sheetVisible: true,
		}
	},
	async created(){
		await this.getAds()

		await this.getYYDTInfoList()
	},
	methods: {
		async getYYDTInfoList(){
			await index.getInfoList({
				type: 2,
				pageNo: 0,
				pageSize: 5,
			}).then(res => {
				console.log('getAds-res', res)
				this.ads = res.data
			}).catch(err => {
				console.log('getAds-err'. err)
			})
		},
		async getAds(){
			await index.getAds({
				spaceCode: 'SY-ZB'
			}).then(res => {
				console.log('getAds-res', res)
				this.ads = res.data
			}).catch(err => {
				console.log('getAds-err'. err)
			})
		},
		toMore(){
			if(this.tabIndex == 0){
				this.$router.push({
					path: '/yydt'
				})
			}else{
				this.$router.push({
					path: '/yfxx'
				})
			}
		},
		toJcjgPage(){
			this.$router.push({
				path: '/jcjg'
			})
		},
		toDetailPage(){
			this.$router.push({
				path: '/wzxq'
			})
		},
		toPage(idx){
			let path = ''
			switch(idx){
				case 0:
					path = '/xzhy'
				break;
				case 1:
					path = '/zjjs'
				break;
				case 2:
					path = '/zjjs'
				break;
				case 3:
					path = '/jzxz'
				break;
				case 4:
					path = '/yfxx'
				break;
				case 5:
					path = '/yyjj'
				break;
				case 6:
					path = '/yydt'
				break;
				case 7:
					path = '/yqwz'
				break;
			}

			this.$router.push({
				path
			})
		},
		orderRegister(){
			this.showSelectZone = true
		},
		changeTab(idx){
			this.tabIndex = idx
		},
		selectZone(idx){
			this.showSelectZone = false
			this.$router.push({
				path: '/xzks'
			})
			console.log(idx)
		}
	}
}
</script>

<style lang="stylus" scoped>
.index-container
	width 100%
	height 100%
	padding-bottom .96rem
	background #f8f8f8
	overflow hidden
	overflow-y auto
	ul.top
		display flex
		justify-content space-between
		padding 0 .3rem
		padding-top .5rem
		padding-bottom .4rem
		background #fff
		li
			display flex
			justify-content space-between
			align-items center
			.l
				margin-right .24rem
				img
					width 1.16rem
					height 1.16rem
			.r
				h6
					font-size .3rem
					color #333
					line-height .42rem
					font-weight 600
				p
					font-size .24rem
					color #999
					line-height .34rem
					font-weight 500
	.line
		width 100%
		height .2rem
		background linear-gradient(180deg, #EEEEEE 0%, #F8F8F8 100%)
	ul.items
		display flex
		flex-wrap wrap
		padding 0 .15rem
		li
			width 1.8rem
			padding-top .06rem
			padding-bottom .32rem
			display flex
			flex-direction column
			align-items center
			p
				margin-top .16rem
				font-size .24rem
				color #333
				line-height .34rem
				font-weight 500
			img
				width .64rem
				height .64rem
	.banner
		position relative
		margin 0 auto
		width 6.9rem
		>>>.my-swipe
			height 1.42rem
	.infos
		margin 0 auto
		margin-top .48rem
		width 6.9rem
		.bar
			display flex
			justify-content space-between
			align-items center
			>ul
				display flex
				justify-content space-between
				padding-left .28rem
				li
					display flex
					align-items center
					position relative
					margin-right .48rem
					p
						font-size .3rem
						font-weight 500
						color #999
						line-height .42rem
						transition all .1s
					span
						position absolute
						left 50%
						bottom -.1rem
						transform translateX(-50%)
						width .4rem
						height .08rem
						opacity 0
						transition all .5s
						background #9286E9
						border-radius .04rem
				li.active
					p
						font-size .36rem
						font-weight 600
						color #333
						line-height .5rem
					span
						opacity 1
			.more
				font-size .26rem
				font-weight 500
				color #444
				line-height .36rem
		.items
			margin-top .3rem
			padding .48rem 0
			background #fff
			>>>.item-container
				margin-bottom .48rem
			>>>.item-container:last-of-type
				margin-bottom 0
	.select-zone
		position fixed
		left 0
		top 0
		width 100%
		height 100%
		background rgba(0,0,0,.5)
		z-index 2
		.con
			position absolute
			left 0
			bottom 0
			z-index 1
			width 100%
			background #F8F8F8
			border-radius .2rem .2rem 0 0
			h5
				height 1.08rem
				font-size .32rem
				font-weight 500
				color #000
				line-height 1.08rem
				text-align center
				border-bottom 1px solid #E5E5E5
			ul
				li
					display flex
					justify-content space-between
					align-items center
					// padding-top .34rem
					// padding-bottom .3rem
					height 1.5rem
					padding 0 .3rem
					border-bottom 1px solid #E5E5E5
					.l
						h6
							font-size .32rem
							font-weight 500
							color #000
							line-height .44rem
						p
							margin-top .04rem
							font-size .28rem
							font-weight 500
							color #999
							line-height .44rem
					img
						width .32rem
						height .32rem
			button
				width 100%
				height 1.1rem
				line-height 1.1rem
				font-size .32rem
				font-weight 500
				text-align center
				color #999
	.fade-enter-active, .fade-leave-active {
		transition: opacity .2s;
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
		opacity: 0;
	}
</style>