<template lang="pug">
.jzrgl-container
	ul(v-if="isHas")
		li(v-for="(item, index) in jzrList" :key="item.id" @click="toPage(item)")
			p.one <span>{{item.name}}</span><i v-if="item.feeType == 1" class="zf">自费</i><i v-if="item.feeType == 2" class="ybbx">医保报销</i>
			p.two <span>门诊号码</span><i>0012376515</i>
			p.three <span>身份证号</span><i>{{item.idNo}}</i>
			img(src="@/assets/imgs/code.png" @click="toCodePage(item)")
	.none(v-if="!isHas")
		img(src="@/assets/imgs/none.png")
		p 暂无预约记录
	//- .btn
	//- 	button(@click="toAddPage")
</template>

<script>
import { Dialog, Toast } from 'vant'
import { patientAbout } from '@/service/api.js'

export default {

	name: 'jzrList',

	data () {
		return {
			isHas: true,
			jzrList: []
		}
	},
	async created(){
		this.getPatientList()
		this.id = this.$route.query.id
	},
	methods: {
		toPage(item){
			localStorage.setItem('jzrInfo', JSON.stringify(item))

			this.$router.push({
				path: `/ghqr?id=${this.id}`
			})
		},
		getPatientList(){
			patientAbout.getPatientList({
			}).then(res => {
				console.log('getPatientList-res', res)
				this.jzrList = res.data
			}).catch(err => {
				console.log('getPatientList-err', err)
			})
		},
		toCodePage(obj){
			this.$router.push({
				path: `/jzm?id=${obj.id}`
			})
		},
		// toAddPage(){
		// 	this.$router.push({
		// 		path: '/tjjzr'
		// 	})
		// }
	},
	mounted(){
	}
}
</script>

<style lang="stylus" scoped>
.jzrgl-container
	width 100%
	height 100%
	padding-bottom .44rem
	overflow hidden
	overflow-y auto
	background linear-gradient(180deg, #DBD3FA 0%, #F8F8F8 100%)
	ul
		margin-top .1rem
		padding 0 .18rem
		li
			position relative
			width 7.14rem
			height 2.54rem
			padding .42rem 0 .54rem .56rem
			background url('@/assets/imgs/card-bg.png')
			background-size contain
			p
				span
					margin-right .16rem
					font-size .28rem
					color #999
					line-height .4rem
				i
					font-size .28rem
					color #333
					line-height .4rem
			p.one
				span
					font-size .32rem
					color #333
					line-height .44rem
				i
					padding 0 .04rem
					font-size .24rem
					line-height .34rem
				i.zf
					color #64338E
					background #F5E8FF
				i.ybbx
					color #FF8336
					background #FFF4E8
			p.two
				margin-top .22rem
				margin-bottom .12rem
			img
				position absolute
				right .4rem
				top .42rem
				width .48rem
				height .48rem
			button
				position absolute
				right .4rem
				bottom .44rem
				width .94rem
				height .4rem
				line-height .4rem
				text-align center
				font-size .24rem
				color #999
				border-radius .2rem
				border 1px solid #aaa
	.btn
		margin-left .86rem
		margin-top .88rem
		width 5.78rem
		height 1.12rem
		button
			width 100%
			height 100%
			background url('@/assets/imgs/btn-bg.png') no-repeat
			background-size contain
	.none
		display flex
		flex-direction column
		align-items center
		>img
			margin-top 2.48rem
			width 3.44rem
			height auto
			object-fit contain
		>p
			font-size .28rem
			line-height .4rem
			color #999
</style>