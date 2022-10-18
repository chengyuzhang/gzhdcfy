<template lang="pug">
.jcjg-container
	.top
		p(@click="showList = true" v-if="jzrInfo") <i>就诊人</i><span>{{jzrInfo.name}}</span><img src="@/assets/imgs/arrow-down.png" alt="">
		transition(name="fade")
			ul(v-if="showList")
				li(v-for="(item, index) in jzrList" @click="getItem(index)")
					.l
						span {{item.name}}
						div
							h6 {{item.feeNo}}
							p <span v-if="item.feeType == 1" class="zf">自费</span><span v-if="item.feeType == 2" class="ybbx">医保报销</span>
					img(v-if="activeIndex == index" src="@/assets/imgs/ok.png")
					img(v-else src="@/assets/imgs/ok-space.png")
	.tab
		ol
			li(:class="{'active': tabIndex == 0}" @click="changeTab(0)") <i>检验报告</i><span></span>
			li(:class="{'active': tabIndex == 1}" @click="changeTab(1)") <i>检查报告</i><span></span>
		ul(v-if="tabIndex == 0")
			li(v-for="item in jybgList" @click="toPage(item)")
				.l
					h5 {{item.jymc}}
					p {{item.jyrq}}
				img(src="@/assets/imgs/r.png")
		ul(v-if="tabIndex == 1")
			li(v-for="item in jcbgList")
				.l
					h5 末梢五分类+CRP+SAA
					p 2022-05-07 13:24
				img(src="@/assets/imgs/r.png")
		.none(v-if="tabIndex == 0 && !jybgList.length || tabIndex == 1 && !jcbgList.length")
			img(src="@/assets/imgs/none.png")
			p 暂无检查结果
</template>

<script>
import { patientAbout, bgAbout } from '@/service/api.js'

export default {

	name: 'Jcjg',

	data () {
		return {
			tabIndex: 0,
			activeIndex: 0,
			showList: false,
			jybgList: [
				{},
				{},
			],
			jcbgList: [
				{},
				{},
			],
			jzrList: [],
			jzrInfo: null
		}
	},
	async created(){
		await this.getLastAppointPatient()
		this.getPatientList()
		this.getjybgList()
	},
	methods: {
		async getLastAppointPatient(){
			await patientAbout.getLastAppointPatient({
			}).then(res => {
				console.log('getLastAppointPatient-res', res)
				if(res.data){
					this.jzrInfo = res.data
				}
			}).catch(err => {
				console.log('getLastAppointPatient-err', err)
			})
		},
		getPatientList(){
			patientAbout.getPatientList({
			}).then(res => {
				console.log('getPatientList-res', res)
				this.jzrList = res.data

				this.jzrList.forEach((item, index) => {
					if(item.name == this.jzrInfo.name){
						this.activeIndex = index
					}
				})
			}).catch(err => {
				console.log('getPatientList-err', err)
			})
		},
		getItem(idx){
			this.activeIndex = idx
			this.showList = false
			this.jzrInfo = this.jzrList[idx]
			this.jybgList = []
			this.jcbgList = []
			this.getjybgList()
		},
		getjybgList(){
			bgAbout.getjybgList({
				patientId: this.jzrInfo.id
				// patientId: 33
			}).then(res => {
				console.log('getjybgList-res', res)
				this.jybgList = res.data
			}).catch(err => {
				console.log('getjybgList-err'. err)
			})
		},
		changeTab(idx){
			this.tabIndex = idx
		},
		toPage(obj){
			this.$router.push({
				path: `/jcjgxq?sampleno=${obj.sampleno}`
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