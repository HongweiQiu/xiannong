<template>
	<view id="test">
		<uni-nav-bar left-icon="arrowleft" right-text="确定" title="选择地址" :status-bar="navBar" fixed="true" @clickLeft="leftClick"
		 @clickRight="rightClick"></uni-nav-bar>
		<view @click="test" class="test">
			<image src="../../static/img/nav.png" mode=""></image>
		</view>
		<iframe id="mapPage" width="100%" height="100%" frameborder=0 :src="a">
		</iframe>

	</view>
</template>

<script>
	// #ifdef H5
	var wx = require('jweixin-module');
	// #endif
	import md5 from '../../static/js/md5.js';
	import rs from '../../static/js/request.js';
	let {
		log
	} = console;
	const app = getApp().globalData;
	const {
		appid,
		appsecret,
		imgRemote,
		navBar
	} = app;
	export default {
		data() {
			return {
				navBar: navBar,
				contact: '',
				mobile: '',
				address: '',
				details: '',
				lat: '',
				lng: '',
				a: ''
			}
		},
		methods: {
			leftClick() {
				uni.navigateTo({
					url: `userAddress?contact=${this.contact}&mobile=${this.mobile}&address=${this.address}&details=${this.details}&lat=${this.lat}&lng=${this.lng}&count=2`
				})
			},
			rightClick() {
				if (this.address1) {
					uni.navigateTo({
						url: `userAddress?contact=${this.contact}&mobile=${this.mobile}&address=${this.address}&details=${this.details}&lat=${this.lat}&lng=${this.lng}&count=2`
					})
				}
			},
			test() {
				window.location.reload();
			},
			wxConfig() {
				var timeStamp = Math.round(new Date().getTime() / 1000);
				let obj = {
					appid: appid,
					timeStamp: timeStamp
				};
				let sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
				let params = Object.assign({
					sign: sign
				}, obj)
				rs.getRequests("wxConfig", params, (response) => {
					if (response.code == 200) {
						wx.config({
							debug: true, // 开启调试模式
							appId: response.data.appId, // 必填，公众号的唯一标识
							timestamp: response.data.timestamp, // 必填，生成签名的时间戳
							nonceStr: response.data.nonceStr, // 必填，生成签名的随机串
							signature: response.data.signature, // 必填，签名，见附录1
							jsApiList: [
								'getLocation'
							] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
						});
					}
				});
			}
		},
		onShow() {
			this.wxConfig();
			
		},
		onLoad(option) {
			let that = this;
			this.contact = option.contact;
			this.mobile = option.mobile;
			this.address = option.address;
			this.details = option.details;
			wx.getLocation({
			  type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
			  success: function (res) {
				  rs.Toast(res);
			    var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
			    var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
			    // var speed = res.speed; // 速度，以米/每秒计
			    // var accuracy = res.accuracy; // 位置精度
				this.a =
					"https://apis.map.qq.com/tools/locpicker?search=1&type=1&coord=28.688967,115.849754&key=UNFBZ-3J6LO-HYCWC-SOMXY-NIFI7-4GFZO&referer=myapp";
				window.addEventListener('message', function(event) { 
					// 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
					var loc = event.data;
					if (loc && loc.module == 'locationPicker') { //防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
						that.address1 = loc.poiaddress;
						that.lat = loc.latlng.lat;
						that.lng = loc.latlng.lng;
					}
				}, false);
				
			  }
			});
			
		}
	}
</script>

<style>
	#test {
		width: 100vw;
		height: 100vh;
	}

	.test image {
		display: block;
		border-radius: 50%;
		box-shadow: 0 0 2px gray;
		width: 35px;
		position: absolute;
		top: calc(45% + 44px);
		left: 3%;
		background: white;
		height: 35px;
	}
</style>
