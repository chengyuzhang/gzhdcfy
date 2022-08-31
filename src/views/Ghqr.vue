<template lang="pug">
.ghqr-container
	.con
		h6 挂号信息
		ul
			li
				span 挂号信息
				p {{clinicDate}}
			li
				span 就诊时间
				p {{startTime}}-{{endTime}}
			li
				span 就诊医院
				p {{areaName}}
			li
				span 就诊科室
				p {{officeName}}
			li
				span 医生名称
				p {{clinicName}}
			li
				span 医生专长
				p {{skill}}
		h6(style="margin-top:.48rem") 就诊人信息
		.add
			div.img(v-if="!jzrInfo" @click="toAddPage")
				img(src="@/assets/imgs/add-bg.png")
			div.con(v-if="jzrInfo" @click="toChange")
				.l {{jzrInfo.name}}
				.m
					p {{jzrInfo.feeNo}}
					p <span v-if="jzrInfo.feeType == 1" class="zf">自费</span><span v-if="jzrInfo.feeType == 2" class="ybbx">医保报销</span>
				.b
					i 更换
					img(src="@/assets/imgs/r.png")
			p 请仔细阅读<span @click="toPage">《挂号须知》</span>
	.btn
		button(@click="saveAppoint") 确认
</template>

<script>
import { appointAbout, patientAbout } from '@/service/api.js'

export default {

	name: 'Ghqr',

	data () {
		return {
			clinicDate: '',
			startTime: '',
			endTime: '',
			areaName: '',
			officeName: '',
			clinicName: '',
			skill: '',
			jzrInfo: null
		}
	},
	async created(){
		this.id = Number(this.$route.query.id)
		this.appointPreview()

		let jzrInfo = JSON.parse(localStorage.getItem('jzrInfo')) || null
		this.jzrInfo = jzrInfo

		if(!this.jzrInfo){
			this.getLastAppointPatient()
		}
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
		saveAppoint(){
			appointAbout.saveAppoint({
				dutyTimeId: this.id,
				patientId: this.jzrInfo.id
			}).then(res => {
				console.log('saveAppoint-res', res)
				this.$router.replace({
					path: `/ghcg?id=${res.data.id}`
				})
			}).catch(err => {
				console.log('saveAppoint-err', err)
			})
		},
		appointPreview(){
			appointAbout.appointPreview({
				dutyTimeId: this.id
			}).then(res => {
				console.log('appointPreview-res', res)
				this.clinicDate = res.data.clinicDate
				this.startTime = res.data.startTime
				this.endTime = res.data.endTime
				this.areaName = res.data.areaName
				this.officeName = res.data.officeName
				this.clinicName = res.data.clinicName
				this.skill = res.data.skill

			}).catch(err => {
				console.log('appointPreview-err', err)
			})
		},
		toChange(){
			this.$router.replace({
				path: `/jzr-list?id=${this.id}`
			})
		},
		toPage(){
			this.$router.push({
				path: '/ghxz'
			})
		},
		toAddPage(){
			this.$router.replace({
				path: `/tjjzr-from-ghqr?id=${this.id}`
			})
		}
	}
}
</script>

<style lang="stylus" scoped>
.ghqr-container
	width 100%
	height 100%
	padding-top .3rem
	background #F8F8F8
	>.con
		margin 0 auto
		width 6.9rem
		padding .3rem
		padding-top .18rem
		background #fff
		h6
			margin-bottom .28rem
			font-size .36rem
			line-height .5rem
			color #000
		ul
			li
				display flex
				justify-content space-between
				align-items center
				margin-bottom .24rem
				span
					font-size .28rem
					line-height .48rem
					color #888
				p
					width 4rem
					text-align right
					font-size .28rem
					line-height .4rem
					color #333
					-webkit-line-clamp 2
					text-overflow ellipsis
					display -webkit-box
					-webkit-box-orient vertical
					overflow hidden
		.add
			padding-bottom .8rem
			div.img
				padding .5rem .3rem
				border 1px solid #ddd
				background #FDFDFD
				border-radius .08rem
				img
					width 2.06rem
					height .44rem
			div.con
				display flex
				align-items center
				width 6.3rem
				height 1.48rem
				padding 0 .3rem
				background #FBF6FF
				border-radius .08rem
				.l
					margin-right .48rem
					font-size .28rem
					color #333
					line-height .4rem
				.m
					width 3rem
					p
						font-size .28rem
						color #888
						line-height .36rem
					p:first-of-type
					p:last-of-type
						display flex
						i
							margin-right .2rem
							font-size .26rem
							color #888
							line-height .36rem
						span
							font-size .24rem
							color #FF8336
							line-height .34rem
						span.zf
							color #64338E
							background #F5E8FF
						span.ybbx
							color #FF8336
							background #FFF4E8
				.b
					display flex
					align-items center
					i
						font-size .26rem
						color #888
						line-height .36rem
					img
						margin-left .06rem
						width .26rem
						height .26rem
			>p
				margin-top .16rem
				font-size .24rem
				line-height .34rem
				color #888
				span
					color #64338E
	.btn
		margin-top .88rem
		width 100%
		height 1.16rem
		line-height 1.16rem
		text-align center
		border-top 1px solid #eee
		border-bottom 1px solid #eee
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