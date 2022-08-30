<template lang="pug">
.jzm-container
	h6 {{name}} {{idNo}}
	img(id="barcode")
	p <i>门诊号码</i><em>{{hisMzhm}}</em>
</template>

<script>
import JsBarcode from 'jsbarcode'
import { patientAbout } from '@/service/api.js'
export default {

	name: 'Jzm',

	data () {
		return {
			id: '',
			hisMzhm: '',
			name: '',
			idNo: ''
		}
	},
	async created(){
		this.id = this.$route.query.id
		await this.getPatientDetail()
		this.makeCode()
	},
	methods: {
		async getPatientDetail(){
			await patientAbout.getPatientDetail({
				id: this.id
			}).then(res => {
				console.log('getPatientDetail-res', res)
				this.hisMzhm = res.data.hisMzhm
				this.name = res.data.name
				this.idNo = res.data.idNo
			}).catch(err => {
				console.log('getPatientDetail-err', err)
			})
		},
		makeCode(){
			JsBarcode('#barcode', this.hisMzhm, {
				height: 65,
				fontSize: 13,
				displayValue: false
			})
		},
	}
}
</script>

<style lang="stylus" scoped>
.jzm-container
	display flex
	flex-direction column
	align-items center
	h6
		margin-top .92rem
		font-size .28rem
		color #333
		line-height .40rem
		font-weight bold
	img
		margin-top 1.18rem
		margin-bottom .24rem
		width 6.5rem
		height 1.6rem
	p
		font-size .28rem
		color #333
		line-height .40rem
		font-weight bold
		i
			margin-right .1rem
</style>