<template lang="pug">
.ksys-container
	ul
		li(v-for="(item, index) in doctorList" @click="toPage(item)")
			img(:src="item.headPic")
			.r
				h5 {{item.name}}<i>{{item.academic}}</i>
				h6 {{item.areaName}} {{item.officeName}}
				p 擅长：{{item.skill}}
</template>

<script>
import { officeAbout, doctotAbout } from '@/service/api.js'

export default {

name: 'ksysList',

	data () {
		return {
			doctorList: []
		}
	},
	created(){
		this.getDoctorList()
	},
	methods: {
		getDoctorList(){
			doctotAbout.getDoctorList({
				pageNo: 1,
				pageSize: 10
			}).then(res => {
				console.log('getDoctorList-res', res)
				this.doctorList = res.data.records
			}).catch(err => {
				console.log('getDoctorList-err', err)
			})
		},
		toPage(obj){
			this.$router.push({
				path: `/zjjsxq?id=${obj.id}`
			})
		}
	}
}
</script>

<style lang="stylus" scoped>
.ksys-container
	ul
		padding 0 .3rem
		li
			display flex
			padding-top .28rem
			img
				margin-right .3rem
				width 1.08rem
				height 1.08rem
			.r
				padding-bottom .32rem
				border-bottom 1px solid #EEEEEE
				h5
					margin-bottom .16rem
					font-size .32rem
					line-height .44rem
					color #333
					i
						margin-left .16rem
						font-size .22rem
				h6
					margin-bottom .16rem
					font-size .22rem
					line-height .44rem
					color #000
				p
					width 5rem
					font-size .22rem
					line-height .32rem
					color #999
					-webkit-line-clamp 2
					text-overflow ellipsis
					display -webkit-box
					-webkit-box-orient vertical
					overflow hidden
</style>