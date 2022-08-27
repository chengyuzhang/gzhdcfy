<template lang="pug">
.yyjj-container
	//- img(v-if="tabIndex == 0" :src="picture")
	//- img(v-if="tabIndex == 1" :src="picture")
	img(:src="picture")
	.tab
		ol
			li(@click="changeTab(0)" :class="{'active': tabIndex == 0}") <i>北区</i><span></span>
			li(@click="changeTab(1)" :class="{'active': tabIndex == 1}") <i>南区</i><span></span>
		ul
			li
				.con(v-html="intro")
			//- li(v-if="tabIndex == 0")
			//- 	.con(v-html="intro")
			//- li(v-if="tabIndex == 1")
			//- 	.con(v-html="intro")
</template>

<script>
import { areaAbout } from '@/service/api.js'

export default {

	name: 'Yyjj',

	data () {
		return {
			tabIndex: 0,
			id: 2,
			intro: '',
			picture: ''
		}
	},
	created(){
		this.getAreaDetail()
	},
	methods: {
		changeTab(idx){
			this.tabIndex = idx

			if(idx == 0){
				this.id = 2
			}else{
				this.id = 1
			}

			this.getAreaDetail()
		},
		getAreaDetail(){
			areaAbout.getAreaDetail({
				id: this.id
			}).then(res => {
				console.log('getAreaDetail-res', res)
				this.intro = res.data.intro
				this.picture = res.data.picture
			}).catch(err => {
				console.log('getAreaDetail-err', err)
			})
		},
	}
}
</script>

<style lang="stylus" scoped>
.yyjj-container
	width 100%
	height 100%
	background #fff
	overflow hidden
	overflow-y auto
	img
		width 100%
		height 3rem
	.tab
		position relative
		z-index 2
		margin-top -.2rem
		width 100%
		padding 0 .3rem
		border-radius .2rem
		background #fff
		ol
			display flex
			width 100%
			padding-left .3rem
			li
				position relative
				margin-right .8rem
				padding-top .32rem
				padding-bottom .44rem
				i
					font-size .3rem
					line-height .42rem
					color #999
					transition all .2s
				span
					position absolute
					left 50%
					bottom .3rem
					transform translateX(-50%)
					width .4rem
					height .08rem
					background #9286E9
					border-radius .04rem
					opacity 0
					transition all .2s
			li.active
				i
					font-weight 600
					font-size .36rem
					line-height .5rem
					color #333
				span
					opacity 1
		ul
			li
				>>>p
					margin-bottom .5rem
					font-size .28rem
					line-height .44rem
					color #444

</style>