<template>
<div class="jfjl-container">
	<ul>
		<li>
			<p><span>龋易感检测</span><i>￥120</i></p>
			<p><span>张天天</span><i>2022-05-07 13:38</i></p>
		</li>
		<li>
			<p><span>龋易感检测</span><i>￥120</i></p>
			<p><span>张天天</span><i>2022-05-07 13:38</i></p>
		</li>
		<li>
			<p><span>龋易感检测</span><i>￥120</i></p>
			<p><span>张天天</span><i>2022-05-07 13:38</i></p>
		</li>
	</ul>
</div>
</template>

<script>
export default {

  name: 'Jfjl',

  data () {
    return {

    }
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