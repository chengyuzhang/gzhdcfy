<template lang="pug">
.ksys-container
	ul
		li(v-for="item in 10" @click="toPage()")
			img(src="@/assets/imgs/people.png")
			.r
				h5 张晓红<i>主任医师</i>
				h6 东城区妇幼保健院 儿内科
				p 擅长：新生儿疾病、小儿呼吸系统疾病、中西医结合、神经系统疾病、脑发育等疾病的诊疗新生儿疾病、小儿呼吸系统疾病、中西医结合、神经系统疾病、脑发育等疾病的诊疗
</template>

<script>
export default {

name: 'ksysList',

	data () {
		return {

		}
	},
	methods: {
		toPage(){
			this.$router.push({
				path: '/ysjsxq'
			})
		}
	}
}
</script>

<style lang="stylus" scoped>
.ksys-container
	ul
		padding 0 .3rem
		li
			display flex
			padding-top .28rem
			img
				margin-right .3rem
				width 1.08rem
				height 1.08rem
			.r
				padding-bottom .32rem
				border-bottom 1px solid #EEEEEE
				h5
					margin-bottom .16rem
					font-size .32rem
					line-height .44rem
					color #333
					i
						margin-left .16rem
						font-size .22rem
				h6
					margin-bottom .16rem
					font-size .22rem
					line-height .44rem
					color #000
				p
					width 5rem
					font-size .22rem
					line-height .32rem
					color #999
					-webkit-line-clamp 2
					text-overflow ellipsis
					display -webkit-box
					-webkit-box-orient vertical
					overflow hidden
</style>