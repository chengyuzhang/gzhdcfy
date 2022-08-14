<template lang="pug">
.yfdt-container
	<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" >
		Item(v-for="item in 20" :Event="toDetailPage")
	</van-list>
	//- .items
	//- 	Item(v-for="item in 20" :Event="toDetailPage")
</template>

<script>
import Item from '@/components/Item'

export default {

	name: 'Yydt',

	data () {
		return {
			loading: false,
			finished: false,
		}
	},
	components: {
		Item,
	},
	methods: {
		onLoad() {
			setTimeout(() => {
				// this.loading = false
			}, 1000)

			// setTimeout(() => {
			// 	this.finished = true
			// }, 3000)
			
		},
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