<template lang="pug">
.tjbg-container
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
	ul
		li(v-for="(item, index) in bgList" @click="toPage(item)")
			.l
				h5 {{item.tjmc}}
				p {{item.tjrq}}
			img(src="@/assets/imgs/r.png")
	.none(v-if="!bgList.length || !bgList.length")
		img(src="@/assets/imgs/none.png")
		p 暂无检查结果

</template>

<script>
import { patientAbout, bgAbout } from '@/service/api.js'

export default {

	name: 'Tjbg',

	data () {
		return {
			activeIndex: 0,
			showList: false,
			jzrList: [],
			bgList: [],
			jzrInfo: null
		}
	},
	async created(){
		await this.getLastAppointPatient()
		this.getPatientList()
		this.getTjbgList()
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
			this.getTjbgList()
		},
		getTjbgList(){
			bgAbout.getTjbgList({
				patientId: this.jzrInfo.id
				// patientId: 33
			}).then(res => {
				console.log('getTjbgList-res', res)
				this.bgList = res.data
			}).catch(err => {
				console.log('getTjbgList-err'. err)
			})
		},
		toPage(obj){
			this.$router.push({
				path: `/tjbgxq?tjbm=${obj.tjbm}`
			})
		}
	}
}
</script>

<style lang="stylus" scoped>
.tjbg-container
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
		transition: opacity .5s;
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
		opacity: 0;
	}
</style>