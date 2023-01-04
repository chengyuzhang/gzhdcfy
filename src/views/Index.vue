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
		li(v-for="(item, index) in items" :key="item.id" @click="toPage(index)")
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
			<van-swipe-item v-for="(item,index) in ads" :key="item.id">
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
			Item(v-for="(item, index) in yydtList" :key="item.id" :item="item" :Event="toDetailPage")
		.items(v-if="tabIndex == 1")
			Item(v-for="(item, index) in yyxxList" :key="item.id" :item="item" :Event="toDetailPage")
	p.ba(style="position:absolute;ledt:0;bottom:1rem;") 京ICP备<a href="https://beian.miit.gov.cn/">2022025725号-1</a>
	
	transition(name="fade")
		TabBar(v-if="showTabBar" idx="0")
	transition(name="fade")
		.select-zone(v-if="showSelectZone")
			.con
				h5 选择院区
				ul
					li(@click="selectZone(item)" v-for="(item, index) in areaList" :key="item.id")
						.l
							h6 {{item.name}}
							p {{item.address}}
						img(src="@/assets/imgs/r.png")
				button(@click="showSelectZone = false") 取消
	transition(name="fade")
		.ghxz-container(v-if="showGhxz")
			.con
				h5 挂号须知
				.wrap(v-html="ghxzDeatil")
					//- h6 重要通知
					//- p 因疫情防控需要，来我院就诊须持有72小时核酸阴性证明。
					//- p 自2021年3月1日起因院内科室调整，南址体检科成人体检相关项目全部停诊，南址周末婚前医学检查预约挂号暂停。北址体检科周末婚检即将开始，时间另行通知。咨询电话：64048899-8031
					//- p 原北址体检科的儿童入园入托体检业务调整到南址儿保科。咨询电话：67163491-255
					//- h6 一、预约途径
					//- p 1、支付宝预约：扫码关注医院支付宝生活号
					//- p 2、院内自助机预约
					//- p 3、收费窗口预约
					//- p 4、就诊结束后接诊医生复诊预约
					//- p 5、114预约(少部分专家号)

					//- h6 二、预约时间范围
					//- p 1、您可预约两周内全部普通号源和大部分专家号源。节假日不安排预约号。
					//- p 2、每日7：30开始放第15日的新号

					//- h6 三、预约实名制
					//- p 支付宝预约采取实名制注册预约，请您如实提供就诊人员的真实姓名、身份证、性别、电话、手机号码等基本信息。一个支付宝号可以关联5个家人或者朋友。

					//- h6 四、预约或取预约号
					//- p 1、预约窗口：您可以在我院一层收费处第4号窗口进行预约（适应初诊预约），或者在就诊结束后找接诊医生在诊室预约（适应复诊预约），或者在支付宝生活预约，后者在医院各楼层自助机上预约
					//- p 2、取号窗口:一层、二层、三层的自助或者收费窗口
					//- p 3、预约成功后:请患者于就诊当日携带本人有效证件、预约识别码取号，同时验证预约信息(核对与预约登记实名信息一致的本人有效证件和预约识别码)，如验证不符则医院不能提供相应的诊疗服务。
					//- p 4、取号截止时间:上午就诊患者于就诊当日10:30以前到医院窗口取号。下午就诊患者于就诊当日15:30以前到医院窗口或者自助机取号。过时未取号者，预约作废。

					//- h6 五、提示
					//- p 预约请实名注册预约，如遇特殊情况停诊将以短信或者电话形式及时通知您，请您务必保持电话畅通，给您造成的不便敬请谅解。

					//- h6 六、取消预约
					//- p 如不能按时就诊，请在就诊前一日12:00前凭我院预约单到收费窗口或者自助机进行取消，支付宝可直接在手机上取消，当日不得取消当日预约号。

					//- h6 七、爽约处理
					//- p 1年内(自然年)同一患者ID爽约2次，将进入我院预约挂号黑名单。单个自然年内，取消该患者预约挂号资格。

					//- h6 八、预约限制
					//- p 同一患者在14日内的预约总量不能超过6个；同一患者在同一就诊日、同一科室只能预约1次；同一患者在14日内的预约总量不可超过6次。

					//- p 未尽事宜以医院相关解释为准，感谢您的理解与配合
				button(@click="agreeGhxz") 已阅读并同意
