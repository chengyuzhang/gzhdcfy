<template lang="pug">
.tjbgxq-container
	//- h5 东城妇幼保健院(南区)
	//- .top
	//- 	ul
	//- 		li
	//- 			span 姓名
	//- 			i {{tjgr && tjgr.brxm}}
	//- 		li
	//- 			span 检测名称
	//- 			i {{tjgr && tjgr.tjmc}}
	//- 		li
	//- 			span 时间
	//- 			i {{tjgr && tjgr.tjrq}}
	//- ul
	//- 	li.bar <span>项目</span><i>结果</i><em>单位</em><b>参考范围</b>
	//- 	li(v-for="(item, index) in jgList") <span>{{item.xmmc}}</span><i>{{item.xmjg}}</i><em>{{item.xmdw}}</em><b>{{item.ckfw}}</b>
	.top
		img(:src="pathoUrl")
	.btn
		button <a target="_blank" :href="pdfUrl">下载PDF</a> 
</template>

<script>
import { bgAbout, apiUrl } from '@/service/api.js'

export default {

	name: 'Tjbgxq',

	data () {
		return {
			blbm: '',
			tjgr: null,
			jgList: [],
			pdfUrl: '',
			pathoUrl: ''
		}
	},
	created(){
		this.blbm = this.$route.query.blbm
		this.getBlbgDetail()

		let pdfUrl = `${apiUrl.baseURL}/patho/pathoPdf?pathoId=${this.blbm}`
		this.pdfUrl = pdfUrl
	},
	methods: {
		getBlbgDetail(){
			bgAbout.getBlbgDetail({
				pathoId: this.blbm
			}).then(res => {
				console.log('getBlbgDetail-res', res)
				this.pathoUrl = res.data.pathoUrl
			}).catch(err => {
				console.log('getBlbgDetail-err'. err)
			})
		},
	}
}
</script>

<style lang="stylus" scoped>
.tjbgxq-container
	width 100%
	height 100%
	background #F8F8F8
	h5
		padding .2rem .3rem
		font-size .28rem
		color #000
		line-height .4rem
	.top
		ul
			padding 0 .3rem
			padding-top .32rem
			background #fff
			overflow hidden
			li
				display flex
				justify-content space-between
				margin-bottom .32rem
				span
					font-size .3rem
					color #999
					line-height .42rem
				i
					font-size .3rem
					color #666
					line-height .42rem
	>ul
		margin-top .32rem
		padding-top .36rem
		background #fff
		overflow hidden
		li
			display flex
			align-items center
			margin-bottom .38rem
			padding 0 .32rem
			span,i,em,b
				font-size .26rem
				color #999
				line-height .36rem
			span
				margin-right .4rem
				width 2rem
			i
				margin-right .8rem
				width 1.2rem
			em
				margin-right .26rem
				width 1rem
			b
				width 1.2rem
		li.bar
			span,i,em,b
				font-size .3rem
				color #333
				line-height .42rem
	.btn
		margin-top .5rem
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
</style>