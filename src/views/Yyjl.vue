<template lang="pug">
.yyjl-container
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
	.ul
		<van-list v-model="loading" :finished="finished" :immediate-check="false" finished-text="没有更多了" @load="onLoad" >
			.li(v-for="(item, index) in appointList" @click="toPage")
				.top
					.l
						h6 {{item.clinicName}}
						p {{item.officeName}} {{item.areaName}}
					p {{item.statusStr}}
				ol
					li <span>就诊人</span><i>{{item.patientName}}</i>
					li <span>就诊时间</span><i>{{item.clinicDate}}<em>{{item.startTime}}-{{item.endTime}}</em></i>
					li <span>就诊序号</span><i>{{item.queueNo}}</i>
					li <span>挂号费</span><i>{{item.prePrice}}</i>
				button(@click.self.stop="cancelOrder") 取消预约
		</van-list>

</template>

<script>
import { Dialog, Toast } from 'vant'
import { appointAbout, patientAbout } from '@/service/api.js'

export default {

	name: 'Yyjl',

	data () {
		return {
			loading: false,
			finished: false,
			activeIndex: 0,
			showList: false,
			showDialog: false,
			patientId: '',
			jzrList: [],
			appointList: [],
			pageNo: 1,
			pageSize: 5,
			jzrInfo: null
		}
	},
	async created(){
		await this.getLastAppointPatient()
		this.getPatientList()
		this.getAppointList()
	},
	methods: {
		onLoad() {
			this.getAppointList()
		},
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
		getAppointList(){
			appointAbout.getAppointList({
				patientId: this.jzrInfo.id,
				pageNo: this.pageNo,
				pageSize: this.pageSize,
			}).then(res => {
				console.log('getAppointList-res', res)

				let list = res.data.map((item, index) => {
					let status = item.tradeStatus

					if(status == 1){
						item.statusStr = '预约成功'
					}
					if(status == 2){
						item.statusStr = '已取消'
					}
					return item
				})

				if(list.length < this.pageSize) this.finished = true
				this.appointList = this.appointList.concat(list)
				this.pageNo ++
				this.loading = false

			}).catch(err => {
				console.log('getAppointList-err', err)
			})
		},
		getItem(idx){
			this.activeIndex = idx
			this.showList = false
			this.jzrInfo = this.jzrList[idx]

			this.appointList = []
			this.finished = false
			this.loading = false
			this.pageNo = 1
			// this.getAppointList()
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
							text-align center
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
	>.ul
		.li
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
					em
						margin-left .2rem
						color #222
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