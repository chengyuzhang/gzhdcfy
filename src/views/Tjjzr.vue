<template lang="pug">
.tjjzr-container
	ul(v-if="showList")
		li(@click="showRelationFn")
			span 关系
			.r
				input(v-model="gxVal" disabled placeholder="请选择与本人关系")
				img(src="@/assets/imgs/r.png")
		li
			span 姓名
			.r
				input(v-model="xmVal" :disabled="hasXm" placeholder="请输入就诊人真实姓名")
		li(@click="showCardTypeFn")
			span 证件类型
			.r
				input(v-model="zjlxVal" disabled placeholder="请选证件类型")
				img(src="@/assets/imgs/r.png")
		li
			span 证件号码
			.r
				input(v-model="zjhmVal" :disabled="hasZjhm" placeholder="请输入证件号码")
		li
			span 性别
			ol.r
				li(@click="changeSex(1)")
					img(v-if="sexIndex == 1" src="@/assets/imgs/dot.png")
					img(v-else src="@/assets/imgs/space.png")
					span 男
				li(@click="changeSex(2)")
					img(v-if="sexIndex == 2" src="@/assets/imgs/dot.png")
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

		li(@click="showZoneFn")
			span 地区
			.r
				input(v-model="zoneVal" disabled placeholder="请选择所在地区")
				img(src="@/assets/imgs/r.png")
		li
			span 详细地址
			.r
				input(v-model="addressVal" :disabled="hasAddress" placeholder="请输入详细地址")
		li
			span 费别
			ol.r
				li(@click="changeType(1)")
					img(v-if="typeIndex == 1" src="@/assets/imgs/dot.png")
					img(v-else src="@/assets/imgs/space.png")
					span 自费
				li(@click="changeType(2)")
					img(v-if="typeIndex == 2" src="@/assets/imgs/dot.png")
					img(v-else src="@/assets/imgs/space.png")
					span 医保
		li
			span 医保卡号
			.r
				input(v-model="ybkhVal" :disabled="hasYbkh" placeholder="请输入医保卡号")
				img(src="@/assets/imgs/scan.png")
		li
			span 手机号
			.r
				input(v-model="phoneHide" v-if="phoneHide" :disabled="hasPhone" placeholder="请输入就诊人手机号码")
				input(v-model="sjhVal" v-else :disabled="hasPhone" placeholder="请输入就诊人手机号码")
		li
			span 验证码
			.r
				input(v-model="yzmVal" placeholder="请输入验证码")
				i(v-if="!iBtn") {{numStr}}s
				button(v-if="iBtn" @click="getCode") 获取验证码
		li
			span 儿童体检
			ol.r
				li(@click="childrenCheckFn")
					img(v-if="isChildrenCheck" src="@/assets/imgs/dot.png")
					img(v-else src="@/assets/imgs/space.png")
					span 儿童体检
		li(v-if="isChildrenCheck")
			span 母亲姓名
			.r
				input(v-model="mxmVal" :disabled="hasMxm" placeholder="请输入母亲姓名")
		li(v-if="isChildrenCheck")
			span 母亲身份证号
			.r
				input(v-model="mzjhmVal" @input="getMzjhmVal" :disabled="hasMzjhm" placeholder="请输入母亲身份证号")
	.btn(v-if="showList")
		button(@click="addPatient") 提交就诊人信息
	ul(v-if="!showList")
		li
			span 身份证号码
			.r
				input(v-model="zjhmVal" @input="getZjhmVal" placeholder="请输入身份证号码")
	.btn(v-if="!showList")
		button(@click="getPatientInfo") 查询就诊人信息
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
			value-key="name"
			show-toolbar
			:columns="relationList"
			@confirm="getRelationFn"
			@cancel="showRelation = false"
		)
	</van-popup>
	<van-popup v-model="showCardType" position="bottom">
		van-picker(
			title="选择证件类型"
			value-key="name"
			show-toolbar
			:columns="cardTypeList"
			@confirm="getCardTypeFn"
			@cancel="showCardType = false"
		)
	</van-popup>
	<van-popup v-model="showZone" position="bottom">
		<van-area title="地区" :area-list="areaList" @confirm="getZoneVal" @cancel="cancelZoneFn" />
	</van-popup>
</template>

