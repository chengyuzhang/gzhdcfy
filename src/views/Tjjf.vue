<template lang="pug">
<div class="tjjf-container">
	<p @click="toPage">查询缴费记录<img src="@/assets/imgs/r.png" alt=""></p>
	<ul>
		<li v-for="(item, index) in list">
			<h5 @click="toPay(item.id)"><span>{{item.productName}}</span><img src="@/assets/imgs/pay.png" alt=""></h5>
			<div>
				<p class="title"><span>项目</span><i>{{item.productContent}}</i></p>
				<p class="num"><span>金额</span><i>￥{{item.productFee}}</i></p>
			</div>
		</li>
	</ul>
</div>
</template>

<script>
import { orderAbout } from '@/service/api.js'

export default {

  name: 'Tjjf',

  data () {
    return {
    	list: []
    }
  },
  created(){
  	this.getList()
  },
  methods: {
  	toPage(){
  		this.$router.push({
  			path: `/jfjl`
  		})
  	},
  	toPay(id){
  		this.$router.push({
  			path: `/tjjf-form?id=${id}`
  		})
  	},
  	async getList(){
			await orderAbout.prodList({
			}).then(res => {
				console.log('orderAbout-res', res)
				this.list = res.data
			}).catch(err => {
				console.log('orderAbout-err', err)
			})
		},
  }
}
</script>

<style lang="stylus" scoped>
.tjjf-container{
	padding: 0 .34rem;
	width: 100%;
	height: 100%;
	overflow: hidden;
	overflow-y: auto;
	background: #F8F8F8;
}
.tjjf-container>p{
	display: flex;
	justify-content: flex-end;
	align-items: center;
	margin-top: .14rem;
	margin-bottom: .18rem;
	font-size: .26rem;
	font-weight: bold;
	color: #444444;
	line-height: .36rem;
}
.tjjf-container>p img{
	margin-left: .1rem;
	width: .28rem;
	height: .28rem;
}
.tjjf-container ul{}
.tjjf-container li{
	margin-bottom: .3rem;
	background: #fff;
	border-radius: .2rem;
}
.tjjf-container li h5{
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 1rem;
	padding: 0 .3rem;
	background: linear-gradient(133deg, #FFFFFF 0%, #F7F2FF 100%);
}
.tjjf-container li h5 span{
	font-size: .32rem;
	font-weight: bold;
	color: #333333;
	line-height: .44rem;
}
.tjjf-container li h5 img{
	width: 1.84rem;
	height: .5rem;
}
.tjjf-container li div{
	padding: 0 .3rem;
	overflow: hidden;
}
.tjjf-container li div p{
	display: flex;
}
.tjjf-container li div p.num{
	margin-top: .26rem;
}
.tjjf-container li div p span{
	margin-right: .16rem;
	font-size: .26rem;
	font-weight: 400;
	color: #666666;
	line-height: .44rem;
}
.tjjf-container li div p i{
	width: 5.54rem;
	font-size: .28rem;
	font-weight: 400;
	color: #222222;
	line-height: .44rem;
}
.tjjf-container li div p.num{
	margin-bottom: .28rem;
	justify-content: space-between;
}
.tjjf-container li div p.num i{
	width: auto;
}
</style>