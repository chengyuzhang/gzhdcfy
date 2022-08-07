<template lang="pug">
.yfxx-container
	.items
		Item(v-if="items.length" v-for="item in items" :Event="toDetailPage")
		img(src="@/assets/imgs/none.png" v-if="!items.length")
		p(v-if="!items.length") 暂时没有文章
</template>

<script>
import Item from '@/components/Item'

export default {

	name: 'Yfxx',

	data () {
		return {
			items: [
				{},{},{},{},{},{},{},{}
			]
		}
	},
	components: {
		Item,
	},
	methods: {
		toDetailPage(){
			this.$router.push({
				path: '/wzxq'
			})
		},
	}
}
</script>

<style lang="stylus" scoped>
.yfxx-container
	width 100%
	height 100%
	overflow hidden
	overflow-y auto
	.items
		display flex
		flex-direction column
		align-items center
		justify-content center
		padding 0 .3rem
		>>>.item-container
			padding .3rem 0
			border-bottom 1px solid #EEEEEE
		>>>.item-container:last-of-type
			border none
		>img
			margin-top 2.48rem
			width 3.44rem
		>p
			font-size .28rem
			line-height .4rem
			color #999
</style>