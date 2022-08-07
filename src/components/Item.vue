<template lang="pug">
.item-container(@click="toPage")
	.l
		h5 抗疫前线的最强战斗堡垒！
		p 危难险重时刻更显支部堡垒战斗力 2020年,医政党支部及全体党员干部危难险重时刻更显支部堡垒战斗力 2020年,医政党支部及全体党员干部
	.r
		img(src="@/assets/imgs/img-bg.png")
</template>

<script>
export default {

	name: 'Item',
	props: ['Event'],
	data () {
		return {

		}
	},
	methods: {
		toPage(){
			this.Event()
		}
	}
}
</script>

<style lang="stylus" scoped>
.item-container
	display flex
	justify-content space-between
	padding 0 .3rem
	.l
		margin-right .4rem
		h5
			margin-bottom .16rem
			font-size .32rem
			font-weight 500
			color #000
			line-height .44rem
		p
			font-size .26rem
			font-weight 500
			color #888
			line-height .36rem
			overflow hidden
			-webkit-line-clamp 2
			text-overflow ellipsis
			display -webkit-box
			-webkit-box-orient vertical
	.r
			width 1.8rem
			height 1.3rem
		img
			width 1.8rem
			height 1.3rem
			border-radius .06rem
</style>