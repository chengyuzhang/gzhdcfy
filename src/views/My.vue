<template lang="pug">
.my-container
	.one
		img(:src="headImgurl")
		p {{nickName}}
	.two
		.top
			.l
				p 就诊人
				i ({{peopleList.length <= 5 ? peopleList.length : 5}}/5)
			.r(@click="toJzrglPage")
				p 就诊管理人
				img(src="@/assets/imgs/r.png")
		.con
			ul
				li(v-for="(item, index) in peopleList" v-if="index < 5" :class="{'active': item.name}" @click="toCodePage(item)")
					div(v-if="item.name")
						img.img1(src="@/assets/imgs/people.png")
						p {{item.relationName}}
					p(v-if="item.name") {{item.name}}
				li(v-if="peopleList.length < 5" v-for="item in (5 - peopleList.length)")
					img(src="@/assets/imgs/add.png" @click="toAddPage")
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
import { patientAbout, login } from '@/service/api.js'

export default {

	name: 'My',

	components: {
		TabBar
	},

	data () {
		return {
			showTabBar: true,
			nickName: '',
			headImgurl: '',
			peopleList: [
			]
		}
	},
	created(){
		this.getPatientList()
		this.getUserInfos()
	},
	methods: {
		toCodePage(obj){
			this.$router.push({
				path: `/jzm?id=${obj.id}`
			})
		},
		getUserInfos(){
			login.getUserInfos({
			}).then(res => {
				console.log('getUserInfos-res', res)
				this.nickName = res.data.nickName
				this.headImgurl = res.data.headImgurl
			}).catch(err => {
				console.log('getUserInfos-err', err)
			})
		},
		getPatientList(){
			patientAbout.getPatientList({
			}).then(res => {
				console.log('getPatientList-res', res)
				let peopleList = res.data.map((item, index) => {
					switch(item.relation){
						case 1:
							item.relationName = '本人'
						break;
						case 2:
							item.relationName = '配偶'
						break;
						case 3:
							item.relationName = '子女'
						break;
						case 4:
							item.relationName = '父亲'
						break;
						case 5:
							item.relationName = '母亲'
						break;
						case 6:
							item.relationName = '其他'
						break;
					}
					return item
				})

				if(peopleList.length > 5){
					this.peopleList = peopleList.slice(0, 5)
				}else{
					this.peopleList = peopleList
				}
			}).catch(err => {
				console.log('getPatientList-err', err)
			})
		},
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
						>p
							position absolute
							left 50%
							bottom 0
							z-index 2
							transform translateX(-50%)
							width .6rem
							padding .02rem 0
							font-size .2rem
							text-align center
							background #DBD3FA
							color #B47DE2
							border-radius .14rem
					>p
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