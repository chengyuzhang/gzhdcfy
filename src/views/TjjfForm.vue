<template lang="pug">
.tjjzr-container
	ul
		//- li
		//- 	span 幼儿园名称
		//- 	.r
		//- 		input(v-model="yeymc" placeholder="请输入幼儿园名称")
		li(@click="showNationFn")
			span 幼儿园名称
			.r
				input(v-model="yeymc" disabled placeholder="请选幼儿园名称")
				img(src="@/assets/imgs/r.png")
		li
			span 幼儿姓名
			.r
				input(v-model="yexm" placeholder="请输入幼儿姓名")
		li
			span 幼儿性别
			ol.r
				li(@click="changeSex(1)")
					img(v-if="sexIndex == 1" src="@/assets/imgs/dot.png")
					img(v-else src="@/assets/imgs/space.png")
					span 男
				li(@click="changeSex(2)")
					img(v-if="sexIndex == 2" src="@/assets/imgs/dot.png")
					img(v-else src="@/assets/imgs/space.png")
					span 女
		//- li(@click="showNationFn")
		//- 	span 班级
		//- 	.r
		//- 		input(v-model="bj" disabled placeholder="请选班级")
		//- 		img(src="@/assets/imgs/r.png")
		li
			span 班级
			.r
				input(v-model="bj" placeholder="请输入班级")
		li
			span 家长姓名
			.r
				input(v-model="jzxm" placeholder="请输入家长姓名")
		li
			span 手机号
			.r
				//- input(v-model="phoneHide" v-if="phoneHide" :disabled="hasPhone" placeholder="请输入手机号")
				input(v-model="sjhVal" placeholder="请输入手机号")
	.btn
		button(@click="addOrder") 提交信息去缴费
	<van-popup v-model="showNation" position="bottom">
		van-picker(
			title="选择班级"
			show-toolbar
			:columns="list"
			value-key="schoolName"
			@confirm="getNationFn"
			@cancel="showNation = false"
		)
	</van-popup>
</template>

<script>
import { orderAbout, wxAbout } from '@/service/api.js'
const util= require('../util/util.js')
import { wxApi } from '../common/wxApi.js'