<script>
import { patientAbout, tool } from '@/service/api.js'
const util= require('../util/util.js')
import { areaList } from '@vant/area-data'
export default {

	name: 'Tjjzr',

	data () {
		return {
			IDAge: '',
			isChildrenCheck: false,
			mxmVal: '',
			mzjhmVal: '',
			hasMxm: false,
			hasMzjhm: false,
			areaList,
			showZone: false,
			zoneVal: '',
			hasAddress: false,
			addressVal: '',
			showList: false,
			showCardType: false,
			cardTypeList: [{
				name: '身份证',
				id: 1
			}],
			relationList: [
				{
					name: '本人',
					id: 1
				},
				{
					name: '配偶',
					id: 2
				},
				{
					name: '子女',
					id: 3
				},
				{
					name: '父亲',
					id: 4
				},
				{
					name: '母亲',
					id: 5
				},
				{
					name: '其他亲属',
					id: 6
				},
			],
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
			sexIndex: '',
			typeIndex: '',
			gxId: '',
			gxVal: '',
			xmVal: '',
			zjlxVal: '',
			zjlxId: '',
			zjhmVal: '',
			mzVal: '',
			srVal: '',
			ybkhVal: '',
			sjhVal: '',
			yzmVal: '',
			srFormat: '',
			numStr: 60,
			iBtn: true,
			hasXm: false,
			hasZjlx: false,
			hasZjhm: false,
			hasSex: false,
			hasMz: false,
			hasSr: false,
			hasFb: false,
			hasYbkh: false,
			hasPhone: false,
			phoneHide: ''
		}
	},
	mounted(){
	},
	methods: {
		getZjhmVal(v){
			let zjhmVal = this.zjhmVal.toUpperCase()
			this.zjhmVal = zjhmVal
		},
		getMzjhmVal(v){
			let mzjhmVal = this.mzjhmVal.toUpperCase()
			this.mzjhmVal = mzjhmVal
		},
		getAge(identityCard) {
			var len = (identityCard + "").length;
			if (len == 0) {
				return 0;
			} else {
				if ((len != 15) && (len != 18))//身份证号码只能为15位或18位其它不合法
				{
					return 0;
				}
			}
			var strBirthday = "";
			if (len == 18)//处理18位的身份证号码从号码中得到生日和性别代码
			{
				strBirthday = identityCard.substr(6, 4) + "/" + identityCard.substr(10, 2) + "/" + identityCard.substr(12, 2);
			}
			if (len == 15) {
				strBirthday = "19" + identityCard.substr(6, 2) + "/" + identityCard.substr(8, 2) + "/" + identityCard.substr(10, 2);
			}
			console.log('strBirthday', strBirthday)
			//时间字符串里，必须是“/”
			var birthDate = new Date(strBirthday);
			var nowDateTime = new Date();
			var age = nowDateTime.getFullYear() - birthDate.getFullYear();
			//再考虑月、天的因素;.getMonth()获取的是从0开始的，这里进行比较，不需要加1
			if (nowDateTime.getMonth() < birthDate.getMonth() || (nowDateTime.getMonth() == birthDate.getMonth() && nowDateTime.getDate() < birthDate.getDate())) {
			age--;
			}
			return age;
		},
		childrenCheckFn(){
			console.log('this.IDAge', this.IDAge)

			if(this.IDAge <= 14){
				this.isChildrenCheck = true
				return
			}

			this.isChildrenCheck = !this.isChildrenCheck
		},
		showZoneFn(){
			this.showZone = true
		},
		getZoneVal(val){
			console.log('zone-val', val)
			let zoneVal = ''
			val.forEach((item, index) => {
				zoneVal = zoneVal + item.name
			})
			this.zoneVal = zoneVal
			this.showZone = false
		},
		cancelZoneFn(val){
			this.showZone = false
		},
		smsCode(){
			tool.smsCode({
				phone: this.sjhVal
			}).then(res => {
				console.log('smsCode-res', res)
				this.$toast({
					message: '验证码已发送！',
					duration: 1500
				})
			}).catch(err => {
				console.log('smsCode-err', err)
			})
		},
		getPatientInfo(){
			if(!this.zjhmVal){
				this.$toast({
					message: '请输入证件号码！',
					duration: 1500
				})
				return
			}

			patientAbout.getPatientInfo({
				idNo: this.zjhmVal
			}).then(res => {
				this.showList = true

				console.log('getPatientInfo-res', res)
				this.IDAge = this.getAge(this.zjhmVal)

				if(res.data){
					this.srFormat = res.data.birthday || util.getBirthdayFromIdCard(this.zjhmVal)
					this.srVal = res.data.birthday || util.getBirthdayFromIdCard(this.zjhmVal)
					this.ybkhVal = res.data.feeNo
					this.typeIndex = res.data.feeType
					this.zjhmVal = res.data.idNo.toUpperCase()
					this.zjlxId = res.data.idType
					this.xmVal = res.data.name
					this.mzVal = res.data.nationality
					this.sjhVal = res.data.phone
					this.sexIndex = res.data.sex
					this.phoneHide = res.data.phoneHide
					this.addressVal = res.data.address
					this.zoneVal = res.data.region

					if(this.IDAge <= 14 || res.data.isChildTj == 1){
						this.isChildrenCheck = true
					}

					this.mxmVal = res.data.motherName
					this.mzjhmVal = res.data.motherIdNo.toUpperCase()

					if(this.addressVal){
			        	this.hasAddress = true
			        }
					if(this.xmVal){
						this.hasXm = true
					}
					if(this.zjlxId){
						this.hasZjlx = true
					}
					if(this.zjhmVal){
						this.hasZjhm = true
					}
					if(this.sexIndex){
						this.hasSex = true
					}
					if(this.mzVal){
						this.hasMz = true
					}
					if(this.srVal){
						this.hasSr = true
					}
					if(this.typeIndex){
						this.hasFb = true
					}
					if(this.ybkhVal){
						this.hasYbkh = true
					}
					if(this.sjhVal){
						this.hasPhone = true
					}
					if(this.mxmVal){
						this.hasMxm = true
					}
					if(this.mzjhmVal){
						this.hasMzjhm = true
					}

					this.cardTypeList.forEach((item, index) => {
						if(item.id == this.zjlxId){
							this.zjlxVal = item.name
						}
					})
				}else{
					this.srFormat = util.getBirthdayFromIdCard(this.zjhmVal)
					this.srVal = util.getBirthdayFromIdCard(this.zjhmVal)

					if(this.IDAge <= 14){
						this.isChildrenCheck = true
					}
				}

			}).catch(err => {
				console.log('getPatientInfo-err', err)
			})
		},
		addPatient(){
			if(!this.gxId){
				this.$toast({
					message: '请选择就诊人与本人关系！',
					duration: 1500
				})
				return
			}
			if(!this.xmVal){
				this.$toast({
					message: '请输入姓名！',
					duration: 1200
				})
				return
			}
			if(!this.zjlxId){
				this.$toast({
					message: '请选择证件类型！',
					duration: 1200
				})
				return
			}
			if(!this.zjhmVal){
				this.$toast({
					message: '请输入证件号码！',
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
			if(!this.mzVal){
				this.$toast({
					message: '请选择民族！',
					duration: 1200
				})
				return
			}
			if(!this.srFormat){
				this.$toast({
					message: '请选择生日！',
					duration: 1200
				})
				return
			}
			// if(!this.typeIndex){
			// 	this.$toast({
			// 		message: '请选择费别！',
			// 		duration: 1200
			// 	})
			// 	return
			// }
			if(this.typeIndex == 2 && !this.ybkhVal){
				this.$toast({
					message: '请输入医保卡号！',
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
			if(!this.zoneVal){
				this.$toast({
					message: '请选择地区！',
					duration: 1200
				})
				return
			}
			if(!this.addressVal){
				this.$toast({
					message: '请输入详细地址！',
					duration: 1200
				})
				return
			}
			if(!this.yzmVal){
				this.$toast({
					message: '请输入验证码！',
					duration: 1200
				})
				return
			}

			if(this.isChildrenCheck){
				if(!this.mxmVal){
					this.$toast({
						message: '请输入母亲姓名！',
						duration: 1200
					})
					return
				}

				if(!this.mzjhmVal){
					this.$toast({
						message: '请输入母亲身份证号码！',
						duration: 1200
					})
					return
				}
			}

			patientAbout.addPatient({
				isChildTj: this.isChildrenCheck ? 1 : 0,
				motherName: this.mxmVal,
				motherIdNo: this.mzjhmVal,
				birthday: this.srFormat,
				feeNo: this.ybkhVal,
				feeType: this.typeIndex,
				idNo: this.zjhmVal,
				idType: this.zjlxId,
				name: this.xmVal,
				nationality: this.mzVal,
				phone: this.sjhVal,
				relation: this.gxId,
				sex: this.sexIndex,
				region: this.zoneVal,
				address: this.addressVal,
				smsCode: this.yzmVal,
			}).then(res => {
				console.log('addPatient-res', res)
				if(res.code == 200){
					this.$toast({
						message: '添加就诊人成功',
						duration: 1200
					})
					this.$router.go(-1)
				}

			}).catch(err => {
				console.log('addPatient-err', err)
			})
		},
		getCardTypeFn(val){
			this.showCardType = false
			this.zjlxVal = val.name
			this.zjlxId = val.id
		},
		getRelationFn(val){
			this.showRelation = false
			this.gxVal = val.name
			this.gxId = val.id
		},
		getNationFn(val){
			this.showNation = false
			this.mzVal = val
		},
		getDateOkFn(value){
			let dateVal = new Date(value)
			let year = dateVal.getFullYear()
			let month = dateVal.getMonth()
			let day = dateVal.getDate()
			this.srVal = `${year}年${month + 1}月${day}日`
			this.srFormat = `${year}-${util.formatNumber(month + 1)}-${util.formatNumber(day)}`

			console.log()

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
			if(this.hasZjlx) return

			this.showCardType = true
		},
		showRelationFn() {
			this.showRelation = true
		},
		showDateFn() {
			if(this.hasSr) return

			this.showDate = true
		},
		showNationFn() {
			if(this.hasMz) return

			this.showNation = true
		},
		changeSex(idx){
			if(this.hasSex) return

			this.sexIndex = idx
		},
		changeType(idx){
			if(this.hasFb) return

			this.typeIndex = idx
		},
		getCode(){
			if(!util.checkPhone(this.sjhVal)){
				this.$toast({
					message: '请输入正确手机号！',
					duration: 1500
				})
				return
			}
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

			this.smsCode()
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
				input[disabled]
					color #999
					-webkit-opacity 1
					-webkit-text-fill-color #999
					opacity 1 !important
					background-color #fff
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