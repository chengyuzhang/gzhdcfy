<template lang="pug">
.ysjsxq-container
	.con
		.top
			img(:src="headPic")
			.r
				h5 {{name}}
				h6 <i>{{academic}}</i>{{officeName}}
				p {{areaName}}
		.bottom
			h5 擅长疾病
			p {{skill}}
			h5(style="margin-top: .48rem") 医生介绍
			p {{intro}}
	.btn
		button(@click="toPage") 去挂号

</template>

<script>
import { doctotAbout } from '@/service/api.js'

export default {

	name: 'Ysjsxq',

	data () {
		return {
			id: '',
			academic: '',
			name: '',
			areaName: '',
			skill: '',
			intro: '',
			officeName: '',
			headPic: ''
		}
	},
	created(){
		this.id = this.$route.query.id
		this.getDoctorDetail()
	},
	methods: {
		async getDoctorDetail(){
			await doctotAbout.getDoctorDetail({
				id: this.id
			}).then(res => {
				console.log('getDoctorDetail-res', res)
				this.academic = res.data.academic
				this.name = res.data.name
				this.areaName = res.data.areaName
				this.skill = res.data.skill
				this.intro = res.data.intro
				this.officeName = res.data.officeName
				this.headPic = res.data.headPic

			}).catch(err => {
				console.log('getDoctorDetail-err', err)
			})
		},
		toPage(){
			this.$router.replace({
				path: '/'
			})
		}
	}
}
</script>

<style lang="stylus" scoped>
.ysjsxq-container
	width 100%
	height 100%
	background linear-gradient(180deg, #DBD3FA 0%, #F8F8F8 100%)
	overflow hidden
	.con
		margin 0 auto
		margin-top .32rem
		width 6.9rem
		padding .3rem
		padding-top .4rem
		background #fff
		border-radius .2rem
		.top
			display flex
			align-items center
			img
				margin-right .32rem
				width 1.08rem
				height 1.08rem
			.r
				h5
					font-size .36rem
					line-height .5rem
					color #000
				h6
					margin .08rem 0
					font-size .24rem
					line-height .34rem
					color #333
					i
						margin-right .04rem
						padding 0 .02rem
						color #64338E
						border 1px solid #64338E
						border-radius .02rem
				p
					font-size .24rem
					line-height .34rem
					color #333
		.bottom
			margin-top .44rem
			h5
				margin-bottom .16rem
				font-size .28rem
				line-height .4rem
				color #333
			p
				font-size .24rem
				line-height .34rem
				color #888
	.btn
		margin-top .88rem
		width 100%
		height 1.16rem
		line-height 1.16rem
		text-align center
		border-top 1px solid #eee
		overflow hidden
		button
			width 5.5rem
			height .84rem
			line-height .84rem
			font-size .28rem
			color #fff
			background #7C509D
			border-radius .4rem
</style>