</template>

<script>
import Item from '@/components/Item'
import TabBar from '@/components/TabBar'
import { index, newsAbout, noticeAbout, areaAbout } from '@/service/api.js'

export default {

	name: 'Index',

	components: {
		Item,
		TabBar
	},

	data () {
		return {
			isHs: false,
			showGhxz: false,
			showSelectZone: false,
			showTabBar: true,
			tabIndex: 0,
			ads: [],
			yydtList: [],
			yyxxList: [],
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
			areaList: []
		}
	},
	async created(){
		this.getAds()
		this.getYydtInfoList()
		this.getYyxxInfoList()
		this.getAreaList()
		this.getGhxzDetails()
	},
	methods: {
		getGhxzDetails(){
			noticeAbout.getGhxzDetails({

			}).then(res => {
				console.log('getGhxzDetails-res', res)
				this.ghxzDeatil = res.data.content
			}).catch(err => {
				console.log('getGhxzDetails-err', err)
			})
		},
		getAreaList(){
			areaAbout.getAreaList({

			}).then(res => {
				console.log('getAreaList-res', res)
				this.areaList = res.data
			}).catch(err => {
				console.log('getAreaList-err', err)
			})
		},
		agreeGhxz(){
			this.showGhxz = false
		},
		async getYydtInfoList(){
			await newsAbout.getInfoList({
				type: 2,
				pageNo: 1,
				pageSize: 5,
			}).then(res => {
				console.log('getYydtInfoList-res', res)
				this.yydtList = res.data
			}).catch(err => {
				console.log('getYydtInfoList-err'. err)
			})
		},
		async getYyxxInfoList(){
			await newsAbout.getInfoList({
				type: 1,
				pageNo: 1,
				pageSize: 5,
			}).then(res => {
				console.log('getYyxxInfoList-res', res)
				this.yyxxList = res.data
			}).catch(err => {
				console.log('getYyxxInfoList-err'. err)
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
		toDetailPage(obj){
			console.log('obj', obj)
			this.$router.push({
				path: `/wzxq?id=${obj.id}`
			})
		},
		toPage(idx){
			let path = ''
			switch(idx){
				case 0:
					this.showGhxz = true
					this.showSelectZone = true
					this.isHs = true
				break;
				case 1:
					path = '/zjjs'
				break;
				case 2:
					// path = '/tjtjxx'
					path = '/'
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

			if(path){
				this.$router.push({
					path
				})
			}
		},
		orderRegister(){
			this.showGhxz = true
			this.showSelectZone = true
		},
		changeTab(idx){
			this.tabIndex = idx
		},
		selectZone(obj){
			this.showSelectZone = false

			if(this.isHs){
				this.$router.push({
					path: `/xzhy-hs?id=${obj.id}`
				})

				this.isHs = false
			}else{
				this.$router.push({
					path: `/xzks?id=${obj.id}`
				})
			}
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
	.ghxz-container 
		position fixed
		left 0
		top 0
		z-index 3
		width 100%
		height 100%
		padding .8rem .3rem
		background rgba(0,0,0,.5)
		.con
			position relative
			width 100%
			height 100%
			border-radius .2rem
			background #FFF
			h5
				width 100%
				height 1.06rem
				text-align center
				font-size .32rem
				line-height 1.06rem
				color #000
			.wrap
				padding .2rem
				position absolute
				left 0
				top 1.1rem
				bottom 1.1rem
				width 100%
				overflow hidden
				overflow-y auto
				border-top 1px solid #e5e5e5
				border-bottom 1px solid #e5e5e5
				h6
					font-weight bold
					line-height .48rem
					font-size .28rem
					color #333
				p
					line-height .48rem
					font-size .28rem
					color #333
			button
				position absolute
				left 50%
				bottom 0
				height 1.1rem
				line-height 1.1rem
				transform translateX(-50%)
				font-size .32rem
				color #576B95
	.fade-enter-active, .fade-leave-active {
		transition: opacity .2s;
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
		opacity: 0;
	}
</style>