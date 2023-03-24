<template>
<div class="jfjl-container">
	<ul>
		<li v-for="(item, index) in list">
			<p><span>{{item.productName}}</span><i>￥{{item.productFee}}</i></p>
			<p><span>{{item.childName}}</span><i>{{item.createTime}}</i></p>
		</li>
	</ul>
</div>
</template>

<script>
import { orderAbout } from '@/service/api.js'

export default {

  name: 'Jfjl',

  data () {
    return {
    	list: []
    }
  },
  created(){
  	this.getUserOrderList()
  },
  methods: {
  	async getUserOrderList(){
			await orderAbout.userOrderList({
			}).then(res => {
				console.log('getUserOrderList-res', res)
				this.list = res.data
			}).catch(err => {
				console.log('getUserOrderList-err', err)
			})
		},
  }
}
</script>

<style lang="css" scoped>
.jfjl-container{
	padding: .34rem 0;
	width: 100%;
	height: 100%;
	overflow: hidden;
	overflow-y: auto;
	background: #F8F8F8;
}
.jfjl-container ul{
	padding: 0 .34rem;
	background: #fff;
}
.jfjl-container ul li{
	padding: .34rem 0;
	border-bottom: 1px solid #eee;
}
.jfjl-container ul li p{
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.jfjl-container ul li p span{
	font-size: .26rem;
	font-weight: 500;
	color: #000000;
	line-height: .36rem;
}
.jfjl-container ul li p i{
	font-size: .32rem;
	font-weight: 500;
	color: #000;
	line-height: .44rem;
}
.jfjl-container ul li p:last-of-type{
	margin-top: .2rem;
}
.jfjl-container ul li p:last-of-type span{
	font-size: .26rem;
	font-weight: 400;
	color: #000000;
	line-height: .36rem;
}
.jfjl-container ul li p:last-of-type i{
	font-size: .26rem;
	color: #999999;
	line-height: .3rem;
}
</style>