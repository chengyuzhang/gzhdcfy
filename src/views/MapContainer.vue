<template>
	<div id="container"></div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader'

export default {

	name: 'MapContainer',

	data () {
		return {
			map:null,
		}
	},
	methods:{
		getGps(){
			var _this = this;
			if(navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(
					//locationSuccess 获取成功的话
					function(position) {
						_this.getLongitude = position.coords.longitude;
						_this.getLatitude = position.coords.latitude;
						console.log(_this.getLongitude, _this.getLatitude)

					},
					//locationError  获取失败的话
					function(error) {
						var errorType = ['您拒绝共享位置信息', '获取不到位置信息', '获取位置信息超时'];
						alert(errorType[error.code - 1]);
					}
				);
			}
		},
		initMap(){
			let _this = this
			AMapLoader.load({
				key:"9881f54fcf6190e4adf3b4bd864b940c",             // 申请好的Web端开发者Key，首次调用 load 时必填
				version:"2.0",      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
				plugins:[''],       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
			}).then((AMap)=>{
				_this.map = new AMap.Map("container",{  //设置地图容器id
					// viewMode:"3D",    //是否为3D地图模式
					// zoom:10,           //初始化地图级别
					resizeEnable: true
				})

				//获取定位信息
				AMap.plugin('AMap.Geolocation', function() {
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
					_this.map.addControl(geolocation)
					geolocation.getCurrentPosition(function(status,result){
						if(status=='complete'){
							onComplete(result)
						}else{
							onError(result)
						}
					});

					function onComplete (data) {
						console.log('data', data)
						// data是具体的定位信息
					}

					function onError (err) {
						console.log('err', err)
						// 定位出错
					}
				})


				// location.href = `https://uri.amap.com/navigation?from=116.478346,39.997361,startpoint&to=116.3246,39.966577,endpoint&via=116.402796,39.936915,midwaypoint&mode=car&policy=1&src=mypage&coordinate=gaode&callnative=0`

			}).catch(e=>{
				console.log(e);
			})
		},
	},
	mounted(){
		//DOM初始化完成进行地图初始化
		this.initMap()
	}
}
</script>

<style lang="css" scoped>
#container{
	padding:0px;
	margin: 0px;
	width: 100%;
	height: 800px;
}
</style>