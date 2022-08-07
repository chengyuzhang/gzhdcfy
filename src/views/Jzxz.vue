<template lang="pug">
.jzxz-container
	ul
		li
			h5 就诊流程
			p 就诊全流程速览，就医不迷茫
		li
			h5 实名制就诊
			p 携带身份证就诊
		li(@click="toPage(2)")
			h5 挂号流程
			p 挂号规则
		li
			h5 疫情就诊流程
			p 挂号规则
</template>

<script>
export default {

	name: 'Jzxz',

	data () {
		return {

		}
	},
	methods: {
		toPage(idx){
			let path = ''

			switch(idx){
				case 2:
					path = '/ghlc'
				break;
			}
			this.$router.push({
				path
			})
		}
	}
}
</script>

<style lang="stylus" scoped>
.jzxz-container
	ul
		padding 0 .3rem
		background #fff
		li
			padding .3rem 0
			border-bottom 1px solid #EEEEEE
			h5
				margin-bottom .16rem
				font-size .32rem
				line-height .44rem
				color #000
			p
				font-size .26rem
				line-height .36rem
				color #888
</style>