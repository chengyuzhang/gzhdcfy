<template lang="pug">
.my-container
	.one
		img(src="@/assets/imgs/people.png")
		p 登录/注册
	.two
		.top
			.l
				p 就诊人
				i (1/5)
			.r(@click="toJzrglPage")
				p 就诊管理人
				img(src="@/assets/imgs/r.png")
		.con
			ul
				li(v-for="(item, index) in peopleList" :class="{'active': item.name}")
					div(v-if="item.name")
						img.img1(src="@/assets/imgs/people.png")
						img.img2(src="@/assets/imgs/self.png")
					img(v-else src="@/assets/imgs/add.png" @click="toAddPage")
					p(v-if="item.name") 星星
	.three
		h6 就诊管理
		ul
			li(@click="toPage(0)")
				img(src="@/assets/imgs/m1.png")
				p 就诊记录
			li(@click="toPage(1)")
				img(src="@/assets/imgs/m2.png")
				p 预约记录
			li(@click="toPage(2)")
				img(src="@/assets/imgs/m3.png")
				p 检查结果
			li(@click="toPage(3)")
				img(src="@/assets/imgs/m4.png")
				p 体检报告
	transition(name="fade")
		TabBar(v-if="showTabBar" idx="1")
</template>

<script>
import TabBar from '@/components/TabBar'

export default {

	name: 'My',

	components: {
		TabBar
	},

	data () {
		return {
			showTabBar: true,
			peopleList: [
				{
					name: '星星'
				},
				{
					name: ''
				},
				{
					name: ''
				},
				{
					name: ''
				},
				{
					name: ''
				},
			]
		}
	},
	methods: {
		toJzrglPage(){
			this.$router.push({
				path: '/jzrgl'
			})
		},
		toAddPage(){
			this.$router.push({
				path: '/tjjzr'
			})
		},
		toPage(idx){
			let path = ''
			switch(idx){
				case 0:
					path = '/jzjl'
				break;
				case 1:
					path = '/yyjl'
				break;
				case 2:
					path = '/jcjg'
				break;
				case 3:
					path = '/tjbg'
				break;
			}

			this.$router.push({
				path
			})
		},
	}
}
</script>

<style lang="stylus" scoped>
.my-container
	width 100%
	height 100%
	background #F8F8F8
	.one
		display flex
		align-items center
		padding-top .5rem
		padding-left .8rem
		img
			margin-right .32rem
			width 1rem
			height 1rem
		p
			font-size .36rem
			line-height .5rem
			font-weight bold
			color #333
	.two
		margin-top .7rem
		padding 0 .3rem
		.top
			display flex
			justify-content space-between
			.l
				display flex
				align-items center
				p
					margin-right .12rem
					font-size .36rem
					line-height .5rem
					color #000
				i
					font-size .24rem
					line-height .34rem
					color #834AC1
			.r
				display flex
				align-items center
				p
					margin-right .08rem
					font-size .24rem
					line-height .34rem
					color #666
				img
					width .24rem
					height .24rem
		.con
			margin-top .22rem
			padding-left .5rem
			padding-top .16rem
			padding-bottom .12rem
			border-radius .2rem
			background #fff
			ul
				display flex
				li
					margin-right .44rem
					width .84rem
					img
						height .84rem
				li.active
					position relative
					div
						position relative
						height .84rem
						img
							position absolute
							left 0
						img.img1
							width .84rem
							height .84rem
						img.img2
							left 50%
							bottom 0
							transform translateX(-50%)
							width .54rem
							height .26rem
					p
						margin-top .06rem
						text-align center
						font-size .22rem
						color #000
						line-height .32rem
	.three
		h6
			margin-top .32rem
			margin-bottom .16rem
			padding-left .3rem
			font-size .36rem
			line-height .5rem
			color #000
		ul
			display flex
			margin 0 auto
			width 6.9rem
			padding .38rem .3rem .3rem
			background #fff
			border-radius .2rem
			li
				width 1.7rem
				img
					height .48rem
					object-fit contain
				p
					margin-top .16rem
					text-align center
					font-size .22rem
					line-height .32rem
					color #000
	.fade-enter-active, .fade-leave-active {
		transition: opacity .2s;
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
		opacity: 0;
	}
</style>