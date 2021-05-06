<template>
	<view class="search_list">
		<view class="fixed">
			<view class="input_key">
				<view class="flex_left_right fs-15 sort">
					<view @click="sortIndex=1" :class="sortIndex==1?'m-color':''"><text>综合</text></view>
					<view @click="sortIndex=2" :class="sortIndex==2?'m-color':''"><text>销量</text></view>
					<view @click="sortIndex=3" :class="sortIndex==3?'m-color':''" class="flex">
						<view style="padding-right:5rpx;">价格</view>
						<view class="flex-column">
							<text class="iconfont jiantou"
								style="transform: rotate(180deg);margin-top:6rpx;">&#xf36c;</text>
							<text class="iconfont jiantou" style="margin-top:-12rpx;">&#xf36c;</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view style="height:110rpx;"></view>
		<view class="search_result">
			<view class="recomend" style="margin-top:20rpx;">

				<view class="body">
					<my-recomend v-for="(item, index) in list" :key="index" :ware="item" :config="config"
						@showCart="openCart(item)" class="myc_recomend"></my-recomend>
				</view>
			</view>
		</view>
		<view class="fixed-addcart white_b">
			<view class="flex_left_right padding-15 align_center total">
				<view>
					<view class="fs-13 bold">小计：￥79.00</view>
					<view class="fs-11 gray_font">再买￥10.00 即可享受免运费</view>
				</view>
				<view class="go-car pay-button fs-15">去购物车</view>
			</view>
		</view>
	</view>
</template>

<script>
	import md5 from '../../static/js/md5.js';
	import rs from '../../static/js/request.js';
	let {
		log
	} = console;
	const app = getApp().globalData;
	const {
		appid,
		appsecret,
		imgRemote
	} = app;
	// #ifdef H5
	var wx = require('jweixin-module');
	// #endif

	export default {
		data() {
			return {
				sortIndex: 1,
				keyList: [],
				list: [],
				keyword: '菜',
				showSearch: true,
				startSpeech: true,
				config: [],
				bitmap: false,
				arrObj: {},
				index: '',
				cartware: {}
			}
		},
		methods: {
			toParent(e) {
				let item = e.arrObj;
				let timeStamp = Math.round(new Date().getTime() / 1000);
				let obj = {
					appid: appid,
					timeStamp: timeStamp,
					item_id: item.id,
					attr_id: 0,
					item_num: e.val
				};
				let sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
				let params = Object.assign({
						sign: sign
					},
					obj
				);
				rs.postRequests('changeNum', params, res => {
					let data = res.data;
					if (data.code == 200) {
						rs.Toast('加入购物车成功')
						this.list[this.index].cart_num = e.val;
					} else if (data.code == 407 || data.code == 406) {
						rs.Toast("购买数量不能超过活动数量")
					} else {
						rs.Toast(res.data.msg)
					}
				});
				this.$refs.popup.close();
			},
			openCart(item) {
				this.cartware = item;
				this.$refs.cart.open();
			},
			onClose() {
				this.$refs.cart.close();
			},
			// 显示键盘
			showKey(item, index) {
				this.arrObj = item;
				this.index = index;
				this.$refs.popup.open();
			},
			// 热门搜索
			getSearchData() {
				let timeStamp = Math.round(new Date().getTime() / 1000);
				let obj = {
					appid: appid,
					timeStamp: timeStamp
				};
				let sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
				let params = Object.assign({
						sign: sign
					},
					obj
				);
				rs.getRequests('getSearchData', params, res => {
					let data = res.data;
					if (data.code == 200) {
						this.keyList = data.data;
					} else {
						rs.Toast(data.msg);
					}
				});
			},
			submit() {
				this.searchList(this.keyword);
			},
			focus() {
				this.keyword = '',
					this.showSearch = true;
			},
			// 搜索列表
			searchList(key) {
				this.list = [];
				let timeStamp = Math.round(new Date().getTime() / 1000);
				let obj = {
					appid: appid,
					timeStamp: timeStamp,
					keyword: key
				};
				let sign = md5.hexMD5(rs.objKeySort(obj) + appsecret);
				let params = Object.assign({
						sign: sign
					},
					obj
				);
				rs.getRequests('getSearchItem', params, res => {
					let data = res.data;
					if (data.code == 200) {
						this.keyword = key;
						this.showSearch = false;
						if (data.data.length != 0) {
							this.list = data.data.list;
							this.config = data.data;
							this.bitmap = false;
						} else {
							this.bitmap = true;
						}
					} else {
						rs.Toast(data.msg)
					}
				});
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

					if (response.data.code == 200) {
						// console.log(response.data)
						wx.config({
							debug: false, // 开启调试模式
							appId: response.data.data.appId, // 必填，公众号的唯一标识
							timestamp: response.data.data.timestamp, // 必填，生成签名的时间戳
							nonceStr: response.data.data.nonceStr, // 必填，生成签名的随机串
							signature: response.data.data.signature, // 必填，签名，见附录1
							jsApiList: [
								'checkJsApi',
								'startRecord',
								'stopRecord',
								'translateVoice',
								'downloadVoice',
								'uploadVoice',
								'getLocation'
							] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
						});
					}
				});
			}
		},
		onHide() {
			uni.setStorageSync('search', this.list);
		},
		onShow() {


			this.getSearchData();
			if (this.keyword) {
				this.list = uni.getStorageSync('search');
			}
		}
	}
</script>

<style scoped lang="scss">
	.search_list .input_key {
		position: fixed;
		width: 100%;
		z-index: 9;
		background: white;

	}

	.search_list .search_result .my_profile {
		margin-bottom: 10rpx;
	}

	.sort {
		padding: 30rpx 60rpx;
	}

	.jiantou {
		font-size: 20rpx;
	}

	.fixed-addcart {
		position: fixed;
		width: 100%;
		bottom: 0;

		.total {
			height: 98rpx;
		}
		.go-car{
			background: #57B127;
			color: white;
		}
	}
</style>
