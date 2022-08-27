<template lang="pug">
.wzxx-container
	h5 {{title}}
	.top
		.l
			img(:src="doctorPicture")
			.ll
				h5 {{doctorName}}
				p <i>{{doctorAcademic}}</i>{{doctorOffice}}
		p.r {{updateTime}}
	.con(v-html="content")
</template>

<script>
import { newsAbout } from '@/service/api.js'

export default {

	name: 'Wzxq',

	data () {
		return {
			id: 0,
			doctorAcademic: '',
			doctorName: '',
			doctorOffice: '',
			doctorPicture: '',
			updateTime: '',
			content: '',
			title: ''
		}
	},
	created(){
		this.id = this.$route.query.id
		this.getInfoDetail()
	},
	methods: {
		getInfoDetail(){
			newsAbout.getInfoDetail({
				id: this.id
			}).then(res => {
				console.log('getInfoDetail-res', res)
				this.doctorAcademic = res.data.doctorAcademic
				this.doctorName = res.data.doctorName
				this.doctorOffice = res.data.doctorOffice
				this.doctorPicture = res.data.doctorPicture
				this.content = res.data.content
				this.updateTime = res.data.updateTime
				this.title = res.data.title
			}).catch(err => {
				console.log('getInfoDetail-err'. err)
			})
		},
	}
}
</script>

<style lang="stylus" scoped>
.wzxx-container
	width 100%
	height 100%
	padding 0 .3rem
	padding-top .5rem
	background #fff
	overflow hidden
	overflow-y auto
	h5
		font-size .36rem
		color #000
		line-height .5rem
	.top
		display flex
		justify-content space-between
		align-items center
		margin-top .48rem
		.l
			display flex
			align-items center
			img
				margin-right .2rem
				width .68rem
				height .68rem
			.ll
				h5
					font-size .28rem
					color #000
					line-height .4rem
				p
					font-size .24rem
					color #333
					line-height .34rem
					i
						margin-right .18rem
						padding .04rem
						font-size .2rem
						color #535353
						line-height .26rem
						background #E8E8E8
		p.r
			font-size .26rem
			color #999
			line-height .3rem
	.con
		margin-top .48rem
		p
			margin-bottom .6rem
			font-size .28rem
			color #444
			line-height .48rem
		img
			margin-bottom .6rem
</style>