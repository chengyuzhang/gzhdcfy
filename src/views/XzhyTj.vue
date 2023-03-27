<template lang="pug">
.xzhy-container
	.top
		h5
			i {{officeName}}
			p(@click="toPage") 科室介绍<img src="@/assets/imgs/r.png" alt="">
		ul
			li
				img(src="@/assets/imgs/ly.png")
				p {{areaName}}
			li
				img(src="@/assets/imgs/gps.png")
				p {{areaAddress}}
	.tab-bar
		ul
			li(v-for="(item, index) in dateList" :class="{'active': tabIndex == index}" @click="changeTab(index, item)")
				p {{item.title}}
				p {{item.str}}
				p.none(v-if="item.status == 1") 无号
				p.has(v-if="item.status == 2") 有号
				p.full(v-if="item.status == 3") 约满
				p.ready(v-if="item.status == 4") 即将放号
		.r(@click="showCalendar = true")
			.con
				p 全部日期
				img(src="@/assets/imgs/arrow-down2.png")
	.tab-con.has(v-if="tabStatus == 2")
		.morning(v-if="swList.length")
			h5 上午号源
			ul
				li(v-for="(item, index) in swList")
					.l
						h6 {{item.name}} <span v-if="item.doctorId > 0">{{item.doctorName}}</span>
						p {{item.skill}}
					.r
						p ￥{{item.prePrice}}
						button.full(v-if="item.remainCount == 0") 约满
						button(v-else @click="orderFn(item)") 剩余{{item.remainCount}}
		.afternoon(v-if="xwList.length")
			h5 下午号源
			ul
				li(v-for="(item, index) in xwList")
					.l
						h6 {{item.name}} <span v-if="item.doctorId > 0">{{item.doctorName}}</span>
						p {{item.skill}}
					.r
						p ￥{{item.prePrice}}
						button.full(v-if="item.remainCount == 0") 约满
						button(v-else @click="orderFn(item)") 剩余{{item.remainCount}}
		.night(v-if="wsList.length")
			h5 晚上号源
			ul
				li(v-for="(item, index) in wsList")
					.l
						h6 {{item.name}} <span v-if="item.doctorId > 0">{{item.doctorName}}</span>
						p {{item.skill}}
					.r
						p ￥{{item.prePrice}}
						button.full(v-if="item.remainCount == 0") 约满
						button(v-else @click="orderFn(item)") 剩余{{item.remainCount}}
	.tab-con.none(v-if="tabStatus == 1")
		p 当天无号源
	.tab-con.full(v-if="tabStatus == 3")
		.morning
			h5 上午号源
			ul
				li(v-for="item in 3")
					.l
						h6 儿科专家（正高）
						p 擅长：暂无信息暂无信息暂无信息暂无信息暂无信息暂无信息暂无信息暂无信息暂无信息暂无信息暂无信息暂无信息暂无信息暂无信息暂无信息暂无信息暂无信息暂无信息暂无信息
					.r
						p ￥50
						button.full(v-if="false") 约满
						button(v-if="true") 剩余20
		.afternoon
			h5 下午午号源
			ul
				li(v-for="item in 3")
					.l
						h6 儿科专家（正高）
						p 擅长：暂无信息暂无信息暂无信息暂无信息暂无信息暂无信息暂无信息暂无信息暂无信息暂无信息暂无信息暂无信息暂无信息暂无信息暂无信息暂无信息暂无信息暂无信息暂无信息
					.r
						p ￥50
						button.full(v-if="false") 约满
						button(v-if="true") 剩余20
		.night(v-if="wsList.length")
			h5 晚上号源
			ul
				li(v-for="item in 3")
					.l
						h6 儿科专家（正高）
						p 擅长：暂无信息暂无信息暂无信息暂无信息暂无信息暂无信息暂无信息暂无信息暂无信息暂无信息暂无信息暂无信息暂无信息暂无信息暂无信息暂无信息暂无信息暂无信息暂无信息
					.r
						p ￥50
						button.full(v-if="false") 约满
						button(v-if="true") 剩余20
	.tab-con.ready(v-if="tabStatus == 4")
		p 距离{{targetDay}}放号还有
		span <van-count-down :time="remainTime" format="DD 天 HH 时 mm 分 ss 秒" />
	transition(name="fade")
		.selectTime(v-if="timeShow")
			.con
				h6 选择就诊时间
				ul
					li(v-for="(item, index) in timeList" @click="getTimeZone(index, item)" :class="{'active': timeIndex == index}")
						img(v-if="timeIndex != index" src="@/assets/imgs/space.png")
						img(v-if="timeIndex == index" src="@/assets/imgs/dot.png")
						p {{item.startTime}}-{{item.endTime}}
				button(@click="timeShow = false") 取消
	transition(name="fade")
		.calendar(v-if="showCalendar" @click.self="showCalendar = false")
			.con
				h5 {{year}}年{{month}}月
				ol
					li 日
					li 一
					li 二
					li 三
					li 四
					li 五
					li 六
				ul
					li(v-for="item in weekDay")
					li(v-for="(item, index) in orderDate" :class="{'active': tabIndex == index}" @click="getDate(index, item)")
						em {{item.dayStr}}
						i {{item.day}}
						span.has(v-if="item.status == 2") {{item.statusStr}}
						span.none(v-if="item.status == 1") {{item.statusStr}}
						span.full(v-if="item.status == 3") {{item.statusStr}}
						span.ready(v-if="item.status == 4") {{item.statusStr}}
