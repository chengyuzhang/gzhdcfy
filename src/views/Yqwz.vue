<template lang="pug">
.yqwz-container
	ul
		li(v-for="(item, index) in areaList")
			.top
				.l
					h5 东城妇幼保健院({{item.shortName}})
					p 院区地址：{{item.address}}
					p 联系电话：{{item.contact}}
				button(@click="toNav(item)") 导航
			img(:src="item.picture")
</template>

<script>
import { areaAbout } from '@/service/api.js'
import AMapLoader from '@amap/amap-jsapi-loader'

export default {

	name: 'Yqwz',

	data () {
		return {
			areaList: [],
			targetZone: null,
			curLocation: [116.414427,39.918954]
		}
	},
	created(){
		this.getAreaList()
		this.initMap()
	},
	methods: {
		getAreaList(){
			areaAbout.getAreaList({

			}).then(res => {
				console.log('getAreaList-res', res)
				this.areaList = res.data
			}).catch(err => {
				console.log('getAreaList-err', err)
			})
		},
		initMap(){
			let _this = this

			return new Promise((resolve, reject) => {
				AMapLoader.load({
					key:"9881f54fcf6190e4adf3b4bd864b940c",             // 申请好的Web端开发者Key，首次调用 load 时必填
					version:"2.0",      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
					plugins:['AMap.Geolocation'],       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
				}).then((AMap)=>{
					// _this.map = new AMap.Map("container",{  //设置地图容器id
					// 	// viewMode:"3D",    //是否为3D地图模式
					// 	// zoom:10,           //初始化地图级别
					// 	resizeEnable: true
					// })

					//获取定位信息
					var geolocation = new AMap.Geolocation({
						// 是否使用高精度定位，默认：true
						enableHighAccuracy: true,
						// 设置定位超时时间，默认：无穷大
						timeout: 10000,
						// 定位按钮的停靠位置的偏移量
						offset: [10, 20],
						//  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
						zoomToAccuracy: true,
						//  定位按钮的排放位置,  RB表示右下
						position: 'RB'
					})
					// _this.map.addControl(geolocation)
					geolocation.getCurrentPosition(function(status,result){
						if(status=='complete'){
							onComplete(result)
							// _this.curLocation = result.position
							resolve()
						}else{
							reject()
							onError(result)
						}
					})

					function onComplete (data) {
						console.log('data', data)
						// data是具体的定位信息
					}

					function onError (err) {
						console.log('err', err)
						// 定位出错
					}


					// location.href = `https://uri.amap.com/navigation?from=[${this.curLocation[0]}, ${this.curLocation[1]}],startpoint&to=116.3246,39.966577,endpoint&via=116.402796,39.936915,midwaypoint&mode=car&policy=1&src=mypage&coordinate=gaode&callnative=0`

				}).catch(e=>{
					console.log(e);
				})
			})

		},
		toNav(obj){
			console.log('obj', obj)
			// location.href = `https://uri.amap.com/navigation?from=[${this.curLocation[0]}, ${this.curLocation[1]}],startpoint&to=${obj.latitude},${obj.longitude},endpoint&mode=car&policy=0&src=mypage&coordinate=gaode&callnative=1`

			location.href = `https://uri.amap.com/navigation?from=116.365942,39.908516,startpoint&to=${obj.latitude},${obj.longitude},endpoint&mode=car&policy=1&src=mypage&coordinate=gaode&callnative=1`
		}
	},
	mounted(){
	}
}
</script>

<style lang="stylus" scoped>
.yqwz-container
	width 100%
	height 100%
	padding 0 .3rem
	margin-bottom .42rem
	background #fff
	ul
		margin-top .24rem
		li
			.top
				display flex
				justify-content space-between
				.l
					h5
						font-size .34rem
						color #000
						line-height .48rem
					p
						margin-top .08rem
						font-size .26rem
						color #888
						line-height .36rem
				button
					color #7C509D
			img
				margin-top .34rem
</style>