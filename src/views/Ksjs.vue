<template lang="pug">
.ksjs-container
	.con
		.top
			.l
				h6 {{areaName}} <img src="@/assets/imgs/r.png" alt="">
				h5 {{name}}
			button(@click="toPage") 去挂号
		.middle
			h5 擅长疾病
			p {{skill}}
			h5(style="margin-top:.48rem") 科室介绍
			p {{intro}}
		.bottom(v-if="doctorList.length")
			.bar
				span 科室医生（6个）
				p(@click="toDoctorList") 全部医生 <img src="@/assets/imgs/r.png" alt="">
			ul
				li(v-for="(item, index) in doctorList" @click="toDoctorDetail(item)")
					img(:src="item.headPic")
					h6 {{item.name}}
					p {{item.academic}}
</template>

<script>
import { officeAbout, doctotAbout } from '@/service/api.js'

export default {

	name: 'Ksjs',

	data () {
		return {
			areaName: '',
			name: '',
			skill: '',
			intro: '',
			doctorList: []

		}
	},
	created(){
		this.officeId = this.$route.query.id
		this.getOfficeDetail()
		this.getDoctorList()
	},
	methods: {
		getOfficeDetail(){
			officeAbout.getOfficeDetail({
				officeId: this.officeId
			}).then(res => {
				console.log('getOfficeDetail-res', res)
				this.areaName = res.data.areaName
				this.name = res.data.name
				this.skill = res.data.skill
				this.intro = res.data.intro
			}).catch(err => {
				console.log('getOfficeDetail-err', err)
			})
		},
		getDoctorList(){
			doctotAbout.getDoctorList({
				officeId: this.officeId,
				pageNo: 1,
				pageSize: 8
			}).then(res => {
				console.log('getDoctorList-res', res)
				this.doctorList = res.data.records
			}).catch(err => {
				console.log('getDoctorList-err', err)
			})
		},
		toPage(){
			this.$router.push({
				path: '/xzhy'
			})
		},
		toDoctorList(){
			this.$router.push({
				path: '/ksys'
			})
		},
		toDoctorDetail(obj){
			this.$router.push({
				path: `/ysjsxq?id=${obj.id}`
			})
		}
	}
}
</script>

<style lang="stylus" scoped>
.ksjs-container
	width 100%
	height 100%
	background linear-gradient(180deg, #DBD3FA 0%, #F8F8F8 100%)
	overflow hidden
	.con
		margin 0 auto
		margin-top .32rem
		width 6.9rem
		padding .3rem
		padding-top .4rem
		background #fff
		border-radius .2rem
		.top
			display flex
			justify-content space-between
			align-items center
			.l
				h6
					display flex
					align-items center
					font-size .28rem
					color #333
					line-height .4rem
					img
						margin-left .06rem
						width .28rem
				h5
					margin-top .26rem
					font-size .36rem
					color #000
					line-height .5rem
			button
				width 1.02rem
				height .48rem
				line-height .48rem
				font-size .2rem
				text-align center
				color #fff
				border-radius .24rem
				background #7C509D
		.middle
			margin-top .28rem
			h5
				margin-bottom .16rem
				font-size .28rem
				color #333
				line-height .4rem
			p
				font-size .24rem
				color #888
				line-height .34rem
		.bottom
			margin-top .48rem
			.bar
				display flex
				justify-content space-between
				align-items center
				span
					font-size .28rem
					color #333
					line-height .4rem
				p
					display flex
					align-items center
					font-size .24rem
					color #666
					line-height .34rem
					img
						margin-left .1rem
						width .24rem
						height .24rem
			ul
				display flex
				flex-wrap wrap
				margin-top .28rem
				li
					display flex
					flex-direction column
					align-items center
					margin-bottom .28rem
					width 1.56rem
					img
						margin-bottom .18rem
						width 1.08rem
						height 1.08rem
					h6
						margin-bottom .02rem
						font-size .28rem
						color #333
						line-height .34rem
					p
						font-size .24rem
						color #666
						line-height .34rem
</style>