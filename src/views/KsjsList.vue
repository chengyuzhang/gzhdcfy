<template lang="pug">
.yfdt-container
	<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" >
		<div class="item" v-for="(item, index) in ksjsList" :key="index" @click="toDetailPage(item)">
			<div class="con">
				<div class="top">
					<div class="l">
						<h5>{{item.name}}</h5>
						<h6>{{item.areaName}}</h6>
					</div>
					<button @click="toPage(item)">去挂号</button>
				</div>
				<p>{{item.skill}}</p>
			</div>
		</div>
	</van-list>
</template>

<script>
import Item from '@/components/Item'
import { officeAbout } from '@/service/api.js'

export default {

	name: 'Yydt',

	data () {
		return {
			loading: false,
			finished: false,
			pageNo: 1,
			pageSize: 15,
			ksjsList: []
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
			return await officeAbout.getOfficeList({
				pageNo: this.pageNo,
				pageSize: this.pageSize,
			}).then(res => {
				let list = res.data
				if(!list.length) this.finished = true
				this.ksjsList = this.ksjsList.concat(list)
				this.pageNo ++
				this.loading = false
			}).catch(err => {
				console.log('getYydtInfoList-err'. err)
			})
		},
		toDetailPage(obj){
			console.log('obj', obj)
			this.$router.push({
				path: `/ksjs?id=${obj.id}`
			})
		},
		toPage(obj){
			this.$router.push({
				path: `/xzhy?id=${obj.id}`
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
	.van-list
		padding .26rem .3rem
		>>>.item-container
			padding .3rem 0
			border-bottom 1px solid #EEEEEE
		>>>.item-container:last-of-type
			border none
		.item
			width 100%
			padding-bottom 0 .32rem
			.con
				width 100%
				padding .2rem .32rem
				border-bottom 1px solid #eee
			.top
				display flex
				justify-content space-between
				align-items center
				.l
					h5
						margin-bottom: .18rem
						font-size: .32rem;
						font-weight: bold;
						color: #333333;
						line-height: .44rem;
					h6
						font-size: .22rem;
						font-weight: bold;
						color: #000000;
						line-height: .32rem;
				button
					width 1.02rem
					height .48rem
					line-height .48rem
					font-size .2rem
					text-align center
					color #fff
					border-radius .24rem
					background #7C509D
			p
				margin-top .16rem
				width 100%
				font-size: .22rem;
				font-weight: 500;
				color: #999999;
				line-height: .32rem;
				text-overflow: ellipsis;
				overflow hidden
</style>