<template lang="pug">
.jzm-container
	h6 星星 2101**********0081
	img(src="@/assets/imgs/er-code.png")
	p 门诊号码 0012376515
</template>

<script>
export default {

	name: 'Jzm',

	data () {
		return {

		}
	}
}
</script>

<style lang="stylus" scoped>
.jzm-container
	display flex
	flex-direction column
	align-items center
	h6
		margin-top .92rem
		font-size .28rem
		color #333
		line-height .40rem
	img
		margin-top 1.18rem
		margin-bottom .24rem
		width 6.5rem
		height 1.6rem
	p
		font-size .28rem
		color #333
		line-height .40rem
</style>