export default {

	name: 'TjjzrFromGhqr',

	data () {
		return {
			id: '',
			nationList: [
				"汉族",
				"蒙古族",
				"回族",
				"藏族",
				"维吾尔族",
				"苗族",
				"彝族",
				"壮族",
				"布依族",
				"朝鲜族",
				"满族",
				"侗族",
				"瑶族",
				"白族",
				"土家族",
				"哈尼族",
				"哈萨克族",
				"傣族",
				"黎族",
				"傈僳族",
				"佤族",
				"畲族",
				"高山族",
				"拉祜族",
				"水族",
				"东乡族",
				"纳西族",
				"景颇族",
				"柯尔克孜族",
				"土族",
				"达斡尔族",
				"仫佬族",
				"羌族",
				"布朗族",
				"撒拉族",
				"毛南族",
				"仡佬族",
				"锡伯族",
				"阿昌族",
				"普米族",
				"塔吉克族",
				"怒族",
				"乌孜别克族",
				"俄罗斯族",
				"鄂温克族",
				"德昂族",
				"保安族",
				"裕固族",
				"京族",
				"塔塔尔族",
				"独龙族",
				"鄂伦春族",
				"赫哲族",
				"门巴族",
				"珞巴族",
				"基诺族"
			],
			showNation: false,
			sexIndex: 0,
			yeymc: '',
			yexm: '',
			bj: '',
			jzxm: '',
			sjhVal: '',
			timer: null,
			list: []
		}
	},
	created(){
		this.id = this.$route.query.id
		wxApi.wxAboutConfig()
		this.schoolList()
	},
	methods: {
		async addOrder(){
			if(!this.yeymc){
				this.$toast({
					message: '请输入幼儿园名称！',
					duration: 1200
				})
				return
			}
			if(!this.yeymc){
				this.$toast({
					message: '请输入幼儿园名称！',
					duration: 1200
				})
				return
			}
			if(!this.sexIndex){
				this.$toast({
					message: '请选择性别！',
					duration: 1200
				})
				return
			}
			if(!this.bj){
				this.$toast({
					message: '请填写班级！',
					duration: 1200
				})
				return
			}

			if(!this.jzxm){
				this.$toast({
					message: '请输入家长姓名！',
					duration: 1200
				})
				return
			}
			if(!this.sjhVal){
				this.$toast({
					message: '请输入手机号码！',
					duration: 1200
				})
				return
			}

			if(!util.checkPhone(this.sjhVal)){
				this.$toast({
					message: '请输入正确手机号！',
					duration: 1500
				})
				return
			}

			console.log('yeymc', this.yeymc)
			console.log('yexm', this.yexm)
			console.log('sexIndex', this.sexIndex)
			console.log('bj', this.bj)
			console.log('jzxm', this.jzxm)
			console.log('sjhVal', this.sjhVal)

			await orderAbout.addOrder({
				"childGrade": this.bj,
				"childName": this.yexm,
				"childSex": this.sexIndex,
				"parentName": this.jzxm,
				"parentTel": this.sjhVal,
				"productId": this.id,
				"schoolName": this.yeymc,
			}).then(res => {
				console.log('orderAbout-res', res)
				this.getOrder(res.data)
			}).catch(err => {
				console.log('orderAbout-err', err)
			})
		},
  		async getOrder(id){
  			let _this = this
			await wxAbout.getOrder({
				orderId: id
			}).then(res => {
				console.log('getOrder-res', res)
				let data = res.data
				wx.chooseWXPay({
					timestamp: data.timeStamp,
					nonceStr: data.nonceStr,
					package: data.packageValue,
					signType: data.signType,
					paySign: data.paySign,
					success: function (res) {
						console.log('支付结果-sucess', res)

						_this.timer = setInterval(() => {
							_this.orderDetail(id)
						}, 1000)
				  	}
				});
			}).catch(err => {
				console.log('getOrder-err', err)
			})
		},
  		async schoolList(id){
  			let _this = this
			await orderAbout.schoolList().then(res => {
				console.log('schoolList-res', res)
				this.list = res.data
			}).catch(err => {
				console.log('schoolList-err', err)
			})
		},


		async orderDetail(id){
			await orderAbout.orderDetail({
				orderId: id
			}).then(res => {
				console.log('orderAbout-res', res)
				let data = res.data

				if(data.orderStatus == 3){
					clearInterval(this.timer)
					this.$toast({
						message: '支付失败',
						duration: 1200
					})
				}
				if(data.orderStatus == 2){
					clearInterval(this.timer)
					this.$router.replace({
						path: `/zfcg?id=${id}`
					})
				}
				if(data.orderStatus == 1){
					clearInterval(this.timer)
					this.$toast({
						message: '未支付',
						duration: 1200
					})
				}
			}).catch(err => {
				console.log('orderAbout-err', err)
			})
		},
		getNationFn(val){
			console.log('valll', val)
			this.showNation = false
			this.yeymc = val.schoolName
		},
		showNationFn() {
			this.showNation = true
		},
		changeSex(idx){
			if(this.hasSex) return

			this.sexIndex = idx
		},
	}
}
</script>

<style lang="stylus" scoped>
.tjjzr-container
	width 100%
	height 100%
	overflow hidden
	overflow-y auto
	background #F8F8F8
	ul
		>li
			display flex
			justify-content space-between
			align-items center
			height 1rem
			padding 0 .3rem
			border-bottom 1px solid #F8F8F8
			background #fff
			span
				font-size .32rem
				color #333
				line-height .44rem
			div.r
				display flex
				align-items center
				input
					text-align right
					font-size .28rem
					color #8B8B8B
					line-height .4rem
				input[disabled]
					color #999
					-webkit-opacity 1
					-webkit-text-fill-color #999
					opacity 1 !important
					background-color  #fff
				img
					margin-left .06rem
					width .24rem
					height .24rem
				button
					margin-left .44rem
					width 1.44rem
					height .52rem
					line-height .52rem
					text-align center
					font-size .24rem
					color #437DD2
					border 1px solid #437DD2
					border-radius .08rem
				i
					margin-left .3rem
					padding-left .3rem
					font-size .28rem
					color #8B8B8B
					line-height .4rem
					border-left 1px solid #EAEAEA
			ol.r
				display flex
				li
					display flex
					align-items center
					margin-left .16rem
					img
						margin-right .14rem
						width .32rem
						height .32rem
					span
						font-size .32rem
						color #444
						line-height .44rem
		>li:first-of-type
			margin-bottom .16rem
	.btn
		margin-top .88rem
		width 100%
		height 1.16rem
		line-height 1.16rem
		text-align center
		// border-top 1px solid #eee
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