</template>

<script>
const util= require('../util/util.js')
import { officeAbout } from '@/service/api.js'

export default {

	name: 'XzhyHs', //选择号源

	data () {
		return {
			swList: [],
			xwList: [],
			clinicDate: '',
			areaAddress: '',
			areaName: '',
			officeName: '',
			id: 1,
			officeId: 0,
			showCalendar: false,
			remainTime: 0,
			targetDay: '',
			// activeIndex: 3,
			orderDate: [
			],
			year: '',
			month: '',
			daysNum: 0,
			weekDay: 0,
			timeShow: false,
			timeIndex: '999',
			date: '',
			showCalendar: false,
			minDate: new Date(2022, 9, 1),
			maxDate: new Date(2022, 10, 31),
			tabIndex: 0,
			tabStatus: 1,
			dateList: [
			],
			timeList: [
			]
		}
	},
	async created(){
		this.id = this.$route.query.id
		await this.getDutyDateHs()
		console.log('this.dateList', this.dateList)
		let orderDate = this.dateList.map((item, index) => {
			let splitDate = item.date.split('-')
			item.year = splitDate[0]
			item.month = splitDate[1]
			item.day = splitDate[2]

			switch(item.status){
				case 2:
					item.statusStr = '有号'
				break;
				case 1:
					item.statusStr = '无号'
				break;
				case 3:
					item.statusStr = '约满'
				break;
				case 4:
					item.statusStr = '即将放号'
				break;
			}

			let currentDate = new Date()
			let year = currentDate.getFullYear()
			let month = currentDate.getMonth() + 1
			let day = currentDate.getDate()

			if(year == splitDate[0] && month == splitDate[1] && day == splitDate[2]) {
				item.dayStr = '今天'
			}

			if((month + 1) == splitDate[1] && 1 == splitDate[2]) {
				item.dayStr = `${splitDate[1]}月`
			}

			if((month + 2) == splitDate[1] && 1 == splitDate[2]) {
				item.dayStr = `${splitDate[1]}月`
			}

			return item
		})

		this.orderDate = orderDate
		this.createCalendar(orderDate[0].date, orderDate[orderDate.length-1].date)
	},
	methods: {
		orderFn(obj){
			this.dutyId = obj.id
			this.getOfficeDutyTimes()
			this.timeShow = true
		},
		async getOfficeDutyTimes(){
			await officeAbout.getOfficeDutyTimes({
				dutyId: this.dutyId
			}).then(res => {
				console.log('getOfficeDutyTimes-res', res)
				this.timeList = res.data
			}).catch(err => {
				console.log('getOfficeDutyTimes-err', err)
			})
		},
		async getDutyDateHs(){
			await officeAbout.getDutyDateHs({
				areaId: this.id
			}).then(res => {
				console.log('getDutyDateHs-res', res)
				this.areaAddress = res.data.areaAddress
				this.areaName = res.data.areaName
				this.officeName = res.data.officeName
				this.officeId = res.data.officeId
				let dateList = res.data.ddList

				this.dateList = dateList.map((item, index) => {
					item.title = util.formatDay(item.date)
					let arr = item.date.split('-')
					item.str = `${arr[1]}-${arr[2]}`
					return item
				})
				console.log('dateList', dateList)

			}).catch(err => {
				console.log('getDutyDateHs-err', err)
			})
		},
		officeDutyDay(){
			officeAbout.officeDutyDay({
				officeId: this.officeId,
				clinicDate: this.clinicDate
			}).then(res => {
				console.log('officeDutyDay-res', res)
				this.swList = res.data.swList
				this.xwList = res.data.xwList
			}).catch(err => {
				console.log('officeDutyDay-err', err)
			})
		},
		getDate(idx, item){
			// if(item.status != 2) return
			this.activeIndex = idx
			console.log(item)
			this.showCalendar = false
			this.tabIndex = idx
			this.clinicDate = item.date
			this.tabStatus = item.status

			if(item.openTime){
				this.calcRemainTime(item.openTime)
			}

			this.officeDutyDay()

			// if(this.tabStatus == 2){
			// 	this.officeDutyDay()
			// }
		},
		createCalendar(startDateStr, endDateStr){
			let setDateStart = new Date(startDateStr)
			let setDateEnd = new Date(endDateStr)

			//初始日期是周几
			this.weekDay = setDateStart.getDay()

			//循环天数
			this.daysNum = (setDateEnd - setDateStart) / 86400000

			//初始日期展示
			this.year = setDateStart.getFullYear()
			this.month = setDateStart.getMonth() + 1
		},
		toPage(){
			this.$router.push({
				path: `/ksjs?id=${this.officeId}`
			})
		},
		getTimeZone(idx, obj){
			this.timeIndex = idx

			this.$router.push({
				path: `/ghqr?id=${obj.id}`
			})
		},
		formatDate(date) {
			return `${date.getMonth() + 1}/${date.getDate()}`
		},
		formatter(day) {
			const month = day.date.getMonth() + 1
			const date = day.date.getDate()

			if (month === 10) {
			if (date === 1) {
				day.topInfo = '建军节'
			} else if (date === 23) {
				day.topInfo = '处暑'
			} else if (date === 25) {
				day.text = '出伏'
			}
			}
			return day
		},
		changeTab(idx, obj){
			this.tabIndex = idx
			this.clinicDate = obj.date
			this.tabStatus = obj.status

			let arr = obj.str.split('-')
			this.targetDay = `${arr[0]}月${arr[1]}日`

			if(obj.openTime){
				this.calcRemainTime(obj.openTime)
			}

			this.officeDutyDay()

			// if(this.tabStatus == 2){
			// 	this.officeDutyDay()
			// }
		},
		calcRemainTime(targetDay){
			let tDate = new Date(targetDay).getTime()
			let cDate = new Date().getTime()

			this.remainTime = tDate - cDate
		}
	},
	mounted(){
	}
}
</script>

