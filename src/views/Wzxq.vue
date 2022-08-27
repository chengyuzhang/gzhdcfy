<template lang="pug">
.wzxx-container
	h5 抗疫前线的最强战斗堡垒！
	.top
		.l
			img(src="@/assets/imgs/people.png")
			.ll
				h5 张晓红
				p <i>知名专家</i>儿内科
		p.r 2022-05-07 15:37
	.con
		p 目的:探讨小儿早期甲型流感的有效治疗方法。方法:将240例早期甲型流感患儿按就诊日期的单双数分为对照组和观察组各120例，对照组采用磷酸奥司他韦颗粒治疗，2.0～2.5mg/kg，温开水冲服。
		p 每天2次，观察组在对照组基础上联合蓝芩口服液2～5岁每次5mL,>5岁每次10mL，每天3次治疗，两组均治疗5d为1个疗程，观察两组患儿的症状恢复情况、药物不良反应及总体疗效。
		img(src="@/assets/imgs/example.png")
		p 目的:探讨小儿早期甲型流感的有效治疗方法。方法:将240例早期甲型流感患儿按就诊日期的单双数分为对照组和观察组各120例，对照组采用磷酸奥司他韦颗粒治疗，2.0～2.5mg/kg，温开水冲服。
		p 每天2次，观察组在对照组基础上联合蓝芩口服液2～5岁每次5mL,>5岁每次10mL，每天3次治疗，两组均治疗5d为1个疗程，观察两组患儿的症状恢复情况、药物不良反应及总体疗效。
</template>

<script>
import { newsAbout } from '@/service/api.js'

export default {

	name: 'Wzxq',

	data () {
		return {
			id: 0,
		}
	},
	created(){
		this.id = this.$route.query.id
	},
	methods: {
		getInfoDetail(){
			newsAbout.getInfoDetail({
				id: this.id
			}).then(res => {
				console.log('getInfoDetail-res', res)
			}).catch(err => {
				console.log('getInfoDetail-err'. err)
			})
		},
	}
}
</script>

<style lang="stylus" scoped>
.wzxx-container
	width 100%
	height 100%
	padding 0 .3rem
	padding-top .5rem
	background #fff
	overflow hidden
	overflow-y auto
	h5
		font-size .36rem
		color #000
		line-height .5rem
	.top
		display flex
		justify-content space-between
		align-items center
		margin-top .48rem
		.l
			display flex
			align-items center
			img
				margin-right .2rem
				width .68rem
				height .68rem
			.ll
				h5
					font-size .28rem
					color #000
					line-height .4rem
				p
					font-size .24rem
					color #333
					line-height .34rem
					i
						margin-right .18rem
						padding .04rem
						font-size .2rem
						color #535353
						line-height .26rem
						background #E8E8E8
		p.r
			font-size .26rem
			color #999
			line-height .3rem
	.con
		margin-top .48rem
		p
			margin-bottom .6rem
			font-size .28rem
			color #444
			line-height .48rem
		img
			margin-bottom .6rem
</style>