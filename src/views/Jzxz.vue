<template lang="pug">
.jzxz-container
	ul
		li(v-for="(item, index) in jzxzList" @click="toPage(item.id)")
			h5 {{item.title}}
			p {{item.intro}}
</template>

<script>
import { noticeAbout } from '@/service/api.js'

export default {

	name: 'Jzxz',

	data () {
		return {
			jzxzList: [],
		}
	},
	created(){
		this.getJzxzList()
	},
	methods: {
		getJzxzList(){
			noticeAbout.getJzxzList({
			}).then(res => {
				console.log('getJzxzList-res', res)
				this.jzxzList = res.data
			}).catch(err => {
				console.log('getJzxzList-err'. err)
			})
		},
		toPage(id){
			let path = ''

			switch(id){
				case 1:
					path = `/ghlc?id=${id}`
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