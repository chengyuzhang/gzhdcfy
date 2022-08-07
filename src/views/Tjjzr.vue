<template lang="pug">
.tjjzr-container
	ul
		li(@click="showRelationFn")
			span 关系
			.r
				input(v-model="gxVal" disabled placeholder="请选择与本人关系")
				img(src="@/assets/imgs/r.png")
		li
			span 姓名
			.r
				input(v-model="xmVal" placeholder="请输入就诊人真实姓名")
		li(@click="showCardTypeFn")
			span 证件类型
			.r
				input(v-model="zjlxVal" disabled placeholder="请选证件类型")
				img(src="@/assets/imgs/r.png")
		li
			span 证件号码
			.r
				input(v-model="zjhmVal" placeholder="请输入证件号码")
		li
			span 性别
			ol.r
				li(@click="changeSex(0)")
					img(v-if="sexIndex == 0" src="@/assets/imgs/dot.png")
					img(v-else src="@/assets/imgs/space.png")
					span 男
				li(@click="changeSex(1)")
					img(v-if="sexIndex == 1" src="@/assets/imgs/dot.png")
					img(v-else src="@/assets/imgs/space.png")
					span 女
		li(@click="showNationFn")
			span 民族
			.r
				input(v-model="mzVal" disabled placeholder="请选民族")
				img(src="@/assets/imgs/r.png")
		li(@click="showDateFn")
			span 生日
			.r
				input(v-model="srVal" disabled placeholder="请选择就诊人生日")
				img(src="@/assets/imgs/r.png")
		li
			span 费别
			ol.r
				li(@click="changeType(0)")
					img(v-if="typeIndex == 0" src="@/assets/imgs/dot.png")
					img(v-else src="@/assets/imgs/space.png")
					span 自费
				li(@click="changeType(1)")
					img(v-if="typeIndex == 1" src="@/assets/imgs/dot.png")
					img(v-else src="@/assets/imgs/space.png")
					span 医保
		li
			span 医保卡号
			.r
				input(v-model="ybkhVal" placeholder="请输入医保卡号")
				img(src="@/assets/imgs/scan.png")
		li
			span 手机号
			.r
				input(v-model="sjhVal" placeholder="请输入就诊人手机号码")
		li
			span 验证码
			.r
				input(v-model="yzmVal" placeholder="请输入验证码")
				i(v-if="!iBtn") {{numStr}}s
				button(v-if="iBtn" @click="getCode") 获取验证码
	.btn
		button 提交就诊人信息
	<van-popup v-model="showDate" position="bottom">
		van-datetime-picker(
			v-model="currentDate"
			type="date"
			title="选择生日"
			:min-date="minDate"
			:max-date="maxDate"
			:formatter="formatter"
			@confirm="getDateOkFn"
			@cancel="showDate = false"
		)
	</van-popup>
	<van-popup v-model="showNation" position="bottom">
		van-picker(
			title="选择民族"
			show-toolbar
			:columns="nationList"
			@confirm="getNationFn"
			@cancel="showNation = false"
		)
	</van-popup>
	<van-popup v-model="showRelation" position="bottom">
		van-picker(
			title="选择关系"
			show-toolbar
			:columns="relationList"
			@confirm="getRelationFn"
			@cancel="showRelation = false"
		)
	</van-popup>
	<van-popup v-model="showCardType" position="bottom">
		van-picker(
			title="选择证件类型"
			show-toolbar
			:columns="cardTypeList"
			@confirm="getCardTypeFn"
			@cancel="showCardType = false"
		)
	</van-popup>
</template>

<script>
export default {

	name: 'Tjjzr',

	data () {
		return {
			showCardType: false,
			cardTypeList: ['身份证'],
			relationList: ['本人','配偶','子女','父亲','母亲','其他亲属',],
			showRelation: false,
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
			minDate: new Date(1950, 0, 1),
			maxDate: new Date(),
			currentDate: new Date(),
			showDate: false,
			sexIndex: 0,
			typeIndex: 0,
			gxVal: '',
			xmVal: '',
			zjlxVal: '',
			zjhmVal: '',
			mzVal: '',
			srVal: '',
			ybkhVal: '',
			sjhVal: '',
			yzmVal: '',
			numStr: 10,
			iBtn: true,
		}
	},
	methods: {
		getCardTypeFn(val){
			this.showCardType = false
			this.zjlxVal = val
		},
		getRelationFn(val){
			this.showRelation = false
			this.gxVal = val
		},
		getNationFn(val){
			this.showNation = false
			this.mzVal = val
			console.log(val)
		},
		getDateOkFn(value){
			let dateVal = new Date(value)
			let year = dateVal.getFullYear()
			let month = dateVal.getMonth()
			let day = dateVal.getDate()
			this.srVal = `${year}年${month + 1}月${day}日`
			this.showDate = false
		},
		formatter(type, val) {
			if (type === 'year') {
				return val + '年'
			}
			if (type === 'month') {
				return val + '月'
			}
			if (type === 'day') {
				return val + '日'
			}
			return val
		},
		showCardTypeFn(){
			this.showCardType = true
		},
		showRelationFn() {
			this.showRelation = true
		},
		showDateFn() {
			this.showDate = true
		},
		showNationFn() {
			this.showNation = true
		},
		changeSex(idx){
			this.sexIndex = idx
		},
		changeType(idx){
			this.typeIndex = idx
		},
		getCode(){
			if(!this.iBtn) return
			this.iBtn = false
			const count = this.numStr
			let num = this.numStr
			let timer = null
			timer = setInterval(() => {
				num--
				this.numStr = num

				if(num < 0){
					this.iBtn = true
					this.numStr = count
					clearInterval(timer)
				}

				console.log(num)
			}, 1000)
		}
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