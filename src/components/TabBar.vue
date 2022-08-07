<template lang="pug">
.nav-container
	ul
		li.active(v-if="currentIndex == 0")
			img(src="@/assets/imgs/icon1-active.png")
			p 首页
		li(v-if="currentIndex == 1" @click="toNav(0)")
			img(src="@/assets/imgs/icon1.png")
			p 首页
		li(v-if="currentIndex == 0" @click="toNav(1)")
			img(src="@/assets/imgs/icon2.png")
			p 我的
		li.active(v-if="currentIndex == 1" @click="toNav(1)")
			img(src="@/assets/imgs/icon2-active.png")
			p 我的
</template>

<script>
export default {

	name: 'TabBar',
	props: ['idx'],

	data () {
		return {
			currentIndex: ''
		}
	},
	created(){
		this.currentIndex = this.idx
	},
	methods: {
		toNav(idx){
			console.log('idx', idx)
			this.currentIndex = idx

			if(idx == 0){
				this.$router.push({
					path: '/'
				})
			}

			if(idx == 1){
				this.$router.push({
					path: '/my'
				})
			}
		}
	}
}
</script>

<style lang="stylus" scoped>
.nav-container
	position fixed
	left 0
	bottom 0
	z-index 1
	width 100%
	height .96rem
	background #fff
	ul
		display flex
		justify-content space-between
		width 100%
		height 100%
		padding 0 1.4rem
		li
			height 100%
			display flex
			flex-direction column
			align-items center
			justify-content center
			img
				width .48rem
				height .48rem
			p
				margin-top .06rem
				font-size .2rem
				color rgba(0,0,0,.5)
				font-weight 500
				line-height .28rem
		li.active
			p
				color rgba(0,0,0,1)

</style>