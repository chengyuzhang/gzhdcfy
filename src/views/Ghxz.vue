<template lang="pug">
.ghxz-container
	h5 {{data.title}}
	h6 {{data.createTime}}
	.con(v-html="data.content")
	//- p 自2021年3月1日起因院内科室调整，南址体检科成人体检相关项目全部停诊，南址周末婚前医学检查预约挂号暂停。北址体检科周末婚检即将开始，时间另行通知。咨询电话：64048899-8031
	//- p 原北址体检科的儿童入园入托体检业务调整到南址儿保科。咨询电话：67163491-255
	//- p 一、预约途径：
	//- p 1、支付宝预约：扫码关注医院支付宝生活号
	//- p 2、院内自助机预约
	//- p 3、收费窗口预约
	//- p 4、就诊结束后接诊医生复诊预约
	//- p 5、114预约(少部分专家号)
	//- p 二、预约时间范围
	//- p 1、您可预约两周内全部普通号源和大部分专家号源。节假日不安排预约号。
	//- p 2、每日7：30开始放第15日的新号。
	//- p 三、预约实名制：
	//- p 支付宝预约采取实名制注册预约，请您如实提供就诊人员的真实姓名、身份证、性别、电话、手机号码等基本信息。一个支付宝号可以关联5个家人或者朋友。
	//- p 四、预约或取预约号：
	//- p 1、预约窗口：您可以在我院一层收费处第4号窗口进行预约（适应初诊预约），或者在就诊结束后找接诊医生在诊室预约（适应复诊预约），或者在支付宝生活预约，后者在医院各楼层自助机上预约
	//- p 2、取号窗口:一层、二层、三层的自助或者收费窗口
	//- p 3、预约成功后:请患者于就诊当日携带本人有效证件、预约识别码取号，同时验证预约信息(核对与预约登记实名信息一致的本人有效证件和预约识别码)，如验证不符则医院不能提供相应的诊疗服务。
	//- p 4、取号截止时间:上午就诊患者于就诊当日10:30以前到医院窗口取号。下午就诊患者于就诊当日15:30以前到医院窗口或者自助机取号。过时未取号者，预约作废。
	//- p 五、提示：
	//- p 预约请实名注册预约，如遇特殊情况停诊将以短信或者电话形式及时通知您，请您务必保持电话畅通，给您造成的不便敬请谅解
	//- p 六、取消预约：
	//- p 如不能按时就诊，请在就诊前一日12:00前凭我院预约单到收费窗口或者自助机进行取消，支付宝可直接在手机上取消，当日不得取消当日预约号
	//- p 七、爽约处理：
	//- p 1年内(自然年)同一患者ID爽约2次，将进入我院预约挂号黑名单。单个自然年内，取消该患者预约挂号资格。
	//- p 八、预约限制：
	//- p 同一患者在14日内的预约总量不能超过6个；同一患者在同一就诊日、同一科室只能预约1次；同一患者在14日内的预约总量不可超过6次。
	//- p 未尽事宜以医院相关解释为准，感谢您的理解与配合

</template>

<script>
import { noticeAbout } from '@/service/api.js'

export default {

	name: 'Ghxz',

	data () {
		return {
			data: {}
		}
	},
	created(){
		this.getGhxzDetails()
	},
	methods: {
		getGhxzDetails(){
			noticeAbout.getGhxzDetails({
			}).then(res => {
				console.log('getGhxzDetails-res', res)
				this.data = res.data
			}).catch(err => {
				console.log('getGhxzDetails-err'. err)
			})
		}
	}
}
</script>

<style lang="stylus" scoped>
.ghxz-container
	width 100%
	height 100%
	padding .48rem .6rem
	overflow hidden
	overflow-y auto
	background #fff
	h5
		margin-bottom .16rem
		font-size .36rem
		line-height .5rem
		color #000
	h6
		margin-bottom .48rem
		font-size .26rem
		line-height .32rem
		color #888
	p
		font-size .28rem
		line-height .48rem
		color #888

</style>