<template lang="pug">
.jzjlxq-container
	.wrap(v-if="isHas")
		h5 {{areaName}}
		.con
			div
				.l
					h6 {{mzxx&&mzxx.ysmc}}
					p <i>{{mzxx&&mzxx.ksmc}}</i><span>{{mzxx&&mzxx.jzrq}}</span>
				p {{mzxx&&mzxx.jbmc}}
		ul
			li(v-if="jcmc")
				h6 检查:
				p {{jcmc}}
			li
				h6 诊断:
				p {{mzxx.jbmc}}
			li(v-if="ypList.length")
				h6 处理:
				p.spe(v-for="(item, index) in ypList")
					i {{item.fymc}}
					span {{item.jldw}}
					em {{item.ypyf}}
					b {{item.sypc}}
		.btn
			button <a target="_blank" :href="pdfUrl">下载就诊记录PDF</a> 
	.none(v-if="!isHas")
		img(src="@/assets/imgs/none.png")
		p 网络未连接请检查网络
</template>

<script>
import { jzjlAbout, apiUrl } from '@/service/api.js'

export default {

	name: 'Jzjlxq',

	data () {
		return {
			isHas: true,
			jzxh: '',
			areaName: '',
			mzxx: null,
			jcmc: '',
			ypList: [],
			pdfUrl: ''
		}
	},
	created(){
		this.jzxh = this.$route.query.jzxh
		this.getJzjlDetail()
		
		let pdfUrl = `${apiUrl.baseURL}/mz/mzmxPdf?jzxh=${this.jzxh}`
		this.pdfUrl = pdfUrl
	},
	methods: {
		getJzjlDetail(){
			jzjlAbout.getJzjlDetail({
				jzxh: this.jzxh
			}).then(res => {
				console.log('getJzjlDetail-res', res)
				let data = res.data
				this.areaName = data.areaName
				this.mzxx = data.mzxx
				this.ypList = data.ypList
				this.jcmc = data.jcmc
			}).catch(err => {
				console.log('getJzjlDetail-err'. err)
			})
		},
	}
}
</script>

<style lang="stylus" scoped>
.jzjlxq-container
	width 100%
	height 100%
	background #F8F8F8
	.wrap
		h5
			width 100%
			height .8rem
			padding 0 .3rem
			line-height .8rem
			font-size .28rem
			color #000
		.con
			padding 0 .3rem
			background #fff
			>div
				display flex
				justify-content space-between
				align-items center
				height 1.6rem
				border-bottom 1px solid #EEEEEE
				.l
					h6
						font-size .28rem
						line-height .36rem
						color #000
					p
						margin-top .2rem
						i
							margin-right .2rem
							font-size .26rem
							line-height .36rem
							color #000
							font-weight 400
						span
							font-size .26rem
							line-height .3rem
							color #999
		>ul
			padding 0 .3rem
			background #fff
			li
				padding .32rem 0
				h6
					font-size .28rem
					line-height .48rem
					color #444
				p
					font-size .28rem
					font-weight 400
					line-height .48rem
					color #666
				p.spe
					display flex
					justify-content space-between
					align-items center
					i
						font-weight 500 !important
						width 3rem
		.btn
			margin-top .88rem
			width 100%
			height 1.16rem
			line-height 1.16rem
			text-align center
			// border-top 1px solid #eee
			overflow hidden
			button
				width 5.5rem
				height .84rem
				line-height .84rem
				font-size .28rem
				color #fff
				background #7C509D
				border-radius .4rem
				a
					display block
					width 100%
					height 100%
					line-height .84rem
	.none
		display flex
		flex-direction column
		align-items center
		>img
			margin-top 2.48rem
			width 3.44rem
		>p
			font-size .28rem
			line-height .4rem
			color #999
		button
			margin-top .68rem
			width 5.5rem
			height .84rem
			line-height .84rem
			font-size .28rem
			color #fff
			background #7C509D
			border-radius .4rem
</style>