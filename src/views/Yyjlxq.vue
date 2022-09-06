<template lang="pug">
.yyjlxq-container
	.wrap
		h5 {{statusStr}}
		ul.one
			li
				span 就诊人
				i {{patientName}}
			li
				span 专业/专家
				i {{clinicName}}
			li
				span 就诊医院
				i {{areaName}}
			li
				span 就诊科室
				i {{officeName}}
			li
				span 就诊时间
				i {{clinicDate}}<em>{{startTime}}-{{endTime}}</em>
			li
				span 就诊序号
				i {{queueNo}}号
			li
				span 可退号时间
				i {{canCancelTime}}
			li
				span 挂号费
				i {{prePrice}}元
		.xz
			h5 预约须知
			p 上午号请于11:30之前取号，下午号请于16:30之前取号，过时无法取号。次日24点之前可在微信服务号自助机挂号。
		ul.two
			li
				span 订单号
				i {{tradeNo}}
			li
				span 下单时间
				i {{createTime}}
		button(v-if="statusStr == '预约成功'" @click="cancelOrder") 取消预约
</template>

<script>
import { appointAbout } from '@/service/api.js'
import { Dialog, Toast } from 'vant'

export default {

	name: 'Yyjlxq',

	data () {
		return {
			id: '',
			patientName: '',
			clinicName: '',
			areaName: '',
			officeName: '',
			startTime: '',
			endTime: '',
			clinicDate: '',
			prePrice: '',
			tradeNo: '',
			canCancelTime: '',
			createTime: '',
			statusStr: '',
			queueNo: ''
		}
	},
	created(){
		this.id = this.$route.query.id
		this.getAppointDetail()
	},
	methods: {
		getAppointDetail(){
			appointAbout.getAppointDetail({
				id: this.id
			}).then(res => {
				console.log('getAppointDetail-res', res)

				let status = res.data.tradeStatus

				if(status == 1){
					this.statusStr = '预约成功'
				}
				if(status == 2){
					this.statusStr = '已取消'
				}

				this.areaName = res.data.areaName
				this.startTime = res.data.startTime
				this.endTime = res.data.endTime
				this.tradeNo = res.data.tradeNo
				this.officeName = res.data.officeName
				this.patientName = res.data.patientName
				this.clinicName = res.data.clinicName
				this.prePrice = res.data.prePrice
				this.clinicDate = res.data.clinicDate
				this.tradeStatus = res.data.tradeStatus
				this.canCancelTime = res.data.canCancelTime
				this.createTime = res.data.createTime
				this.queueNo = res.data.queueNo
			}).catch(err => {
				console.log('getAppointDetail-err', err)
			})
		},
		cancelOrder(){
			Dialog.confirm({
				title: '确认要取消预约？',
				message: `您正在取消“${this.officeName}${this.clinicName}”的预约`,
				confirmButtonText: '取消预约',
				cancelButtonText: '不取消',
				confirmButtonColor: '#576B95'
			})
			.then(() => {
				this.cancelAppoint()
			})
			.catch(() => {
			})
		},
		cancelAppoint(obj){
			appointAbout.cancelAppoint({
				id: this.id
			}).then(res => {
				console.log('cancelAppoint-res', res)
				this.$router.replace({
					path: '/yyjl'
				})
			}).catch(err => {
				console.log('cancelAppoint-err', err)
			})
		}
	}
}
</script>

<style lang="stylus" scoped>
.yyjlxq-container
	width 100%
	height 100%
	padding-bottom .5rem
	background #F8F8F8
	overflow hidden
	overflow-y auto
	.wrap
		display flex
		flex-direction column
		align-items flex-end
		>h5
			width 100%
			padding .18rem 0
			padding-left .3rem
			font-size .32rem
			line-height .44rem
			color #333
		ul.one
			width 100%
			padding-left .3rem
			background #fff
			li
				display flex
				align-items flex-start
				padding .22rem 0
				border-bottom 1px solid #E7E7E7
				span
					width 2.1rem
					font-size .28rem
					line-height .48rem
					color #888
				i
					width 4.8rem
					font-size .28rem
					line-height .48rem
					color #333
					em
						margin-left .1rem
			li:last-of-type
				border none
		.xz
			margin-top .32rem
			padding .2rem .3rem
			background #fff
			h5
				font-size .28rem
				line-height .44rem
				color #444
			p
				margin-top .1rem
				fonr-weight 400
				font-size .28rem
				line-height .48rem
				color #666
		ul.two
			margin-top .32rem
			width 100%
			overflow hidden
			li
				display flex
				justify-content space-between
				padding-left .3rem
				padding-right .6rem
				margin-bottom .16rem
				span
					font-size .28rem
					line-height .48rem
					color #888
				i
					font-size .28rem
					line-height .40rem
					color #333
		button
			margin-top .5rem
			margin-right .3rem
			width 1.56rem
			height .56rem
			line-height .56rem
			text-align center
			font-size .28rem
			color #4F4F4F
			border 1px solid #aaa
			border-radius .06rem
</style>