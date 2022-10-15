<template lang="pug">
.jcjgxq-container
	//- h5 东城妇幼保健院(南区)
	.top
		ul
			li
				span 姓名
				i {{brxm}}
			li
				span 检测名称
				i {{jymc}}
			li
				span 时间
				i {{jyrq}}
	ul
		li.bar <span>项目</span><i>结果</i><em>单位</em><b>参考范围</b>
		li(v-for="(item, index) in mxList") <span>{{item.xmmc}}</span><i>{{item.xmjg}}</i><em>{{item.xmdw}}</em><b v-if="item.ckdz && item.ckgz">{{item.ckdz}}-{{item.ckgz}}</b><b v-else-if="item.ckdz && !item.ckgz">{{item.ckdz}}</b><b v-else="!item.ckdz && item.ckgz">{{item.ckgz}}</b>
	.btn
		button 下载PDF
</template>

<script>
import { patientAbout, bgAbout } from '@/service/api.js'

export default {

	name: 'Jcjgxq',

	data () {
		return {
			sampleno: '',
			brxm: '',
			jymc: '',
			jyrq: '',
			mxList: []
		}
	},
	created(){
		this.sampleno = this.$route.query.sampleno
		this.getJybgDetail()
	},
	methods: {
		getJybgDetail(){
			bgAbout.getJybgDetail({
				sampleno: this.sampleno
				// patientId: 33
			}).then(res => {
				console.log('getJybgDetail-res', res)
				let data = res.data
				this.brxm = data.brxm
				this.jymc = data.jymc
				this.jyrq = data.jyrq
				this.mxList = data.mxList
			}).catch(err => {
				console.log('getJybgDetail-err'. err)
			})
		},
	}
}
</script>

<style lang="stylus" scoped>
.jcjgxq-container
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
				margin-right 1rem
				width 2rem
			i
				margin-right .8rem
				width .6rem
			em
				margin-right .66rem
				width .6rem
			b
				width 1.2rem
				text-align end
		li.bar
			span,i,em,b
				font-size .3rem
				color #333
				line-height .42rem
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
</style>