<style lang="stylus" scoped>
.xzhy-container
	width 100%
	height 100%
	background #F8F8F8
	overflow hidden
	overflow-y auto
	.tab-bar
		display flex
		justify-content space-between
		background #fff
		ul
			display flex
			flex-wrap nowrap
			width 6.3rem
			padding-top .12rem
			padding-bottom .14rem
			overflow hidden
			overflow-x auto
			li
				flex-shrink 0
				margin 0 .1rem
				width 1.16rem
				padding-top .1rem
				padding-bottom .12rem
				border-radius .06rem
				p
					text-align center
				p:nth-of-type(1)
					margin-top .1rem
					font-size .22rem
					color #333
					line-height .32rem
				p:nth-of-type(2)
					margin-top .04rem
					margin-bottom .06rem
					font-size .2rem
					color #333
					line-height .28rem
				p:nth-of-type(3)
					font-size .22rem
					line-height .32rem
				p.has, p.ready
					color #64338E
				p.none, p.full
					color #888
			li.active
				background #64338E
				p
					color #fff
		.r
			display flex
			flex-direction column
			justify-content center
			align-items center
			width 1.2rem
			.con
				display flex
				flex-direction column
				justify-content center
				align-items center
				padding-left .24rem
				border-left 1px solid #E3E3E3
				p
					display flex
					align-items center
					width .48rem
					font-size .24rem
					color #333
					line-height .34rem
				img
					width .24rem
					height .24rem
	.tab-con
		div
			margin-top .16rem
			background #fff
			h5
				height .8rem
				padding-left .3rem
				font-size .32rem
				color #000
				line-height .8rem
			ul
				li
					display flex
					justify-content space-between
					padding 0 .3rem
					padding-top .36rem
					padding-bottom .32rem
					border-top 1px solid #F8F8F8
					.l
						h6
							margin-bottom .18rem
							font-size .28rem
							color #333
							line-height .4rem
						p
							width 4rem
							font-size .24rem
							color #888
							line-height .34rem
							-webkit-line-clamp 2
							text-overflow ellipsis
							display -webkit-box
							-webkit-box-orient vertical
							overflow hidden
					.r
						display flex
						justify-content space-between
						align-items center
						p
							margin-right .3rem
							font-size .26rem
							color #DB8C11
							line-height .36rem
						button
							width 1.04rem
							height .48rem
							text-align center
							font-size .2rem
							color #fff
							line-height .48rem
							border-radius .24rem
							background #7C509D
						button.full
							background rgba(172,170,173,1)
	.tab-con.ready
		display flex
		flex-direction column
		justify-content center
		align-items center
		margin-top .16rem
		height 2.5rem
		background #fff
		p
			font-size .28rem
			color #999
			line-height .4rem
		span
			font-size .32rem
			color #64338E
			line-height .44rem
	.tab-con.none
		display flex
		flex-direction column
		justify-content center
		align-items center
		margin-top .16rem
		height 2.5rem
		background #fff
		p
			font-size .28rem
			color #999
			line-height .4rem
	.selectTime
		position fixed
		left 0
		top 0
		z-index 2
		width 100%
		height 100%
		background rgba(0,0,0,.6)
		.con
			position fixed
			left 0
			bottom 0
			background #fff
			border-radius .2rem .2rem 0 0
			h6
				height 1.1rem
				text-align center
				font-size .32rem
				color #000
				line-height 1.1rem
			ul
				display flex
				flex-wrap wrap
				padding .1rem 0
				border-top 1px solid #E5E5E5
				border-bottom 1px solid #E5E5E5
				li
					display flex
					align-items center
					width 50%
					padding .24rem
					padding-left 1rem
					img
						margin-right .2rem
						width .24rem
						height .24rem
					p
						font-size .28rem
						color #333
						line-height .4rem
			button
				width 100%
				height 1.1rem
				line-height 1.1rem
				text-align center
				font-size .32rem
				color #999

	.top
		padding 0 .3rem
		margin-top .48rem
		margin-bottom .14rem
		h5
			display flex
			align-items center
			i
				margin-right .18rem
				font-size .36rem
				line-height .5rem
				color #000
			p
				display flex
				align-items center
				height .44rem
				padding 0 .16rem
				font-size .24rem
				color #64338E
				background #EBE6FF
				img
					width .24rem
					height .24rem
		ul
			display flex
			margin-top .44rem
			li
				display flex
				align-items center
				margin-right .32rem
				img
					margin-right .08rem
					width .24rem
					height .24rem
				p
					font-size .24rem
					line-height .34rem
					color #888
			li:last-of-type
				margin 0
	.fade-enter-active, .fade-leave-active {
		transition: opacity .5s;
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
		opacity: 0;
	}
	.calendar
		position fixed
		left 0
		top 0
		width 100%
		height 100%
		background rgba(0,0,0,.5)
		.con
			position absolute
			left 0
			top 0
			width 100%
			background #fff
			h5
				margin-top .32rem
				margin-bottom .42rem
				font-size .34rem
				line-height .4rem
				color #000
				text-align center
			ul, ol
				display flex
				flex-wrap wrap
				li
					display flex
					flex-direction column
					align-items center
					flex-shrink 0
					margin-bottom .1rem
					width 1.07rem
					padding-top .16rem
					padding-bottom .1rem
					font-size .24rem
					text-align center
					color #333
					border-radius .08rem
					em
						margin-bottom .1rem
						font-size .18rem
						height .18rem
						line-height .18rem
						color #DB8C11
					i
						margin-top .02rem
						line-height .24rem
					span
						margin-top .08rem
						font-size .22rem
						line-height .32rem
					span.ready
					span.has
						color #64338E
					span.none
					span.full
						color #888
				li.active
					background #64338E
					i, span, em
						color #fff
</style>