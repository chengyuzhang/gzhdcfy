<template lang="pug">
.ksjs-container
	.con
		.top
			.l
				h6 东城妇幼保健院(南区) <img src="@/assets/imgs/r.png" alt="">
				h5 儿内科门诊
			button(@click="toPage") 去挂号
		.middle
			h5 擅长疾病
			p 新生儿疾病、小儿呼吸系统疾病、中西医结合
			h5(style="margin-top:.48rem") 科室介绍
			p 科室组建于1968年，新生儿疾病、小儿呼吸系统疾病、中西医结合、神经系统疾病、脑发育等疾病的诊疗。科室组建于1968年，新生儿疾病、小儿呼吸系统疾病、中西医结合、神经系统疾病、脑发育等疾病的诊疗。科室组建于1968年，新生儿疾病、小儿呼吸系统疾病、中西医结合、神经系统疾病、脑发育等疾病的诊疗。
		.bottom
			.bar
				span 科室医生（6个）
				p(@click="toDoctorList") 全部医生 <img src="@/assets/imgs/r.png" alt="">
			ul
				li(v-for="item in 6" @click="toDoctorDetail")
					img(src="@/assets/imgs/people.png")
					h6 张晓红
					p 主任医师
</template>

<script>
export default {

	name: 'Ksjs',

	data () {
		return {

		}
	},
	methods: {
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
		toDoctorDetail(){
			this.$router.push({
				path: '/ysjs'
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