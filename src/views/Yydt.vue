<template lang="pug">
.yfdt-container
	.items
		Item(v-for="item in 20" :Event="toDetailPage")
</template>

<script>
import Item from '@/components/Item'

export default {

	name: 'Yydt',

	data () {
		return {

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
.yfdt-container
	width 100%
	height 100%
	overflow hidden
	overflow-y auto
	.items
		padding 0 .3rem
		>>>.item-container
			padding .3rem 0
			border-bottom 1px solid #EEEEEE
		>>>.item-container:last-of-type
			border none
</style>