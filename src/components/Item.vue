<template lang="pug">
.item-container(@click="toPage")
	.l
		h5 {{dataItem.title}}
		p {{dataItem.intro}}
	.r
		img(v-if="dataItem.picture" :src="dataItem.picture")
		img(v-else src="@/assets/imgs/img-bg.png")
</template>

<script>
export default {

	name: 'Item',
	props: ['Event', 'item'],
	data () {
		return {
			dataItem: []
		}
	},
	created(){
		this.dataItem = this.item || {}
		console.log('item', this.item)
	},
	methods: {
		toPage(){
			this.Event(this.item)
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