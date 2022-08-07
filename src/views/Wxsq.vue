<template lang="pug">
.wxsq-container
	img.one(src="@/assets/imgs/login-bg.png")
	button 授权登录
	p
		img(src="@/assets/imgs/ok.png")
		span 我已阅读并同意
		i 《法律条款及隐私政策》
	img.two(src="@/assets/imgs/login-bg2.png")
</template>

<script>
export default {

	name: 'Wxsq',

	data () {
		return {

		}
	}
}
</script>

<style lang="stylus" scoped>
.wxsq-container
	display flex
	flex-direction column
	align-items center
	img.one
		margin-top 2.3rem
		width 3.54rem
		height 1.38rem
	button
		margin-top .6rem
		width 5.5rem
		height .84rem
		line-height .84rem
		text-align center
		font-size .28rem
		color #fff
		border-radius .42rem
		background #7C509D
	p
		display flex
		align-items center
		margin-top .5rem
		img
			margin-right .08rem
			width .24rem
			height .24rem
		span
			font-size .24rem
			line-height .48rem
			color #666
		i
			font-size .24rem
			line-height .48rem
			color #7C509D
	img.two
		position relative
		left 1.2rem
		margin-top .96rem
		width 4.1rem
		height 5.7rem
</style>