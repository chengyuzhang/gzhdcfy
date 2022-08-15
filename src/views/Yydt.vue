<template lang="pug">
.yfdt-container
	<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" >
		Item(v-for="(item, index) in yydtList" :item="item" :Event="toDetailPage")
	</van-list>
	//- .items
	//- 	Item(v-for="item in 20" :Event="toDetailPage")
</template>

<script>
import Item from '@/components/Item'
import { index } from '@/service/api.js'

export default {

	name: 'Yydt',

	data () {
		return {
			loading: false,
			finished: false,
			pageNo: 1,
			pageSize: 15,
			yydtList: []
		}
	},
	components: {
		Item,
	},
	async created(){
		// this.getYydtInfoList()
	},
	methods: {
		onLoad() {
			this.getYydtInfoList()
		},
		async getYydtInfoList(){
			return await index.getInfoList({
				type: 1,
				pageNo: this.pageNo,
				pageSize: this.pageSize,
			}).then(res => {
				let list = res.data
				if(!list.length) this.finished = true
				this.yydtList = this.yydtList.concat(list)
				this.pageNo ++
				this.loading = false
			}).catch(err => {
				console.log('getYydtInfoList-err'. err)
			})
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