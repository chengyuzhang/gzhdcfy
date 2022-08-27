<template lang="pug">
.yfxx-container
	<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" >
		Item(v-for="(item, index) in yfxxList" :item="item" :Event="toDetailPage")
	</van-list>
</template>

<script>
import Item from '@/components/Item'
import { newsAbout } from '@/service/api.js'

export default {

	name: 'Yfxx',

	data () {
		return {
			loading: false,
			finished: false,
			pageNo: 1,
			pageSize: 15,
			yfxxList: []
		}
	},
	components: {
		Item,
	},
	methods: {
		onLoad() {
			this.getYydtInfoList()
		},
		async getYydtInfoList(){
			return await newsAbout.getInfoList({
				type: 2,
				pageNo: this.pageNo,
				pageSize: this.pageSize,
			}).then(res => {
				let list = res.data
				if(!list.length) this.finished = true
				this.yfxxList = this.yfxxList.concat(list)
				this.pageNo ++
				this.loading = false
			}).catch(err => {
				console.log('getYydtInfoList-err'. err)
			})
		},
		toDetailPage(obj){
			console.log('obj', obj)
			this.$router.push({
				path: `/wzxq?id=${obj.id}`
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
	.van-list
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