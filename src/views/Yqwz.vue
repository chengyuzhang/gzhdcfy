<template lang="pug">
.yqwz-container
	ul
		li
			.top
				.l
					h5 东城妇幼保健院(北区)
					p 院区地址：北京市东城区交道口南大街136号
					p 联系电话：010-67654399
				button 导航
			img(src="@/assets/imgs/map1.png")
		li(style="margin-top: .88rem")
			.top
				.l
					h5 东城妇幼保健院(北区)
					p 院区地址：北京市东城区交道口南大街136号
					p 联系电话：010-67654399
				button 导航
			img(src="@/assets/imgs/map2.png")
</template>

<script>
import { areaAbout } from '@/service/api.js'
export default {

	name: 'Yqwz',

	data () {
		return {
			areaList: []
		}
	},
	created(){
		this.getAreaList()
	},
	methods: {
		getAreaList(){
			areaAbout.getAreaList({

			}).then(res => {
				console.log('getAreaList-res', res)
				this.areaList = res.data
			}).catch(err => {
				console.log('getAreaList-err', err)
			})
		},
	},
	mounted(){
	}
}
</script>

<style lang="stylus" scoped>
.yqwz-container
	width 100%
	height 100%
	padding 0 .3rem
	margin-bottom .42rem
	background #fff
	ul
		margin-top .24rem
		li
			.top
				display flex
				justify-content space-between
				.l
					h5
						font-size .34rem
						color #000
						line-height .48rem
					p
						margin-top .08rem
						font-size .26rem
						color #888
						line-height .36rem
				button
					color #7C509D
			img
				margin-top .34rem
</style>